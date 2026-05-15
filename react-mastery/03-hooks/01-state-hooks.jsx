// ============================================================
// 🪝 TASK 3.1: useState & useReducer Deep Dive
// ============================================================
import { useState, useReducer } from 'react';

// ━━━ useState ADVANCED PATTERNS ━━━

// Pattern 1: Multiple related state → consider useReducer
function MultipleState() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState('');
  // ⚠️ Too many useState? → Use useReducer or single object state
  return null;
}

// Pattern 2: Derived state (DON'T store what you can calculate)
function DerivedState() {
  const [items, setItems] = useState([
    { name: 'Apple', price: 100 },
    { name: 'Banana', price: 50 },
  ]);

  // ❌ DON'T: Store total in state
  // const [total, setTotal] = useState(150);

  // ✅ DO: Calculate from existing state
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const count = items.length;

  return <p>Total: ₹{total} ({count} items)</p>;
}

// ━━━ useReducer (Complex State Logic) ━━━
/*
useReducer is better than useState when:
1. State has many sub-values
2. Next state depends on previous state
3. Complex update logic
4. Multiple actions on same state
*/

// Step 1: Define action types
const ACTIONS = {
  ADD: 'add',
  TOGGLE: 'toggle',
  DELETE: 'delete',
  EDIT: 'edit',
};

// Step 2: Reducer function (pure function!)
function todoReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD:
      return [...state, {
        id: Date.now(), text: action.payload, done: false
      }];
    case ACTIONS.TOGGLE:
      return state.map(t =>
        t.id === action.payload ? { ...t, done: !t.done } : t
      );
    case ACTIONS.DELETE:
      return state.filter(t => t.id !== action.payload);
    case ACTIONS.EDIT:
      return state.map(t =>
        t.id === action.payload.id
          ? { ...t, text: action.payload.text }
          : t
      );
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

// Step 3: Use in component
function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (!input.trim()) return;
    dispatch({ type: ACTIONS.ADD, payload: input });
    setInput('');
  };

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      {todos.map(todo => (
        <div key={todo.id}>
          <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
          <button onClick={() => dispatch({ type: ACTIONS.TOGGLE, payload: todo.id })}>
            Toggle
          </button>
          <button onClick={() => dispatch({ type: ACTIONS.DELETE, payload: todo.id })}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

// ━━━ useReducer with lazy init ━━━
function lazyInit(initialCount) {
  return { count: initialCount }; // Expensive computation here
}

function CounterReducer() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'increment': return { count: state.count + 1 };
        case 'decrement': return { count: state.count - 1 };
        case 'reset': return lazyInit(action.payload);
        default: return state;
      }
    },
    0,          // initialArg
    lazyInit    // lazy initializer function
  );

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset', payload: 0 })}>Reset</button>
    </div>
  );
}

/*
COMPARISON:
┌────────────────┬─────────────────┬─────────────────────┐
│                │ useState        │ useReducer          │
├────────────────┼─────────────────┼─────────────────────┤
│ Best for       │ Simple values   │ Complex state logic │
│ Update logic   │ Inline          │ Centralized reducer │
│ Testing        │ Harder          │ Pure fn = easy test │
│ Debugging      │ Scattered       │ Action log possible │
│ Related state  │ Multiple hooks  │ Single dispatch     │
└────────────────┴─────────────────┴─────────────────────┘

🎯 INTERVIEW:
Q: "When to use useReducer vs useState?"
A: useReducer when state is complex, has many sub-values, or when
   next state depends on previous. useState for simple primitives.

Q: "What is a reducer?"
A: A pure function (state, action) => newState. It takes current state
   and an action, returns new state without side effects.
*/

export { DerivedState, TodoApp, CounterReducer };
