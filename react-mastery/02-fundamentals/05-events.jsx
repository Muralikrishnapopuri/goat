// ============================================================
// 🧱 TASK 2.5: EVENT HANDLING
// ============================================================
import { useState } from 'react';

// ━━━ BASIC EVENT HANDLING ━━━
function ClickDemo() {
  const handleClick = () => alert('Clicked!');
  const handleClickWithEvent = (e) => {
    console.log('Event type:', e.type);      // "click"
    console.log('Target:', e.target);         // <button> element
    console.log('Synthetic:', e.nativeEvent); // native browser event
  };

  return (
    <div>
      {/* Method 1: Inline arrow */}
      <button onClick={() => alert('Inline')}>Inline</button>
      {/* Method 2: Reference function (Preferred ✅) */}
      <button onClick={handleClick}>Handler</button>
      {/* Method 3: With event object */}
      <button onClick={handleClickWithEvent}>With Event</button>
      {/* ❌ WRONG: This calls immediately on render! */}
      {/* <button onClick={handleClick()}>Wrong</button> */}
    </div>
  );
}

// ━━━ PASSING ARGUMENTS ━━━
function ArgDemo() {
  const handleDelete = (id, e) => {
    console.log('Deleting:', id, 'Event:', e.type);
  };

  return (
    <div>
      {/* Wrap in arrow function to pass args */}
      <button onClick={(e) => handleDelete(42, e)}>Delete #42</button>
    </div>
  );
}

// ━━━ SYNTHETIC EVENTS ━━━
/*
React wraps native browser events in "SyntheticEvent" objects:
- Cross-browser compatible
- Same API as native events (stopPropagation, preventDefault)
- Pooled for performance (nullified after handler in React <17)
- React 17+: no more event pooling

Common events:
onClick, onChange, onSubmit, onFocus, onBlur, onKeyDown,
onKeyUp, onMouseEnter, onMouseLeave, onScroll, onDragStart
*/

// ━━━ FORM EVENTS ━━━
function FormDemo() {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value); // e.target.value = input's current text
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh!
    console.log('Submitted:', name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

// ━━━ EVENT PROPAGATION ━━━
function PropagationDemo() {
  return (
    <div onClick={() => console.log('Parent clicked')}>
      <button onClick={(e) => {
        e.stopPropagation(); // Prevents parent's onClick
        console.log('Button clicked');
      }}>
        Click Me
      </button>
    </div>
  );
}

/*
🎯 INTERVIEW QUESTIONS:
Q: "What are Synthetic Events?"
A: React's cross-browser wrapper around native events. Same API.

Q: "What is event delegation in React?"
A: React attaches ONE event listener to the root, not to each element.
   Events bubble up and React handles them at the root (efficient!).

Q: "Why use e.preventDefault()?"
A: To stop default browser behavior (form submission/page reload).

Q: "How to pass arguments to event handlers?"
A: Wrap in arrow function: onClick={(e) => handler(id, e)}
*/

export { ClickDemo, ArgDemo, FormDemo, PropagationDemo };
