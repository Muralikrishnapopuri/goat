// ============================================================
// 🎨 TASK 4.3: Render Props Pattern
// ============================================================
import { useState, useEffect } from 'react';

// ━━━ WHAT IS RENDER PROPS? ━━━
/*
A component that takes a FUNCTION as a prop (or children) and calls it
to determine what to render. The function receives data/state as args.
*/

// ━━━ EXAMPLE 1: Mouse Tracker ━━━
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return render(position); // Calls the render function with data
}

// Usage — different UIs, same logic:
function App() {
  return (
    <div>
      {/* Display as text */}
      <MouseTracker render={({ x, y }) => (
        <p>Mouse: {x}, {y}</p>
      )} />

      {/* Display as a following dot */}
      <MouseTracker render={({ x, y }) => (
        <div style={{
          position: 'fixed', left: x, top: y,
          width: 20, height: 20, borderRadius: '50%',
          background: 'red', transform: 'translate(-50%, -50%)'
        }} />
      )} />
    </div>
  );
}

// ━━━ EXAMPLE 2: Function as Children ━━━
function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); });
  }, [url]);

  return children({ data, loading }); // children IS the render function
}

// Usage:
function UserPage() {
  return (
    <DataFetcher url="/api/users">
      {({ data, loading }) => {
        if (loading) return <p>Loading...</p>;
        return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
      }}
    </DataFetcher>
  );
}

// ━━━ EXAMPLE 3: Toggle Render Prop ━━━
function Toggle({ children }) {
  const [on, setOn] = useState(false);
  return children({ on, toggle: () => setOn(v => !v) });
}

function ToggleDemo() {
  return (
    <Toggle>
      {({ on, toggle }) => (
        <div>
          <p>{on ? 'ON' : 'OFF'}</p>
          <button onClick={toggle}>Toggle</button>
        </div>
      )}
    </Toggle>
  );
}

/*
━━━ RENDER PROPS vs HOOKS vs HOC ━━━
┌────────────────┬────────────┬──────────────┬──────────────┐
│ Feature        │ HOC        │ Render Props │ Custom Hooks │
├────────────────┼────────────┼──────────────┼──────────────┤
│ Reuses logic   │ ✅         │ ✅           │ ✅           │
│ Wrapper div    │ Yes        │ No           │ No           │
│ Readability    │ Medium     │ Can nest     │ Best ✅      │
│ Modern         │ Legacy     │ Still used   │ Preferred ✅ │
└────────────────┴────────────┴──────────────┴──────────────┘

🎯 INTERVIEW:
Q: "What is Render Props?"
A: A pattern where a component receives a function prop that returns JSX.
   The component calls this function with its internal state/data.

Q: "Render Props vs Custom Hooks?"
A: Both share logic. Custom hooks are simpler and don't add to the
   component tree. Render Props still useful for component-level flexibility.
*/

export { MouseTracker, DataFetcher, Toggle, App };
