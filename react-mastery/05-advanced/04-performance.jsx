// ============================================================
// ⚡ TASK 5.4: Performance Optimization
// ============================================================
import { memo, useState, useCallback, useMemo, lazy, Suspense } from 'react';

// ━━━ 1. React.memo — Skip re-renders ━━━
const ExpensiveList = memo(function ExpensiveList({ items, onDelete }) {
  console.log('ExpensiveList rendered');
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => onDelete(item.id)}>X</button>
        </li>
      ))}
    </ul>
  );
});

function OptimizedParent() {
  const [count, setCount] = useState(0);
  const [items] = useState([
    { id: 1, name: 'React' }, { id: 2, name: 'Vue' }
  ]);

  // ✅ Stable function reference with useCallback
  const handleDelete = useCallback((id) => {
    console.log('Delete', id);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      {/* ExpensiveList won't re-render when count changes! */}
      <ExpensiveList items={items} onDelete={handleDelete} />
    </div>
  );
}

// ━━━ 2. Code Splitting with lazy() + Suspense ━━━
// Split heavy components into separate bundles loaded on demand
const HeavyChart = lazy(() => import('./HeavyChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<p>Loading chart...</p>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}

// ━━━ 3. Virtualization (Windowing) ━━━
// For HUGE lists (1000+ items), only render visible items
// Libraries: react-window, react-virtuoso, @tanstack/virtual
/*
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList height={400} width={300} itemSize={35} itemCount={items.length}>
      {({ index, style }) => (
        <div style={style}>{items[index].name}</div>
      )}
    </FixedSizeList>
  );
}
*/

// ━━━ 4. Avoid Inline Objects/Arrays in JSX ━━━
function BadPerformance() {
  // ❌ New object every render → child re-renders even with memo
  return <Child style={{ color: 'red' }} items={[1, 2, 3]} />;
}

function GoodPerformance() {
  // ✅ Stable references
  const style = useMemo(() => ({ color: 'red' }), []);
  const items = useMemo(() => [1, 2, 3], []);
  return <Child style={style} items={items} />;
}

function Child({ style, items }) { return null; }

// ━━━ PERFORMANCE CHECKLIST ━━━
/*
1. ✅ React.memo for expensive pure components
2. ✅ useCallback for function props
3. ✅ useMemo for expensive computations & object/array props
4. ✅ Code splitting with lazy() + Suspense
5. ✅ Virtualization for long lists
6. ✅ Avoid inline objects in JSX
7. ✅ Key prop for list reconciliation
8. ✅ Debounce/throttle expensive handlers
9. ✅ Use React DevTools Profiler to measure
10. ❌ Don't optimize prematurely — measure first!

🎯 INTERVIEW:
Q: "How do you optimize React performance?"
A: React.memo, useCallback, useMemo, code splitting, virtualization,
   proper keys, avoid inline objects, debounce handlers.

Q: "What is code splitting?"
A: Loading components on-demand using lazy() + Suspense instead of
   bundling everything upfront. Reduces initial bundle size.
*/

export { OptimizedParent, Dashboard };
