# SECTION C: Node.js — Expert Answers

---

## 1. Node.js Architecture

Node.js is a **JavaScript runtime** built on Chrome's V8 engine + **libuv** (C library for async I/O).

```
┌──────────────────────────────────────┐
│           Your JavaScript Code        │
├──────────────────────────────────────┤
│       Node.js Bindings (C++)          │
├──────────┬───────────────────────────┤
│   V8     │        libuv              │
│ (JS      │  (Event Loop, Thread Pool,│
│  Engine) │   Async I/O, Networking)  │
├──────────┴───────────────────────────┤
│           Operating System            │
└──────────────────────────────────────┘
```

**Key components:**
- **V8** — Compiles JS to machine code
- **libuv** — Handles async I/O, event loop, thread pool (4 threads default)
- **Thread pool** — For file system, DNS, crypto (CPU-intensive tasks)
- **Event-driven, non-blocking** — Single thread handles thousands of connections

---

## 2. Event Loop (Node.js)

Node.js event loop has **6 phases** (different from browser):

```
   ┌───────────────────────────┐
┌─>│        timers              │ ← setTimeout, setInterval
│  └──────────┬────────────────┘
│  ┌──────────▼────────────────┐
│  │     pending callbacks      │ ← I/O callbacks deferred to next loop
│  └──────────┬────────────────┘
│  ┌──────────▼────────────────┐
│  │       idle, prepare        │ ← Internal use
│  └──────────┬────────────────┘
│  ┌──────────▼────────────────┐
│  │         poll               │ ← Retrieve new I/O events
│  └──────────┬────────────────┘
│  ┌──────────▼────────────────┐
│  │         check              │ ← setImmediate
│  └──────────┬────────────────┘
│  ┌──────────▼────────────────┐
│  │     close callbacks        │ ← socket.on('close')
│  └──────────┬────────────────┘
│             │
└─────────────┘

Between EACH phase: process.nextTick() + Promise microtasks run
```

**Priority order:** `process.nextTick` > `Promise.then` > `setTimeout` > `setImmediate`

---

## 3. EventEmitter

Core pattern in Node.js. Many built-in modules (streams, http) extend EventEmitter.

```js
const EventEmitter = require('events');

class OrderService extends EventEmitter {
  placeOrder(order) {
    // Business logic
    this.emit('orderPlaced', order);
    this.emit('notifyUser', order.userId);
  }
}

const service = new OrderService();
service.on('orderPlaced', (order) => console.log(`Order ${order.id} placed`));
service.on('notifyUser', (userId) => sendEmail(userId));
service.once('firstOrder', () => console.log('First order!'));  // Runs once

service.placeOrder({ id: 1, userId: 'u1' });
```

---

## 4. Streams

Process data piece by piece without loading everything into memory.

```js
// 4 types: Readable, Writable, Duplex, Transform
const fs = require('fs');

// ❌ Bad: Loads entire file into memory
const data = fs.readFileSync('huge-file.csv');

// ✅ Good: Processes in chunks
const readStream = fs.createReadStream('huge-file.csv');
const writeStream = fs.createWriteStream('output.csv');

readStream.pipe(writeStream); // Pipe: readable → writable

// Transform stream
const { Transform } = require('stream');
const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});

readStream.pipe(upperCase).pipe(writeStream);
```

**Use cases:** File processing, HTTP request/response bodies, video streaming, real-time data.

---

## 5. Buffers

Raw binary data in memory. Used when dealing with TCP streams, file system, or binary data.

```js
const buf = Buffer.from('Hello');    // <Buffer 48 65 6c 6c 6f>
const buf2 = Buffer.alloc(10);       // 10 zero-filled bytes
buf.toString();                       // 'Hello'
buf.length;                           // 5 (bytes, not chars)
Buffer.concat([buf, buf2]);           // Concatenate buffers
```

---

## 6. fs Module

```js
const fs = require('fs');
const fsPromises = require('fs/promises'); // Promise-based API

// Async (callback)
fs.readFile('file.txt', 'utf8', (err, data) => { /* ... */ });

// Promise-based (modern)
const data = await fsPromises.readFile('file.txt', 'utf8');
await fsPromises.writeFile('out.txt', 'content');
await fsPromises.mkdir('dir', { recursive: true });
await fsPromises.unlink('file.txt'); // Delete
const files = await fsPromises.readdir('./src');

// Watch for changes
fs.watch('file.txt', (eventType, filename) => { /* ... */ });
```

---

## 7. Process Object

Global object providing info and control over the current Node.js process.

