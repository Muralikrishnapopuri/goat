import React from 'react';
import { AppProvider, useAppState } from './context/AppContext';
import { UseStateDemo } from './components/UseStateDemo';
import { UseReducerDemo } from './components/UseReducerDemo';
import { UseContextDemo } from './components/UseContextDemo';
import { InterviewPrep } from './components/InterviewPrep';

const DashboardContent = () => {
  const { theme, user, notifications, removeNotification } = useAppState();

  return (
    <div className={`app-container theme-${theme}`}>
      {/* Toast Notification Container */}
      <div className="notification-container">
        {notifications.map((notif) => (
          <div key={notif.id} className={`notification-toast notif-${notif.type}`}>
            <span className="toast-message">{notif.message}</span>
            <button 
              className="toast-close" 
              onClick={() => removeNotification(notif.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Main Header */}
      <header className="app-header">
        <div className="header-brand">
          <div className="logo-icon">⚛</div>
          <div>
            <h1>React State Playground</h1>
            <p className="subtitle">Visualizing State Management Paradigms</p>
          </div>
        </div>

        <div className="header-meta">
          <div className="meta-item">
            <span className="meta-label">Active User:</span>
            <span className="meta-value highlight-text">{user.name}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Theme:</span>
            <span className="meta-value badge capitalize">{theme}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Pending Notifs:</span>
            <span className="meta-value badge red-badge">{notifications.length}</span>
          </div>
        </div>
      </header>

      {/* Info Stats Banner */}
      <section className="stats-banner">
        <div className="stat-card-mini">
          <span className="stat-num">useState</span>
          <span className="stat-label">Isolated Component Scope</span>
        </div>
        <div className="stat-card-mini">
          <span className="stat-num">useReducer</span>
          <span className="stat-label">Action Dispatch Redux Pattern</span>
        </div>
        <div className="stat-card-mini">
          <span className="stat-num">useContext</span>
          <span className="stat-label">Shared Application Context</span>
        </div>
      </section>

      {/* Grid of State Cards */}
      <main className="dashboard-grid">
        <UseStateDemo />
        <UseReducerDemo />
        <UseContextDemo />
      </main>

      {/* Bottom Accordion Info section */}
      <section className="dashboard-bottom">
        <InterviewPrep />
      </section>

      {/* Footer */}
      <footer className="app-footer">
        <p>Built for React Interview Mastery & State Usage Demonstrations • 2026</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}

export default App;
