// ============================================================
// 🪝 TASK 3.4: useMemo & useCallback (Performance)
// ============================================================
import { useState, useMemo, useCallback, memo } from 'react';

// ━━━ THE PROBLEM: Unnecessary re-computation ━━━
function WithoutMemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ❌ This expensive calculation runs on EVERY render
  // Even when only `name` changes (count didn't change!)
  const expensiveValue = (() => {
    console.log('💰 Computing...');
    let sum = 0;
    for (let i = 0; i < 100000000; i++) sum += i;
    return sum + count;
  })();

  return (
    <div>
      <p>Result: {expensiveValue}</p>
      <button onClick={() => setCount(c => c + 1)}>Count+</button>
      <input value={name} onChange={e => setName(e.target.value)} />
    </div>
  );
}

// ━━━ useMemo — Memoize COMPUTED VALUES ━━━
function WithMemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ✅ Only recomputes when `count` changes
  const expensiveValue = useMemo(() => {
    console.log('💰 Computing...');
    let sum = 0;
    for (let i = 0; i < 100000000; i++) sum += i;
    return sum + count;
  }, [count]); // ← dependency array

  return (
    <div>
      <p>Result: {expensiveValue}</p>
      <button onClick={() => setCount(c => c + 1)}>Count+</button>
      <input value={name} onChange={e => setName(e.target.value)} />
    </div>
  );
}

// ━━━ useCallback — Memoize FUNCTIONS ━━━
/*
WHY? In JavaScript:
  const fn1 = () => {};
  const fn2 = () => {};
  fn1 === fn2  // false! Different references every time

So when parent re-renders, it creates new function → child gets
new prop → child re-renders even if nothing changed!
*/

// Child wrapped with React.memo (only re-renders if props change)
const ExpensiveChild = memo(({ onClick, label }) => {
  console.log(`🔄 ${label} rendered`);
  return <button onClick={onClick}>{label}</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // ❌ New function every render → ExpensiveChild re-renders
  const handleClickBad = () => setCount(c => c + 1);

  // ✅ Same function reference → ExpensiveChild skips re-render
  const handleClickGood = useCallback(() => {
    setCount(c => c + 1);
  }, []); // No deps = same function forever

  return (
    <div>
      <p>Count: {count}</p>
      <input value={text} onChange={e => setText(e.target.value)} />
      <ExpensiveChild onClick={handleClickBad} label="Bad (re-renders)" />
      <ExpensiveChild onClick={handleClickGood} label="Good (stable)" />
    </div>
  );
}

// ━━━ React.memo — Memoize COMPONENTS ━━━
const MemoizedComponent = memo(function MyComponent({ name, age }) {
  console.log('Rendered!');
  return <p>{name} is {age}</p>;
});
// Only re-renders if `name` or `age` actually CHANGE (shallow compare)

// Custom comparison:
const CustomMemo = memo(
  function ({ user }) { return <p>{user.name}</p>; },
  (prevProps, nextProps) => prevProps.user.id === nextProps.user.id
  // Return true = DON'T re-render, false = DO re-render
);

// ━━━ WHEN NOT TO USE ━━━
/*
DON'T use useMemo/useCallback when:
1. The computation is cheap (simple math, short arrays)
2. The value changes on every render anyway
3. Premature optimization (profile first!)
4. The memoized value is a primitive (React already optimizes)

RULE: "Don't optimize until you measure a problem"
*/

/*
🎯 INTERVIEW:
Q: "useMemo vs useCallback?"
A: useMemo memoizes a VALUE (result of computation).
   useCallback memoizes a FUNCTION reference.
   useCallback(fn, deps) === useMemo(() => fn, deps)

Q: "What is React.memo?"
A: HOC that prevents re-render if props haven't changed (shallow compare).

Q: "When should you use useMemo?"
A: Only for expensive computations or to maintain referential equality
   for objects/arrays passed as props to memoized children.
*/

export { WithMemo, Parent, MemoizedComponent };
