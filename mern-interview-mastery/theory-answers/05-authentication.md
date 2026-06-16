# SECTION E: Authentication — Expert Answers

---

## 1. JWT Flow

```
┌────────┐                    ┌────────┐
│ Client │                    │ Server │
└───┬────┘                    └───┬────┘
    │  1. POST /login              │
    │  { email, password }   ──────>
    │                              │ 2. Validate credentials
    │                              │ 3. Generate JWT (access + refresh)
    │  4. { accessToken }    <──── │ 5. Set refreshToken in httpOnly cookie
    │                              │
    │  6. GET /api/data            │
    │  Authorization: Bearer <AT>──>
    │                              │ 7. Verify JWT signature + expiry
    │  8. { data }           <──── │
    │                              │
    │  9. Access token expires     │
    │  GET /api/data         ──────>
    │  10. 401 Unauthorized  <──── │
    │                              │
    │  11. POST /refresh           │
    │  Cookie: refreshToken  ──────>
    │                              │ 12. Verify refresh token
    │  13. { newAccessToken } <─── │
```

**JWT Structure:** `header.payload.signature`
```
eyJhbGciOiJIUzI1NiJ9.          ← Header (algorithm)
eyJpZCI6IjEiLCJyb2xlIjoiYWRt   ← Payload (claims: id, role, exp)
aW4ifQ.                         
SflKxwRJSMeKKF2QT4fwpMe        ← Signature (HMAC of header+payload+secret)
```

---

## 2. Login Flow

```js
// Backend
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // 1. Find user
  const user = await User.findOne({ email }).select('+password');
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

  // 3. Generate tokens
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  // 4. Store refresh token (DB or cookie)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,   // Not accessible via JS (XSS protection)
    secure: true,     // HTTPS only
    sameSite: 'strict', // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // 5. Return access token + user info
  res.json({
    accessToken,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});
```

```jsx
// Frontend (React)
const login = async (email, password) => {
  try {
    const { data } = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('accessToken', data.accessToken);
    setUser(data.user);
    navigate('/dashboard');
  } catch (err) {
    setError(err.response?.data?.error || 'Login failed');
  }
};
```

---

## 3. Refresh Token Flow

```js
// Backend: /api/auth/refresh
router.post('/refresh', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.status(401).json({ error: 'No refresh token' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ error: 'User not found' });

    // Issue new access token
    const newAccessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken: newAccessToken });
  } catch {
    res.clearCookie('refreshToken');
    res.status(403).json({ error: 'Invalid refresh token, please login again' });
  }
});
```

```js
// Frontend: Axios interceptor for auto-refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post('/api/auth/refresh');
        localStorage.setItem('accessToken', data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest); // Retry original request
      } catch {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
```

---

## 4. Role-Based Authentication

```js
// Middleware: authorize by role
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Not authorized for this action' });
    }
    next();
  };
};

// Usage
router.get('/admin/users', authenticate, authorize('admin'), getUsers);
router.delete('/admin/users/:id', authenticate, authorize('admin', 'superadmin'), deleteUser);
router.get('/profile', authenticate, authorize('user', 'admin'), getProfile);
```

---

## 5. Multi-Role Authentication

Users with multiple roles or permission-based access.

```js
// Schema
const userSchema = new Schema({
  roles: [{ type: String, enum: ['user', 'editor', 'admin', 'superadmin'] }],
  permissions: [{ type: String }], // ['read:users', 'write:posts', 'delete:comments']
});

// Permission-based middleware
const hasPermission = (...requiredPermissions) => {
  return (req, res, next) => {
    const userPermissions = req.user.permissions || [];
    const hasAll = requiredPermissions.every(p => userPermissions.includes(p));
    if (!hasAll) return res.status(403).json({ error: 'Insufficient permissions' });
    next();
  };
};

router.delete('/posts/:id', authenticate, hasPermission('delete:posts'), deletePost);
```

---

## 6. OTP Login

```js
// Generate & send OTP
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  await OTP.create({ phone, otp: await bcrypt.hash(otp, 10), expiresAt: expiry });
  await sendSMS(phone, `Your OTP is ${otp}`); // Twilio, AWS SNS, etc.

  res.json({ message: 'OTP sent' });
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { phone, otp } = req.body;
  const record = await OTP.findOne({ phone, expiresAt: { $gt: new Date() } })
    .sort({ createdAt: -1 });

  if (!record || !(await bcrypt.compare(otp, record.otp))) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  await OTP.deleteMany({ phone }); // Clean up
  let user = await User.findOne({ phone });
  if (!user) user = await User.create({ phone }); // Auto-register

  const accessToken = generateAccessToken(user);
  res.json({ accessToken, user });
});
```

---

## 7. Forgot Password

```js
// Request reset
router.post('/forgot-password', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ message: 'If email exists, reset link sent' }); // Don't reveal

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 min
  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
  await sendEmail({
    to: user.email,
    subject: 'Password Reset',
    html: `<a href="${resetUrl}">Reset your password</a>. Link expires in 30 minutes.`,
  });

  res.json({ message: 'If email exists, reset link sent' });
});

// Reset password
router.post('/reset-password/:token', async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

  user.password = req.body.password; // Pre-save hook will hash
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: 'Password reset successful' });
});
```

---

## 8. Social Login

**Flow:**
1. User clicks "Login with Google/GitHub"
2. Redirect to provider's OAuth page
3. User grants permission
4. Provider redirects back with authorization code
5. Backend exchanges code for user info
6. Create/find user in DB → issue JWT

---

## 9. Google OAuth

```js
// Using Passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = await User.create({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
    });
  }
  done(null, user);
}));

// Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = generateAccessToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${token}`);
  }
);
```

---

## 10. Session Management

```js
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  },
}));

// Login: store user in session
router.post('/login', async (req, res) => {
  const user = await validateUser(req.body);
  req.session.userId = user._id;
  req.session.role = user.role;
  res.json({ user });
});

// Middleware: check session
const isAuthenticated = (req, res, next) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Not authenticated' });
  next();
};

// Logout: destroy session
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out' });
  });
});
```
