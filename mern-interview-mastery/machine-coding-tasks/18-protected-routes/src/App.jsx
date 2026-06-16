import { useState } from 'react';
import './App.css';

function App() {
  const [user, setUser] = useState(null); // null | { name, role: 'admin' | 'user' }
  const [currentTab, setCurrentTab] = useState('home'); // home | profile | admin | login
  const [redirectTarget, setRedirectTarget] = useState(null); // tab to redirect to after login
  const [loginRole, setLoginRole] = useState('user');
  const [loginName, setLoginName] = useState('');

  const handleNavigation = (tab) => {
    // 1. Check Profile access (requires user or admin)
    if (tab === 'profile' && !user) {
      setRedirectTarget('profile');
      setCurrentTab('login');
      return;
    }

    // 2. Check Admin access (requires admin specifically)
    if (tab === 'admin') {
      if (!user) {
        setRedirectTarget('admin');
        setCurrentTab('login');
        return;
      }
      if (user.role !== 'admin') {
        alert('Access Denied. Admin privileges required.');
        return;
      }
    }

    setCurrentTab(tab);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginName.trim()) return;

    const loggedInUser = {
      name: loginName.trim(),
      role: loginRole
    };

    setUser(loggedInUser);
    
    // Redirect to target if set, else home
    if (redirectTarget) {
      setCurrentTab(redirectTarget);
      setRedirectTarget(null);
    } else {
      setCurrentTab('home');
    }

    setLoginName('');
  };

  const handleLogout = () => {
    setUser(null);
    setRedirectTarget(null);
    setCurrentTab('home');
  };

  return (
    <div className="route-container">
      <header className="route-header">
        <div className="brand">
          <span className="logo-icon">🛡️</span>
          <div>
            <h1>ShieldRoute</h1>
            <p className="subtitle">MERN Level - Route Guards, Role-Based Access Control & Callback Handlers</p>
          </div>
        </div>

        {/* Top Navbar */}
        <nav className="route-nav">
          <button 
            className={`nav-btn ${currentTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNavigation('home')}
          >
            🏠 Public Home
          </button>
          <button 
            className={`nav-btn ${currentTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleNavigation('profile')}
          >
            👤 Private Profile
          </button>
          <button 
            className={`nav-btn ${currentTab === 'admin' ? 'active' : ''}`}
            onClick={() => handleNavigation('admin')}
          >
            ⚙️ Admin Panel
          </button>

          {user ? (
            <button className="auth-btn logout" onClick={handleLogout}>Sign Out ({user.name})</button>
          ) : (
            <button 
              className={`auth-btn login ${currentTab === 'login' ? 'active' : ''}`}
              onClick={() => setCurrentTab('login')}
            >
              Sign In
            </button>
          )}
        </nav>
      </header>

      {/* Main Content Pane */}
      <main className="route-content-viewport">
        {currentTab === 'home' && (
          <div className="tab-pane card">
            <h2>Welcome to Public Portal</h2>
            <p>This section is open to everyone. No authentication credentials or JWT tokens are required to inspect this landing page.</p>
            <div className="route-status-card">
              <span>Current Auth Status:</span>
              <strong>{user ? `Authenticated as: ${user.name} (${user.role})` : 'Anonymous Guest'}</strong>
            </div>
          </div>
        )}

        {currentTab === 'profile' && user && (
          <div className="tab-pane card">
            <h2>👤 Secure Developer Profile</h2>
            <p>Access Granted. This dashboard contains user-specific profile credentials loaded securely into frontend state memory.</p>
            <div className="specs-box">
              <p><strong>Username:</strong> {user.name}</p>
              <p><strong>System Role:</strong> {user.role}</p>
              <p><strong>Access Level:</strong> {user.role === 'admin' ? 'All Modules' : 'Standard Read-Only'}</p>
            </div>
          </div>
        )}

        {currentTab === 'admin' && user?.role === 'admin' && (
          <div className="tab-pane card">
            <h2>⚙️ System Administration Console</h2>
            <p>Access Granted. Exclusive Admin Console loaded. Operations include database backups, index rebuilds, and server restarts.</p>
            <div className="action-row-buttons">
              <button className="btn btn-danger btn-sm" onClick={() => alert('Initiating MongoDB index repairs')}>Rebuild Indices</button>
              <button className="btn btn-secondary btn-sm" onClick={() => alert('Exporting log records payload')}>Export Audit Logs</button>
            </div>
          </div>
        )}

        {currentTab === 'login' && (
          <div className="login-pane-wrapper card">
            <h2>Sign In Required</h2>
            {redirectTarget && (
              <div className="alert alert-warning">
                🔒 You must sign in to access the <strong>{redirectTarget.toUpperCase()}</strong> page.
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="login-form">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="Enter name (e.g. Murali)"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Select Profile Role</label>
                <select value={loginRole} onChange={(e) => setLoginRole(e.target.value)}>
                  <option value="user">User (Standard Access)</option>
                  <option value="admin">Admin (All Access)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary btn-block">Authenticate Credentials</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
