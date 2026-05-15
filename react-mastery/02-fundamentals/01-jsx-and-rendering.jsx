// ============================================================
// 🧱 TASK 2.1: JSX DEEP DIVE & HOW RENDERING WORKS
// ============================================================

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 WHAT IS JSX?
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JSX = JavaScript XML
// It's a SYNTAX EXTENSION that lets you write HTML-like code in JS.
// JSX is NOT valid JavaScript — it gets compiled by Babel/SWC.

// ━━━━━ THIS JSX: ━━━━━
const element = <h1 className="title">Hello World</h1>;

// ━━━━━ COMPILES TO THIS JS: ━━━━━
const elementCompiled = React.createElement(
  'h1',                          // type: HTML tag or component
  { className: 'title' },       // props: attributes object
  'Hello World'                  // children: content inside
);

// ━━━━━ WHICH CREATES THIS OBJECT (Virtual DOM Node): ━━━━━
/*
{
  type: 'h1',
  props: {
    className: 'title',
    children: 'Hello World'
  },
  key: null,
  ref: null,
}
*/

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 THE COMPLETE RENDERING PIPELINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/*
YOUR JSX CODE
    ↓ (Babel/SWC compile)
React.createElement() calls
    ↓ (returns)
Virtual DOM (Plain JS Objects)
    ↓ (React Reconciler compares old vs new)
Diff/Patch list (minimal changes)
    ↓ (ReactDOM applies to)
Real DOM (browser renders pixels)

STEP BY STEP:
1. You write: <App />
2. Babel converts to: React.createElement(App, null)
3. React calls App() function → gets JSX return value
4. Converts all JSX to Virtual DOM tree (JS objects)
5. First render: creates entire Real DOM from Virtual DOM
6. Re-render: creates NEW Virtual DOM, DIFFS with old one
7. Only changed parts get updated in Real DOM (efficient!)
*/

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 JSX RULES (Must Know!)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// RULE 1: Must return a SINGLE root element
// ❌ Wrong:
// return (<h1>Title</h1> <p>Text</p>)
// ✅ Right:
function GoodReturn() {
  return (
    <div>
      <h1>Title</h1>
      <p>Text</p>
    </div>
  );
}

// ✅ Or use Fragment (no extra DOM node):
function FragmentExample() {
  return (
    <>
      <h1>Title</h1>
      <p>Text</p>
    </>
  );
}

// RULE 2: Use className instead of class
const div1 = <div className="container">Content</div>;

// RULE 3: Use htmlFor instead of for
const label1 = <label htmlFor="email">Email</label>;

// RULE 4: Self-close tags that have no children
const img1 = <img src="photo.jpg" alt="photo" />;
const br1 = <br />;
const input1 = <input type="text" />;

// RULE 5: JavaScript expressions in curly braces {}
const name = "Murali";
const greeting = <h1>Hello, {name}!</h1>;
const math = <p>Result: {2 + 3}</p>;
const condition = <p>{name ? `Hi ${name}` : 'Hi Guest'}</p>;

// RULE 6: Inline styles use object with camelCase
const styled = (
  <div style={{ backgroundColor: 'blue', fontSize: '16px', padding: '10px' }}>
    Styled content
  </div>
);

// RULE 7: Comments in JSX
const withComment = (
  <div>
    {/* This is a JSX comment */}
    <p>Content</p>
  </div>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 JSX EXPRESSIONS — What you CAN and CANNOT do
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ✅ Can use: variables, function calls, ternary, array methods
function ExpressionsDemo() {
  const items = ['Apple', 'Banana', 'Cherry'];
  const isLoggedIn = true;
  const getGreeting = () => 'Welcome!';

  return (
    <div>
      {/* Variable */}
      <h1>{getGreeting()}</h1>

      {/* Ternary */}
      <p>{isLoggedIn ? 'Dashboard' : 'Login'}</p>

      {/* Array map */}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Template literal */}
      <p>{`Total items: ${items.length}`}</p>

      {/* Short circuit */}
      {isLoggedIn && <button>Logout</button>}
    </div>
  );
}

// ❌ Cannot use: if/else, for loops, switch DIRECTLY in JSX
// (Use them OUTSIDE the return, or use ternary/map inside)

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 HOW RE-RENDERING WORKS (Critical for Interview!)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/*
WHEN DOES A COMPONENT RE-RENDER?
1. Its STATE changes (setState / useState setter)
2. Its PROPS change (parent passes new prop values)
3. Its PARENT re-renders (child re-renders by default)
4. CONTEXT value changes (if component consumes context)

WHEN A COMPONENT RE-RENDERS:
1. React calls the component function again
2. Gets new JSX (new Virtual DOM)
3. Diffs new Virtual DOM vs old Virtual DOM
4. Updates ONLY the changed DOM nodes

IMPORTANT: Re-render ≠ DOM update!
- Re-render = React calling your function again
- DOM update = Actually changing something on screen
- React may re-render but find NO DIFF → no DOM update
*/

// Example: Understanding re-renders
import { useState } from 'react';

function Counter() {
  console.log('Counter RENDERED'); // Check how many times this runs

  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      {/* Each click → setState → re-render → new Virtual DOM
          → diff → only <p> text node changes in Real DOM */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 REACT WITHOUT JSX (Proof that JSX is optional)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// You CAN use React without JSX (just React.createElement):
const withoutJSX = React.createElement(
  'div',
  { className: 'app' },
  React.createElement('h1', null, 'Title'),
  React.createElement('p', null, 'This works without JSX'),
  React.createElement(
    'button',
    { onClick: () => alert('clicked') },
    'Click Me'
  )
);
// But nobody does this — JSX is much more readable!

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎯 INTERVIEW QUESTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/*
Q1: "What is JSX?"
A: JSX is a syntax extension for JavaScript that allows writing
   HTML-like code. It gets compiled to React.createElement() calls
   which return plain JavaScript objects (Virtual DOM nodes).

Q2: "Can React work without JSX?"
A: Yes! JSX is syntactic sugar. You can use React.createElement()
   directly, but JSX is more readable and widely used.

Q3: "What is the Virtual DOM?"
A: A lightweight JavaScript representation of the Real DOM.
   It's a tree of plain objects. React creates a new Virtual DOM
   on every render, diffs it with the previous one, and updates
   only the changed parts in the Real DOM (Reconciliation).

Q4: "What triggers a re-render?"
A: State change, props change, parent re-render, or context change.

Q5: "What is the difference between re-render and DOM update?"
A: Re-render means React calls the component function again.
   DOM update means actually changing something on screen.
   A re-render may NOT cause a DOM update if nothing changed.

Q6: "What is a Fragment?"
A: <></> or <React.Fragment> lets you group elements without
   adding an extra DOM node. Keeps the DOM clean.
*/

export { Counter, GoodReturn, FragmentExample, ExpressionsDemo };