```js
process.env.NODE_ENV          // Environment variables
process.argv                  // Command line arguments
process.cwd()                 // Current working directory
process.pid                   // Process ID
process.memoryUsage()         // Memory stats
process.exit(0)               // Exit (0=success, 1=error)
process.on('uncaughtException', (err) => { /* ... */ });
process.on('unhandledRejection', (reason) => { /* ... */ });
process.nextTick(() => { /* Runs before any I/O */ });
```

---

## 8. Child Process

Spawn separate processes to run shell commands or scripts.

```js
const { exec, spawn, fork } = require('child_process');

// exec: buffer output (small commands)
exec('ls -la', (err, stdout, stderr) => console.log(stdout));

// spawn: stream output (large output, long-running)
const child = spawn('ffmpeg', ['-i', 'input.mp4', 'output.avi']);
child.stdout.on('data', (data) => console.log(data.toString()));

// fork: spawn new Node.js process with IPC channel
const worker = fork('./heavy-task.js');
worker.send({ data: 'process this' });
worker.on('message', (result) => console.log(result));
```

---

## 9. Cluster

Run multiple instances of Node.js on all CPU cores.

```js
const cluster = require('cluster');
const os = require('os');

if (cluster.isPrimary) {
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork(); // Fork worker for each CPU core
  }
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  // Each worker runs the Express server
  const app = require('./app');
  app.listen(3000);
}
```

**Alternative:** Use **PM2** (`pm2 start app.js -i max`) — handles clustering, monitoring, restarts.

---

## 10. Worker Threads

True multi-threading for CPU-intensive tasks (unlike cluster which is multi-process).

```js
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.postMessage({ number: 1000000 });
  worker.on('message', (result) => console.log('Result:', result));
} else {
  parentPort.on('message', ({ number }) => {
    // Heavy computation in separate thread
    let sum = 0;
    for (let i = 0; i < number; i++) sum += i;
    parentPort.postMessage(sum);
  });
}
```

**Cluster vs Worker Threads:** Cluster = separate processes (own memory). Workers = shared memory (ArrayBuffer), lighter.

---

## 11. Middleware

A function that has access to `req`, `res`, and `next`. Executes between request and response.

```js
// Middleware signature
function middleware(req, res, next) {
  // Do something
  next(); // Pass control to next middleware
}

// Types:
// 1. Application-level: app.use(middleware)
// 2. Router-level: router.use(middleware)
// 3. Error-handling: (err, req, res, next)
// 4. Built-in: express.json(), express.static()
// 5. Third-party: cors(), helmet(), morgan()
```

---

## 12. Express Middleware

```js
const express = require('express');
const app = express();

// Built-in
app.use(express.json());                    // Parse JSON body
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.static('public'));          // Serve static files

// Custom: Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${Date.now()}`);
  next();
});

// Custom: Auth
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Route-specific middleware
app.get('/dashboard', authenticate, (req, res) => { /* ... */ });

// Error handler (must have 4 params)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});
```

---

## 13. next()

Passes control to the next middleware in the stack.

```js
app.use((req, res, next) => {
  console.log('Middleware 1');
  next();        // Go to next middleware
});

app.use((req, res, next) => {
  console.log('Middleware 2');
  next('route'); // Skip remaining middleware in this route
});

// Error passing
app.use((req, res, next) => {
  const err = new Error('Something failed');
  err.status = 500;
  next(err);     // Jump to error-handling middleware
});
```

**If you don't call `next()` and don't send a response, the request hangs forever.**

---

## 14. REST API

**REST (Representational State Transfer)** — Architectural style for designing networked applications.

**Principles:**
1. **Stateless** — Each request contains all info needed
2. **Resource-based** — URLs represent resources (`/users`, `/products`)
3. **HTTP methods** — GET (read), POST (create), PUT (full update), PATCH (partial update), DELETE
4. **Status codes** — 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 404 (Not Found), 500 (Server Error)

```
GET    /api/users          → Get all users
GET    /api/users/:id      → Get single user
POST   /api/users          → Create user
PUT    /api/users/:id      → Replace user
PATCH  /api/users/:id      → Update user fields
DELETE /api/users/:id      → Delete user
```

---

## 15. CRUD API

```js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// CREATE
router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) { next(err); }
});

// READ ALL (with pagination)
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await User.countDocuments();
    res.json({ success: true, data: users, total, page: +page, pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
});

// READ ONE
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
});

// UPDATE
router.patch('/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ success: true, message: 'User deleted' });
  } catch (err) { next(err); }
});
```

---

## 16. JWT Authentication

```js
const jwt = require('jsonwebtoken');

// Generate tokens
const generateAccessToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });

const generateRefreshToken = (user) =>
  jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

// Login
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
  res.json({ accessToken, user: { id: user._id, name: user.name, role: user.role } });
});

