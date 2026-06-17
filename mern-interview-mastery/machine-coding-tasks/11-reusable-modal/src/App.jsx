import { useState, useEffect } from 'react';
import './App.css';

// Reusable Modal Component
function Modal({ isOpen, onClose, title, children, footer }) {
  // KEY PLACEMENT: ESC keypress close listener and background scroll locker (Reference: topics-points.txt)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock background scrolling
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window card" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">×</button>
        </header>

        <main className="modal-body">
          {children}
        </main>

        {footer && (
          <footer className="modal-footer">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

function App() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Form states inside modal
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('5');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback Saved:\nRating: ${rating}\nMessage: ${feedback}`);
    setIsFormOpen(false);
    setFeedback('');
  };

  return (
    <div className="modal-page-container">
      <header className="modal-page-header">
        <div className="brand">
          <span className="logo-icon">🪟</span>
          <div>
            <h1>ModalSphere</h1>
            <p className="subtitle">MERN Level - Generic Reusable Modals with Backdrop Filters & Key Events</p>
          </div>
        </div>
      </header>

      <div className="modal-triggers card">
        <h2>Reusable Modals Demo Control</h2>
        <p className="description-text">Trigger custom glassmorphic modals with generic layouts. Features click-outside listeners and Escape close integration.</p>

        <div className="trigger-buttons-grid">
          <button className="btn btn-primary" onClick={() => setIsAlertOpen(true)}>
            📢 Open System Alert
          </button>
          <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
            📝 Open Input Form Modal
          </button>
          <button className="btn btn-primary" onClick={() => setIsTermsOpen(true)}>
            📜 Open Scrollable Document
          </button>
        </div>
      </div>

      {/* 1. System Alert Modal */}
      <Modal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="Critical Database Alert"
        footer={
          <>
            <button className="btn btn-secondary btn-sm" onClick={() => setIsAlertOpen(false)}>Acknowledge</button>
            <button className="btn btn-danger btn-sm" onClick={() => { alert('Triggering diagnostic snapshot'); setIsAlertOpen(false); }}>Trigger Diagnostics</button>
          </>
        }
      >
        <p>Warning: System detected high memory spikes on the MongoDB cluster node 3. Recommended to trigger automated indexing diagnostics scan.</p>
      </Modal>

      {/* 2. Interactive Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Developer Feedback Survey"
      >
        <form onSubmit={handleFormSubmit} className="modal-form">
          <div className="form-group">
            <label>Rate Interview Preparation Suite</label>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</option>
              <option value="4">⭐⭐⭐⭐ Good (4/5)</option>
              <option value="3">⭐⭐⭐ Satisfactory (3/5)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Specific Feedback</label>
            <textarea
              placeholder="What could we improve?"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows="3"
              required
            />
          </div>
          <div className="modal-form-buttons">
            <button type="submit" className="btn btn-success btn-sm">Submit Form</button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsFormOpen(false)}>Close</button>
          </div>
        </form>
      </Modal>

      {/* 3. Scrollable terms agreement Modal */}
      <Modal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        title="MERN Suite Terms of Usage"
        footer={
          <button className="btn btn-primary btn-sm btn-block" onClick={() => setIsTermsOpen(false)}>I Accept Terms</button>
        }
      >
        <div className="scrollable-content-area">
          <h4>1. Architectural Patterns</h4>
          <p>By using this code repository, you agree to implement separation of concerns in all backend layers. Controllers must remain lean, parsing operations into service layer files.</p>
          <h4>2. Clean Code Rules</h4>
          <p>Variable naming must follow readable casing. React functions must remain pure where possible. Event bindings must clean up listeners upon component unmounting phases.</p>
          <h4>3. Mongoose Rules</h4>
          <p>Schema declarations must define robust indexes for query columns. Large lists must avoid using Mongoose populate in aggregate operations to preserve DB CPU cycles.</p>
        </div>
      </Modal>
    </div>
  );
}

export default App;
