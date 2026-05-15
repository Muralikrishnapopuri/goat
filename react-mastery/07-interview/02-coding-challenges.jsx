// ============================================================
// 🎯 TASK 7.2: Interview Coding Challenges
// ============================================================
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';

// ━━━ CHALLENGE 1: Counter with Undo ━━━
function CounterWithUndo() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([0]);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    setHistory(prev => [...prev, newCount]);
  };

  const undo = () => {
    if (history.length <= 1) return;
    const newHistory = history.slice(0, -1);
    setHistory(newHistory);
    setCount(newHistory[newHistory.length - 1]);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={undo} disabled={history.length <= 1}>Undo</button>
      <p>History: {history.join(' → ')}</p>
    </div>
  );
}

// ━━━ CHALLENGE 2: Todo App with Filter ━━━
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos(prev => [...prev, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active': return todos.filter(t => !t.done);
      case 'completed': return todos.filter(t => t.done);
      default: return todos;
    }
  }, [todos, filter]);

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && addTodo()} />
      <button onClick={addTodo}>Add</button>

      <div>
        {['all', 'active', 'completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ fontWeight: filter === f ? 'bold' : 'normal' }}>
            {f}
          </button>
        ))}
      </div>

      {filteredTodos.map(todo => (
        <div key={todo.id}>
          <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
          <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(todo.id)}>×</button>
        </div>
      ))}
      <p>{todos.filter(t => !t.done).length} items left</p>
    </div>
  );
}

// ━━━ CHALLENGE 3: Debounced Search ━━━
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

function SearchFilter() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!debouncedQuery) { setResults([]); return; }
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users?q=${debouncedQuery}`)
      .then(res => res.json())
      .then(data => { setResults(data); setLoading(false); });
  }, [debouncedQuery]);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)}
        placeholder="Search users..." />
      {loading && <p>Searching...</p>}
      {results.map(user => <p key={user.id}>{user.name}</p>)}
    </div>
  );
}

// ━━━ CHALLENGE 4: Infinite Scroll ━━━
function InfiniteScroll() {
  const [items, setItems] = useState(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));
  const [loading, setLoading] = useState(false);
  const observerRef = useRef(null);

  const lastItemRef = useCallback(node => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setLoading(true);
        setTimeout(() => {
          setItems(prev => [
            ...prev,
            ...Array.from({ length: 10 }, (_, i) => `Item ${prev.length + i + 1}`)
          ]);
          setLoading(false);
        }, 1000);
      }
    });

    if (node) observerRef.current.observe(node);
  }, [loading]);

  return (
    <div style={{ height: 400, overflow: 'auto' }}>
      {items.map((item, i) => (
        <p key={item} ref={i === items.length - 1 ? lastItemRef : null}
          style={{ padding: 10, borderBottom: '1px solid #eee' }}>
          {item}
        </p>
      ))}
      {loading && <p>Loading more...</p>}
    </div>
  );
}

// ━━━ CHALLENGE 5: Timer/Stopwatch ━━━
function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setTime(t => t + 10), 10);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const format = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(centis).padStart(2, '0')}`;
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'monospace', fontSize: 48 }}>{format(time)}</h1>
      <button onClick={() => setRunning(true)}>Start</button>
      <button onClick={() => setRunning(false)}>Stop</button>
      <button onClick={() => { setRunning(false); setTime(0); }}>Reset</button>
    </div>
  );
}

export { CounterWithUndo, TodoApp, SearchFilter, InfiniteScroll, Stopwatch };
