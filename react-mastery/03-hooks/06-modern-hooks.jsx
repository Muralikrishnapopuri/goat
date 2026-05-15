// ============================================================
// 🪝 TASK 3.6: React 18/19 Modern Hooks
// ============================================================
import { useState, useTransition, useDeferredValue, useId } from 'react';

// ━━━ useTransition — Mark updates as non-urgent ━━━
/*
Problem: Typing in search → filtering 10,000 items → UI freezes
Solution: Mark the filtering as "transition" (low priority)
React keeps the input responsive while filtering in background
*/
function SearchWithTransition() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();
  const [filteredItems, setFilteredItems] = useState([]);

  const allItems = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value); // ← HIGH priority (keep input responsive)

    startTransition(() => {
      // ← LOW priority (can be interrupted)
      const filtered = allItems.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="Search..." />
      {isPending && <p>Filtering...</p>}
      <ul>
        {filteredItems.slice(0, 100).map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// ━━━ useDeferredValue — Defer a value update ━━━
/*
Similar to useTransition but for VALUES you receive (like props).
Creates a "lagging" copy that updates with lower priority.
*/
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery; // True while updating

  const items = Array.from({ length: 5000 }, (_, i) => `Result ${i}`);
  const filtered = items.filter(item =>
    item.toLowerCase().includes(deferredQuery.toLowerCase())
  );

  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      {filtered.slice(0, 50).map(item => (
        <p key={item}>{item}</p>
      ))}
    </div>
  );
}

function DeferredDemo() {
  const [query, setQuery] = useState('');
  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <SearchResults query={query} />
    </div>
  );
}

// ━━━ useId — Generate unique IDs for accessibility ━━━
function FormField({ label }) {
  const id = useId(); // Generates unique ID (works with SSR!)

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type="text" />
    </div>
  );
}
// Multiple instances get different IDs automatically
// <FormField label="Name" />  → id=":r0:"
// <FormField label="Email" /> → id=":r1:"

// ━━━ COMPARISON ━━━
/*
┌─────────────────────┬────────────────────────────────────────┐
│ Hook                │ Use Case                               │
├─────────────────────┼────────────────────────────────────────┤
│ useTransition       │ Mark YOUR state update as low priority │
│ useDeferredValue    │ Defer a VALUE (often from props)       │
│ useId               │ Generate unique IDs for a11y/SSR       │
│ useSyncExternalStore│ Subscribe to external store (Redux)    │
└─────────────────────┴────────────────────────────────────────┘

🎯 INTERVIEW:
Q: "What is Concurrent Rendering?"
A: React 18 can interrupt rendering to handle urgent updates first.
   Non-urgent updates (transitions) can be paused/resumed.

Q: "useTransition vs useDeferredValue?"
A: useTransition wraps a setState call to mark it low-priority.
   useDeferredValue creates a low-priority copy of a value.
   Use useTransition when you control the state update.
   Use useDeferredValue when you receive the value as a prop.
*/

export { SearchWithTransition, DeferredDemo, FormField };