// Middleware: Verify JWT
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Token expired or invalid' });
  }
};
```

---

## 17. Authentication vs Authorization

| Aspect | Authentication | Authorization |
|--------|---------------|---------------|
| **What** | WHO you are | WHAT you can do |
| **Question** | "Are you who you claim to be?" | "Do you have permission?" |
| **When** | Login (verify identity) | After login (check access) |
| **How** | JWT, session, OAuth | Roles, permissions, policies |
| **HTTP code** | 401 Unauthorized | 403 Forbidden |

---

## 18. Cookies vs Sessions vs JWT

| Aspect | Cookies | Sessions | JWT |
|--------|---------|----------|-----|
| **Storage** | Browser | Server (memory/DB) | Client (localStorage/cookie) |
| **Stateful** | Yes | Yes | **No (stateless)** |
| **Scalability** | Limited | Requires shared store | **Excellent** |
| **Security** | HttpOnly, Secure flags | Server-controlled | Signature verification |
| **Expiry** | Set by server | Server-managed | In token payload |
| **Best for** | Tracking, preferences | Traditional web apps | APIs, microservices, mobile |

---

## 19. Refresh Tokens

```
ACCESS TOKEN: Short-lived (15min), sent in Authorization header
REFRESH TOKEN: Long-lived (7d), stored in httpOnly cookie

Flow:
1. Login → Server returns access + refresh tokens
2. API calls use access token in header
3. Access token expires → 401 error
4. Client sends refresh token to /refresh endpoint
5. Server verifies refresh token → issues new access token
6. If refresh token expired → force re-login
```

---

## 20. CORS

**Cross-Origin Resource Sharing** — Browser security that blocks requests from different origins.

```js
const cors = require('cors');

// Allow all (development)
app.use(cors());

// Production config
app.use(cors({
  origin: ['https://myapp.com', 'https://admin.myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,         // Allow cookies
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

**How it works:** Browser sends preflight `OPTIONS` request → Server responds with allowed origins → Browser permits or blocks.

---

## 21. Helmet

Security middleware that sets various HTTP headers.

```js
const helmet = require('helmet');
app.use(helmet());

// Sets: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection,
// Strict-Transport-Security, Content-Security-Policy, etc.
```

---

## 22. Rate Limiting

```js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // 100 requests per window
  message: { error: 'Too many requests, try again later' },
  standardHeaders: true,
});

app.use('/api/', limiter);

// Stricter for auth routes
const authLimiter = rateLimit({ windowMs: 60 * 1000, max: 5 });
app.use('/api/auth/', authLimiter);
```

---

## 23. File Upload

```js
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    cb(null, allowed.includes(file.mimetype));
  },
});

router.post('/upload', upload.single('avatar'), (req, res) => {
  res.json({ url: `/uploads/${req.file.filename}` });
});

router.post('/upload-multiple', upload.array('photos', 5), (req, res) => {
  const urls = req.files.map(f => `/uploads/${f.filename}`);
  res.json({ urls });
});
```

---

## 24. Nodemailer

```js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

async function sendEmail({ to, subject, html }) {
  await transporter.sendMail({
    from: `"MyApp" <${process.env.EMAIL_USER}>`,
    to, subject, html,
  });
}

// Usage
await sendEmail({
  to: 'user@example.com',
  subject: 'Reset Password',
  html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
});
```

---

## 25. Error Handling

```js
// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

// Async handler wrapper (eliminates try-catch boilerplate)
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Usage
router.get('/:id', asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new AppError('User not found', 404);
  res.json(user);
}));

// Global error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    success: false,
    error: statusCode === 500 ? 'Internal Server Error' : message,
  });
});

// Unhandled rejections / exceptions
process.on('unhandledRejection', (err) => { logger.error(err); process.exit(1); });
process.on('uncaughtException', (err) => { logger.error(err); process.exit(1); });
```

---

## 26. Logging

```js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

// HTTP request logging
const morgan = require('morgan');
app.use(morgan('combined')); // Apache-style logs
```

---

## 27. Environment Variables

```js
// .env file
// PORT=3000
// MONGODB_URI=mongodb://localhost:27017/myapp
// JWT_SECRET=super-secret-key
// NODE_ENV=development

require('dotenv').config();

// Access
const port = process.env.PORT || 3000;
const dbUri = process.env.MONGODB_URI;

// Validation (fail fast)
const required = ['MONGODB_URI', 'JWT_SECRET'];
required.forEach(key => {
  if (!process.env[key]) {
    console.error(`Missing env variable: ${key}`);
    process.exit(1);
  }
});
```

**Never commit `.env` to git.** Use `.env.example` as template.
