// ============================================================
// ⚡ TASK 5.5: Error Boundaries & Portals
// ============================================================
import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';

// ━━━ ERROR BOUNDARY (Class Component Only!) ━━━
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Called during RENDER phase — update state to show fallback
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Called during COMMIT phase — log error
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error);
    console.error('Component stack:', errorInfo.componentStack);
    // Send to error reporting service (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ padding: 20, background: '#fee', border: '1px solid red' }}>
          <h2>Something went wrong!</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage:
function App() {
  return (
    <ErrorBoundary fallback={<p>App crashed!</p>}>
      <Header />
      <ErrorBoundary fallback={<p>Content error</p>}>
        <MainContent />
      </ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  );
}

// Error boundaries DON'T catch:
// - Event handlers (use try/catch)
// - Async code (promises, setTimeout)
// - Server-side rendering
// - Errors in the error boundary itself

function Header() { return <h1>Header</h1>; }
function Footer() { return <footer>Footer</footer>; }
function MainContent() {
  // This would be caught by ErrorBoundary
  // throw new Error('Oops!');
  return <p>Main Content</p>;
}

// ━━━ PORTALS ━━━
/*
Portals render children into a DOM node OUTSIDE the parent hierarchy.
Useful for: Modals, Tooltips, Dropdowns, Toast notifications.

Even though the component renders outside, React events still
BUBBLE UP through the React tree (not the DOM tree)!
*/

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  // Render into #modal-root instead of parent's DOM
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.5)', display: 'flex',
        alignItems: 'center', justifyContent: 'center'
      }}>
      <div className="modal-content" onClick={e => e.stopPropagation()}
        style={{ background: 'white', padding: 20, borderRadius: 8 }}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById('modal-root') // Target DOM node
  );
}

function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Title</h2>
        <p>This renders in #modal-root, not inside this component!</p>
      </Modal>
    </div>
  );
}

// index.html needs: <div id="modal-root"></div> alongside <div id="root">

/*
🎯 INTERVIEW:
Q: "What are Error Boundaries?"
A: Class components that catch JS errors in their child tree during
   rendering. They show fallback UI instead of crashing the whole app.

Q: "Can you make an Error Boundary with hooks?"
A: No. componentDidCatch and getDerivedStateFromError have no hook equivalents.

Q: "What are Portals?"
A: ReactDOM.createPortal() renders children into a different DOM node.
   Used for modals/tooltips. Events still bubble through React tree.

Q: "What errors DON'T error boundaries catch?"
A: Event handlers, async code, SSR, and errors in the boundary itself.
*/

export { ErrorBoundary, Modal, ModalDemo, App };
