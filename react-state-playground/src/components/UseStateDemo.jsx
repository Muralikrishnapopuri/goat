import React, { useState } from 'react';
import { useAppState } from '../context/AppContext';

export const UseStateDemo = () => {
  // Local state for counter
  const [counter, setCounter] = useState(0);
  
  // Local state for profile details (object state)
  const [profile, setProfile] = useState({
    displayName: 'Murali Krishna',
    skills: 'React, Node.js, Express, MongoDB',
    status: '🚀 Preparing for MERN Interviews'
  });

  const [activeTab, setActiveTab] = useState('demo'); // 'demo' | 'code'

  const { setUser, addNotification } = useAppState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSyncToGlobal = () => {
    setUser({
      name: profile.displayName,
      role: profile.status,
      isLoggedIn: true
    });
    addNotification('Local profile successfully synced to Global Context!', 'success');
  };

  return (
    <div className="state-card border-glow">
      <div className="card-header">
        <div className="badge state-badge">Local State</div>
        <h3>useState hook</h3>
        <p className="card-desc">Manages isolated state inside a single component. Triggers re-render when setter is called.</p>
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
          {/* Section 1: Simple Counter */}
          <div className="demo-section">
            <h4 className="section-title">1. Primitive State (Counter)</h4>
            <div className="counter-box">
              <span className="count-display">{counter}</span>
              <div className="button-group">
                <button className="btn btn-primary" onClick={() => setCounter(counter + 1)}>+</button>
                <button className="btn btn-secondary" onClick={() => setCounter(0)}>Reset</button>
                <button className="btn btn-primary" onClick={() => setCounter(counter - 1)}>-</button>
              </div>
            </div>
          </div>

          {/* Section 2: Object State Form */}
          <div className="demo-section">
            <h4 className="section-title">2. Complex State (Object)</h4>
            <div className="form-group">
              <label>Display Name</label>
              <input 
                type="text" 
                name="displayName" 
                value={profile.displayName} 
                onChange={handleInputChange}
                className="input-field" 
              />
            </div>
            <div className="form-group">
              <label>Skills</label>
              <input 
                type="text" 
                name="skills" 
                value={profile.skills} 
                onChange={handleInputChange}
                className="input-field" 
              />
            </div>
            <div className="form-group">
              <label>Status Message</label>
              <input 
                type="text" 
                name="status" 
                value={profile.status} 
                onChange={handleInputChange}
                className="input-field" 
              />
            </div>
            <button className="btn btn-accent btn-block" onClick={handleSyncToGlobal}>
              Sync to Global App Context
            </button>
          </div>

          {/* Real-time State Visualizer */}
          <div className="state-visualizer">
            <h5>Live Local State JSON</h5>
            <pre className="json-box">
              {JSON.stringify({ counter, profile }, null, 2)}
            </pre>
          </div>
        </div>
      ) : (
        <div className="code-view">
          <pre className="code-box">
{`import React, { useState } from 'react';

function UseStateComponent() {
  // 1. Primitive state declaration
  const [counter, setCounter] = useState(0);

  // 2. Object state declaration
  const [profile, setProfile] = useState({
    displayName: 'Murali Krishna',
    skills: 'React, Node.js',
    status: '🚀 Coding'
  });

  // Updating object state requires copying previous state!
  const updateStatus = (newStatus) => {
    setProfile(prev => ({
      ...prev,          // Copy properties
      status: newStatus // Overwrite specific property
    }));
  };

  return (
    <div>
      <p>Count: {counter}</p>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <input 
        value={profile.status} 
        onChange={(e) => updateStatus(e.target.value)} 
      />
    </div>
  );
}`}
          </pre>
        </div>
      )}
    </div>
  );
};
