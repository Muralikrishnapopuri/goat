import { useState, useRef } from 'react';
import './App.css';

const FAQ_DATA = [
  {
    id: 1,
    question: "What is the role of libuv in the Node.js architecture?",
    answer: "Libuv is a multi-platform support library with a focus on asynchronous I/O. It provides Node.js with the Event Loop, thread pool, async socket behaviors, and file system interactions."
  },
  {
    id: 2,
    question: "How does React Fiber improve application performance?",
    answer: "React Fiber splits reconciliation work into smaller incremental chunks. This allows the browser main thread to pause rendering tasks to process high-priority animation or input events, avoiding UI lag."
  },
  {
    id: 3,
    question: "What is MongoDB compound indexing and the ESR rule?",
    answer: "A compound index indexes multiple fields. The ESR rule stands for Equality, Sort, Range. To optimize lookup speeds, compound keys should follow this ordering sequence strictly."
  },
  {
    id: 4,
    question: "Why should refresh tokens be stored in HttpOnly secure cookies?",
    answer: "Storing JWT refresh credentials inside HttpOnly secure cookies blocks access from client-side JS scripts, protecting the user credentials against Cross-Site Scripting (XSS) extraction."
  }
];

function App() {
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [expandedIds, setExpandedIds] = useState([1]); // Default open first item
  const accordionRefs = useRef([]);

  const handleToggle = (id) => {
    if (allowMultiple) {
      if (expandedIds.includes(id)) {
        setExpandedIds(expandedIds.filter(item => item !== id));
      } else {
        setExpandedIds([...expandedIds, id]);
      }
    } else {
      setExpandedIds(expandedIds.includes(id) ? [] : [id]);
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e, idx, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle(id);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (idx + 1) % FAQ_DATA.length;
      accordionRefs.current[nextIdx]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (idx - 1 + FAQ_DATA.length) % FAQ_DATA.length;
      accordionRefs.current[prevIdx]?.focus();
    }
  };

  return (
    <div className="accordion-page-container">
      <header className="accordion-page-header">
        <div className="brand">
          <span className="logo-icon">🗂️</span>
          <div>
            <h1>AccordioPro</h1>
            <p className="subtitle">MERN Level - Reusable Collapsible Panels, Key Bindings & Expand Modes</p>
          </div>
        </div>
      </header>

      <div className="accordion-wrapper card">
        <div className="accordion-controls">
          <h2>MERN Technical FAQs</h2>
          <div className="mode-selector">
            <span className="control-label">Allow Multiple Open:</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={allowMultiple}
                onChange={(e) => {
                  setAllowMultiple(e.target.checked);
                  setExpandedIds([1]); // Reset on mode switch
                }}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>

        <div className="accordion-list">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = expandedIds.includes(item.id);
            return (
              <div 
                key={item.id} 
                className={`accordion-item ${isOpen ? 'open' : ''}`}
              >
                <button
                  ref={el => accordionRefs.current[idx] = el}
                  className="accordion-header-btn"
                  onClick={() => handleToggle(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx, item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${item.id}`}
                  id={`header-${item.id}`}
                >
                  <span className="question-text">{item.question}</span>
                  <span className="chevron-icon">{isOpen ? '▼' : '▶'}</span>
                </button>

                <div
                  id={`panel-${item.id}`}
                  className="accordion-panel"
                  role="region"
                  aria-labelledby={`header-${item.id}`}
                >
                  <div className="panel-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
