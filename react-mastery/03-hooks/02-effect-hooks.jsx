// ============================================================
// 🪝 TASK 3.2: useEffect & useLayoutEffect
// ============================================================
import { useState, useEffect, useLayoutEffect, useRef } from 'react';

// ━━━ useEffect EXECUTION FLOW ━━━
/*
WHEN DOES useEffect RUN?
┌─────────────────────────────────────────────────────────┐
│ Component renders → DOM updated → Browser paints screen │
│                                    ↓                    │
│                               useEffect runs            │
│                            (AFTER paint, async)         │
└─────────────────────────────────────────────────────────┘

DEPENDENCY ARRAY CONTROLS WHEN:
useEffect(fn)         → runs after EVERY render
useEffect(fn, [])     → runs ONCE after first render (mount)
useEffect(fn, [a, b]) → runs when a OR b changes
*/

// ━━━ PATTERN 1: Run once on mount (API call) ━━━
function FetchData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This runs ONCE after component mounts
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []); // ← Empty array = run once

  if (loading) return <p>Loading...</p>;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

// ━━━ PATTERN 2: Run on dependency change ━━━
function SearchUsers() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) { setResults([]); return; }

    const controller = new AbortController(); // For cleanup!

    fetch(`https://api.example.com/search?q=${query}`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => {
        if (err.name !== 'AbortError') console.error(err);
      });

    // CLEANUP: Cancel previous request if query changes before it finishes
    return () => controller.abort();
  }, [query]); // ← Runs when query changes

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>
    </div>
  );
}

// ━━━ PATTERN 3: Cleanup (subscriptions, timers, listeners) ━━━
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // CLEANUP: Runs when component unmounts OR before next effect
    return () => {
      clearInterval(id);
      console.log('Timer cleaned up!');
    };
  }, []); // Mount once, cleanup on unmount

  return <p>Time: {seconds}s</p>;
}

// ━━━ PATTERN 4: Event listeners ━━━
function WindowSize() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setSize({ w: window.innerWidth, h: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <p>Window: {size.w} x {size.h}</p>;
}

// ━━━ COMMON MISTAKES ━━━
function Mistakes() {
  const [count, setCount] = useState(0);

  // ❌ MISTAKE 1: Missing dependency
  // useEffect(() => {
  //   console.log(count); // Uses count but not in deps!
  // }, []); // React warns: missing dependency 'count'

  // ❌ MISTAKE 2: Object/array in deps (infinite loop!)
  // const config = { theme: 'dark' };
  // useEffect(() => { ... }, [config]); // New object every render!

  // ✅ FIX: useMemo the object, or put primitive values in deps
  // useEffect(() => { ... }, [config.theme]);

  // ❌ MISTAKE 3: Setting state without condition (infinite loop!)
  // useEffect(() => {
  //   setCount(count + 1); // Infinite! setState → re-render → effect → setState...
  // });

  return null;
}

// ━━━ useLayoutEffect ━━━
/*
useLayoutEffect vs useEffect:
┌──────────────────┬─────────────────────┬─────────────────────┐
│                  │ useEffect           │ useLayoutEffect     │
├──────────────────┼─────────────────────┼─────────────────────┤
│ Runs             │ After paint (async) │ Before paint (sync) │
│ Blocks painting  │ No                  │ Yes                 │
│ Use for          │ API calls, timers   │ DOM measurements    │
│ Performance      │ Better (non-block)  │ Can cause jank      │
└──────────────────┴─────────────────────┴─────────────────────┘

USE useLayoutEffect ONLY when you need to:
- Measure DOM before browser paints
- Prevent visual flicker
*/

function TooltipPosition() {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    // Measure DOM BEFORE browser paints → no flicker
    setHeight(ref.current.getBoundingClientRect().height);
  }, []);

  return (
    <div>
      <div ref={ref} style={{ padding: '20px' }}>Content</div>
      <p>Height: {height}px</p>
    </div>
  );
}

/*
🎯 INTERVIEW QUESTIONS:
Q: "What is useEffect?"
A: A hook for side effects (API calls, subscriptions, timers).
   Runs AFTER render and DOM update.

Q: "What does the dependency array do?"
A: Controls when effect re-runs. [] = mount only, [a,b] = when a or b change.

Q: "What is the cleanup function?"
A: Return function from useEffect. Runs on unmount and before next effect.
   Used for: clearing timers, unsubscribing, canceling requests.

Q: "useEffect vs useLayoutEffect?"
A: useEffect runs after paint (async, non-blocking).
   useLayoutEffect runs before paint (sync, blocks rendering).
   Use useLayoutEffect only for DOM measurements to prevent flicker.
*/

export { FetchData, SearchUsers, Timer, WindowSize, TooltipPosition };
