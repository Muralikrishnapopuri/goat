import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';

export const UseContextDemo = () => {
  const { 
    theme, 
    toggleTheme, 
    user, 
    setUser, 
    addNotification, 
    notifications 
  } = useAppState();

  const [activeTab, setActiveTab] = useState('demo');
  const [newUsername, setNewUsername] = useState(user.name);
  const [toastMessage, setToastMessage] = useState('');

  const handleUpdateUsername = (e) => {
    e.preventDefault();
    if (!newUsername.trim()) return;
    
    setUser((prev) => ({
      ...prev,
      name: newUsername
    }));
    addNotification(`Global Username updated to "${newUsername}"`, 'success');
  };

  const handleTriggerToast = (e) => {
    e.preventDefault();
    if (!toastMessage.trim()) return;
    
    addNotification(toastMessage, 'info');
    setToastMessage('');
  };

  return (
    <div className="state-card border-glow">
      <div className="card-header">
        <div className="badge state-badge purple-badge">Global State</div>
        <h3>useContext (Context API)</h3>
        <p className="card-desc">Shares state globally across components without passing props down manually through intermediate elements (avoiding prop drilling).</p>
      </div>

      <div className="tab-buttons">
        <button 
          className={`tab-btn ${activeTab === 'demo' ? 'active' : ''}`}
          onClick={() => setActiveTab('demo')}
        >
          Interactive Demo
        </button>
        <button 
          className={`tab-btn ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          View Code
        </button>
      </div>

      {activeTab === 'demo' ? (
        <div className="card-body">
          {/* Theme Toggler */}
          <div className="demo-section">
            <h4 className="section-title">1. Theme Changer (Global Style Injector)</h4>
            <div className="theme-selector-box">
              <p>Current Active Theme: <strong className="theme-text capitalize">{theme}</strong></p>
              <div className="theme-buttons">
                <button 
                  className={`btn ${theme === 'light' ? 'btn-active' : 'btn-secondary'}`} 
                  onClick={() => { toggleTheme(); addNotification('Switched theme!', 'info'); }}
                >
                  Toggle Theme Cycle
                </button>
              </div>
            </div>
          </div>

          {/* User Settings */}
          <div className="demo-section">
            <h4 className="section-title">2. User Session context</h4>
            <div className="user-details-card">
              <p>Logged in as: <strong>{user.name}</strong></p>
              <p>Role: <span className="text-muted">{user.role}</span></p>
            </div>
            <form onSubmit={handleUpdateUsername} className="form-row mt-2">
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Change global user name..."
                className="input-field"
              />
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>

          {/* Toast Broadcasting */}
          <div className="demo-section">
            <h4 className="section-title">3. Global Toast Broadcast (Event Bus)</h4>
            <form onSubmit={handleTriggerToast} className="form-row">
              <input
                type="text"
                value={toastMessage}
                onChange={(e) => setToastMessage(e.target.value)}
                placeholder="Type global alert message..."
                className="input-field"
              />
              <button type="submit" className="btn btn-accent">Broadcast</button>
            </form>
            <p className="tiny-info mt-1">Sends message to header notification area instantly from this nested card.</p>
          </div>

          {/* Interactive Flow visualizer */}
          <div className="state-visualizer mt-4">
            <h5>Visual Data Flow Map</h5>
            <div className="flow-diagram">
              <div className="flow-node provider">AppProvider (Holds State)</div>
              <div className="flow-connector">│</div>
              <div className="flow-flex">
                <div className="flow-node component opacity-50">Middle Component (Unchanged)</div>
                <div className="flow-connector-horiz">─── bypassed ───▶</div>
                <div className="flow-node component highlight">UseContextDemo (Renders State)</div>
              </div>
              <p className="tiny-info text-center mt-2">Notice: React skips rendering the Middle Component when AppProvider context changes, targeting updates directly to subscribers.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="code-view">
          <pre className="code-box">
{`import React, { createContext, useContext, useState } from 'react';

// 1. Create Context Object
const ThemeContext = createContext();

// 2. Wrap App with Provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Child uses useContext hook to pull values
export function ChildComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme} 
      style={{ background: theme === 'dark' ? '#333' : '#fff' }}
    >
      Toggle Context Theme
    </button>
  );
}`}
          </pre>
        </div>
      )}
    </div>
  );
};
