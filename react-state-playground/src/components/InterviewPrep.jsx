import React, { useState } from 'react';

const QA_DATA = [
  {
    id: 1,
    question: "What is the difference between useState and useReducer?",
    answer: "useState is designed for managing simple, primitive states (like numbers, booleans, strings) or simple objects. useReducer is preferred for complex state objects (with nested structures), when the next state depends heavily on the previous state, or when there are multiple action types that update different pieces of state. useReducer also moves the update logic (reducer function) outside the component body, making it easier to test."
  },
  {
    id: 2,
    question: "When should we use Context API vs Redux?",
    answer: "Context API is built directly into React and is ideal for sharing low-to-medium frequency updates (like theme settings, localization, user profile) to avoid prop drilling. However, it can trigger re-renders on all consumers whenever the value changes. Redux is a robust, external state management library that provides fine-grained selector-based subscription, middleware support, action devtools, and time-travel debugging. Choose Redux for large-scale apps with high-frequency updates and complex business logic."
  },
  {
    id: 3,
    question: "Why does React state update asynchronously/batch updates?",
    answer: "React batches state updates that happen inside event handlers, hooks, and lifecycle methods to improve performance. Instead of triggering a re-render for every single setState execution (which would lag the UI), React collects all state updates and performs a single unified re-render at the end of the event loop tick. This minimizes layout calculations and DOM writes."
  },
  {
    id: 4,
    question: "How do you update nested object state in useState?",
    answer: "React state must be treated as immutable. When updating nested objects, you must create a new object and copy over the unchanged nested properties using the spread operator (...). For example: setProfile(prev => ({ ...prev, address: { ...prev.address, city: 'New City' } })). Alternatively, you can use helper libraries like Immer to write mutation-style code that produces immutable updates."
  },
  {
    id: 5,
    question: "What is the role of React Fiber and how does it relate to State?",
    answer: "React Fiber is the core reconciliation engine introduced in React 16. It splits rendering work into small chunks and prioritizes UI/animation updates over low-priority updates (like background fetches). In terms of state, Fiber manages state updates using a linked list of update objects associated with each component's Fiber node, enabling React to pause, resume, or abort rendering calculations dynamically."
  },
  {
    id: 6,
    question: "What is the difference between Controlled and Uncontrolled Components?",
    answer: "Controlled components have their form element values governed entirely by React state (e.g., <input value={name} onChange={e => setName(e.target.value)} />). Uncontrolled components keep their values inside the DOM, and you query them when needed using a ref (e.g., inputRef.current.value). Controlled components are preferred for forms because they enable instant validation, conditional submit buttons, and clean state formatting."
  }
];

export const InterviewPrep = () => {
  const [openId, setOpenId] = useState(null);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="state-card border-glow full-width-card">
      <div className="card-header text-center">
        <div className="badge study-badge">MERN Interview Review</div>
        <h3>State Management Prep Desk</h3>
        <p className="card-desc">Quick-fire summaries of state-related interview concepts to help you master technical rounds.</p>
      </div>

      <div className="accordion-list mt-4">
        {QA_DATA.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className={`accordion-item ${isOpen ? 'open' : ''}`}>
              <button 
                className="accordion-header" 
                onClick={() => toggleAccordion(item.id)}
              >
                <span>{item.question}</span>
                <span className="accordion-arrow">{isOpen ? '▼' : '▶'}</span>
              </button>
              {isOpen && (
                <div className="accordion-content">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
