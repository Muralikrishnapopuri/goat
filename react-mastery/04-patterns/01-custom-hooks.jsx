// ============================================================
// 🎨 TASK 4.1: Custom Hooks
// ============================================================
import { useState, useEffect, useCallback, useRef } from 'react';

// ━━━ WHAT IS A CUSTOM HOOK? ━━━
/*
- A JavaScript function that starts with "use"
- Can use other hooks inside
- Extracts REUSABLE logic from components
- Each component using the hook gets its OWN state (not shared!)
*/

// ━━━ HOOK 1: useLocalStorage ━━━
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
// Usage: const [theme, setTheme] = useLocalStorage('theme', 'dark');

// ━━━ HOOK 2: useFetch ━━━
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => { setData(data); setError(null); })
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}
// Usage:
// const { data, loading, error } = useFetch('/api/users');
// if (loading) return <p>Loading...</p>;
// if (error) return <p>Error: {error}</p>;

// ━━━ HOOK 3: useDebounce ━━━
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
// Usage:
// const [query, setQuery] = useState('');
// const debouncedQuery = useDebounce(query, 300);
// useEffect(() => { search(debouncedQuery) }, [debouncedQuery]);

// ━━━ HOOK 4: useToggle ━━━
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return { value, toggle, setTrue, setFalse };
}
// Usage: const { value: isOpen, toggle } = useToggle();

// ━━━ HOOK 5: usePrevious ━━━
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; });
  return ref.current;
}
// Usage:
// const [count, setCount] = useState(0);
// const prevCount = usePrevious(count);
// <p>Now: {count}, Was: {prevCount}</p>

// ━━━ HOOK 6: useWindowSize ━━━
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handler = () => setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return size;
}

// ━━━ RULES OF HOOKS (Must Follow!) ━━━
/*
1. Only call hooks at the TOP LEVEL (not inside loops, conditions, nested fn)
2. Only call hooks from React components or custom hooks
3. Custom hooks must start with "use"

❌ WRONG:
if (isLoggedIn) { useState(0); }  // Conditional!
for (let i = 0; i < 5; i++) { useEffect(() => {}); } // Loop!

✅ RIGHT:
const [count, setCount] = useState(0); // Always at top level
useEffect(() => { if (isLoggedIn) { ... } }, [isLoggedIn]); // Condition INSIDE
*/

/*
🎯 INTERVIEW:
Q: "What are custom hooks?"
A: Functions starting with "use" that extract reusable stateful logic.
   Each component gets its own instance (state not shared).

Q: "What are the rules of hooks?"
A: 1) Only at top level  2) Only in components/custom hooks  3) Start with "use"
*/

export { useLocalStorage, useFetch, useDebounce, useToggle, usePrevious, useWindowSize };
