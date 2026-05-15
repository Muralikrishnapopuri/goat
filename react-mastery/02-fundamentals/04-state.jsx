// ============================================================
// 🧱 TASK 2.4: STATE — Internal Component Data
// ============================================================
import { useState } from 'react';

// ━━━ WHAT IS STATE? ━━━
// State = data owned by a component that can CHANGE.
// When state changes → React RE-RENDERS the component.
// State is LOCAL — other components can't access it directly.

// ━━━ useState BASICS ━━━
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// ━━━ UPDATER FUNCTION (Critical!) ━━━
function CounterUpdater() {
  const [count, setCount] = useState(0);

  // ❌ WRONG: Uses stale closure value
  const wrongWay = () => {
    setCount(count + 1); // count = 0
    setCount(count + 1); // count still 0! → Result: 1
  };

  // ✅ RIGHT: Updater gets latest value
  const rightWay = () => {
    setCount(prev => prev + 1); // 0→1
    setCount(prev => prev + 1); // 1→2
    setCount(prev => prev + 1); // 2→3 → Result: 3 ✅
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={wrongWay}>Wrong +3</button>
      <button onClick={rightWay}>Right +3</button>
    </div>
  );
}

// ━━━ OBJECT STATE (Immutability!) ━━━
function UserForm() {
  const [user, setUser] = useState({
    name: 'Murali',
    address: { city: 'Chennai', state: 'TN' }
  });

  // ❌ user.name = 'X' → React won't detect change!
  // ✅ Create new object:
  const updateName = () => setUser(p => ({ ...p, name: 'Krishna' }));
  // ✅ Nested update:
  const updateCity = () => setUser(p => ({
    ...p, address: { ...p.address, city: 'Bangalore' }
  }));

  return (
    <div>
      <p>{user.name} - {user.address.city}</p>
      <button onClick={updateName}>Change Name</button>
      <button onClick={updateCity}>Change City</button>
    </div>
  );
}

// ━━━ ARRAY STATE ━━━
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: false },
  ]);

  const add = (text) => setTodos(p => [...p, { id: Date.now(), text, done: false }]);
  const remove = (id) => setTodos(p => p.filter(t => t.id !== id));
  const toggle = (id) => setTodos(p =>
    p.map(t => t.id === id ? { ...t, done: !t.done } : t)
  );

  return (
    <div>
      {todos.map(t => (
        <div key={t.id}>
          <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
            {t.text}
          </span>
          <button onClick={() => toggle(t.id)}>Toggle</button>
          <button onClick={() => remove(t.id)}>Delete</button>
        </div>
      ))}
      <button onClick={() => add('New Task')}>Add</button>
    </div>
  );
}

// ━━━ LAZY INITIALIZATION ━━━
function ExpensiveInit() {
  // ✅ Function runs only on FIRST render:
  const [data, setData] = useState(() => {
    return Array(1000).fill(0).map((_, i) => i * 2);
  });
  return <p>Items: {data.length}</p>;
}

// ━━━ STATE BATCHING (React 18+) ━━━
// React groups multiple setState calls into ONE re-render.
// Works in event handlers, setTimeout, promises, etc.

/*
🎯 INTERVIEW QUESTIONS:
Q: "Why can't we mutate state directly?"
A: React uses Object.is() comparison. Same reference = no re-render.

Q: "What is the updater function?"
A: setCount(prev => prev + 1) — gets latest value, avoids stale closures.

Q: "What is state batching?"
A: React 18 groups multiple setState calls into a single re-render.

Q: "How to update nested objects?"
A: Spread at each level: {...prev, address: {...prev.address, city: 'X'}}
*/

export { Counter, CounterUpdater, UserForm, TodoList, ExpensiveInit };
