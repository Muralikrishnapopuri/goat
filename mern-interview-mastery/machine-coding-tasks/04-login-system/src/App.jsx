import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('login'); // login | register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('mern_logged_in_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: 'Very Weak', color: '#ef4444' });

  // Evaluate password strength
  useEffect(() => {
    if (activeTab === 'login') return;
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    let label = 'Very Weak';
    let color = '#ef4444';
    if (score === 2) { label = 'Weak'; color = '#f59e0b'; }
    else if (score === 3) { label = 'Medium'; color = '#3b82f6'; }
    else if (score >= 4) { label = 'Strong'; color = '#10b981'; }

    setPasswordStrength({ score, label, color });
  }, [password, activeTab]);

  const handleAuth = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validations
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (activeTab === 'register') {
      if (!name.trim()) {
        setError('Name cannot be empty');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      // Simulation of saving a user
      const users = JSON.parse(localStorage.getItem('mern_registered_users') || '[]');
      if (users.find(u => u.email === email)) {
        setError('Email already registered');
        return;
      }

      const newUser = { name, email, password };
      localStorage.setItem('mern_registered_users', JSON.stringify([...users, newUser]));
      setSuccess('Account created successfully! Please sign in.');
      setActiveTab('login');
      setPassword('');
      setConfirmPassword('');
    } else {
      // Login flow
      const users = JSON.parse(localStorage.getItem('mern_registered_users') || '[]');
      // Seed default user for testing if no users exist
      if (users.length === 0) {
        const seedUser = { name: 'Murali Krishna', email: 'murali@example.com', password: 'Password123!' };
        users.push(seedUser);
        localStorage.setItem('mern_registered_users', JSON.stringify(users));
      }

      const user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        setError('Invalid email or password');
        return;
      }

      const sessionUser = { name: user.name, email: user.email };
      setCurrentUser(sessionUser);
      localStorage.setItem('mern_logged_in_user', JSON.stringify(sessionUser));
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('mern_logged_in_user');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <div className="brand">
          <span className="logo-icon">🔐</span>
          <div>
            <h1>SecureGate</h1>
            <p className="subtitle">MERN Level - Premium Authentication & Session Management</p>
          </div>
        </div>
      </header>

      {currentUser ? (
        <div className="profile-card card">
          <div className="avatar">👤</div>
          <h2>Welcome back, {currentUser.name}!</h2>
          <p className="user-email">{currentUser.email}</p>
          <div className="session-info">
            <span className="badge">Active Session</span>
            <p>Mock JWT Access Token initialized securely in context memory.</p>
          </div>
          <button className="btn btn-danger btn-block" onClick={handleLogout}>Sign Out Session</button>
        </div>
      ) : (
        <div className="auth-card card">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => { setActiveTab('login'); setError(''); setSuccess(''); }}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => { setActiveTab('register'); setError(''); setSuccess(''); }}
            >
              Sign Up
            </button>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleAuth} className="auth-form">
            {activeTab === 'register' && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="show-hide-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {activeTab === 'register' && password.length > 0 && (
              <div className="strength-meter-wrapper">
                <div className="strength-meter-bar">
                  <div 
                    className="strength-fill" 
                    style={{ 
                      width: `${(passwordStrength.score / 4) * 100}%`, 
                      backgroundColor: passwordStrength.color 
                    }}
                  ></div>
                </div>
                <span className="strength-label" style={{ color: passwordStrength.color }}>
                  Password Strength: {passwordStrength.label}
                </span>
              </div>
            )}

            {activeTab === 'register' && (
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-block">
              {activeTab === 'login' ? 'Sign In Securely' : 'Create Account'}
            </button>
          </form>

          {activeTab === 'login' && (
            <div className="demo-credentials">
              <h4>Demo Credentials</h4>
              <p>Email: <code>murali@example.com</code></p>
              <p>Password: <code>Password123!</code></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
