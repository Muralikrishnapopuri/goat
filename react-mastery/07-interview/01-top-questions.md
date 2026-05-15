# 🎯 React.js Interview Questions — Top 50+ with Answers

---

## 🟢 BASICS (1-15)

### Q1: What is React?
**A:** React is a JavaScript library for building user interfaces. It uses a component-based architecture and a Virtual DOM for efficient rendering. Created by Facebook (Meta).

### Q2: What is JSX?
**A:** JSX = JavaScript XML. Syntactic sugar that compiles to `React.createElement()` calls. It lets you write HTML-like code in JavaScript. JSX is optional — you can use React without it.

### Q3: What is the Virtual DOM?
**A:** A lightweight JS object tree representing the Real DOM. React creates a new Virtual DOM on each render, diffs it with the previous one, and applies only the minimal changes to the Real DOM (reconciliation).

### Q4: What is the difference between Real DOM and Virtual DOM?
| Real DOM | Virtual DOM |
|----------|------------|
| Slow updates | Fast updates |
| Direct manipulation | Batched through React |
| Causes reflow/repaint | Minimal DOM operations |
| Browser API | JS objects |

### Q5: What are Components?
**A:** Reusable, independent pieces of UI. Two types:
- **Functional** (modern, uses hooks) — a function returning JSX
- **Class** (legacy) — ES6 class extending React.Component

### Q6: What are Props?
**A:** Read-only data passed from parent to child. Flow one way (unidirectional). Can be any JS value. Children prop = content between tags.

### Q7: What is State?
**A:** Internal, mutable data owned by a component. When state changes → component re-renders. Updated via `useState` setter or `this.setState`.

### Q8: Props vs State?
| Props | State |
|-------|-------|
| External (parent) | Internal (self) |
| Read-only | Mutable (via setter) |
| Passed down | Local |

### Q9: What is the key prop?
**A:** A unique identifier for list items that helps React's reconciliation. Keys should be stable, unique IDs (not array indexes for dynamic lists).

### Q10: What are Synthetic Events?
**A:** React's cross-browser wrapper around native DOM events. Same API as native events but consistent across browsers. React uses event delegation (one listener at root).

### Q11: What is Conditional Rendering?
**A:** Showing different UI based on conditions. Methods: `if/else`, ternary `? :`, `&&` short-circuit, switch statement, early return.

### Q12: Controlled vs Uncontrolled Components?
- **Controlled:** React state drives input value (`value` + `onChange`)
- **Uncontrolled:** DOM manages value, React reads via `ref`

### Q13: What is a Fragment?
**A:** `<></>` or `<React.Fragment>` — groups elements without adding extra DOM node.

### Q14: What is React.StrictMode?
**A:** Dev-only wrapper that renders twice to detect side effects, warns about deprecated APIs. Zero effect in production.

### Q15: What is the children prop?
**A:** Special prop containing content between component tags: `<Card>this is children</Card>`

---

## 🟡 HOOKS (16-28)

### Q16: What are Hooks?
**A:** Functions that let you use state and lifecycle features in functional components. Introduced in React 16.8. Rules: only at top level, only in components/custom hooks.

### Q17: Explain useState
**A:** Returns `[value, setter]`. Setter can take a value or updater function `prev => newValue`. Supports lazy initialization: `useState(() => expensive())`.

### Q18: Why use updater function in setState?
**A:** `setCount(prev => prev + 1)` gets the latest value. Direct `setCount(count + 1)` uses stale closure value, causing bugs when called multiple times.

### Q19: Explain useEffect
**A:** Runs side effects after render. Dependency array controls when:
- `useEffect(fn)` → every render
- `useEffect(fn, [])` → mount only
- `useEffect(fn, [a,b])` → when a or b change
- Return function → cleanup (unmount/before next effect)

### Q20: useEffect vs useLayoutEffect?
- **useEffect:** async, after paint (non-blocking)
- **useLayoutEffect:** sync, before paint (blocks rendering)
- Use useLayoutEffect only for DOM measurements to prevent flicker

### Q21: What is useRef?
**A:** Returns `{ current: value }` that persists across renders without causing re-renders. Two uses: DOM access and mutable values (timers, previous values).

### Q22: useMemo vs useCallback?
- **useMemo:** Memoizes a computed VALUE `useMemo(() => compute(), [deps])`
- **useCallback:** Memoizes a FUNCTION reference `useCallback(fn, [deps])`
- `useCallback(fn, deps)` ≡ `useMemo(() => fn, deps)`

### Q23: When to use useReducer vs useState?
**A:** useReducer for complex state with multiple sub-values, when next state depends on previous, or when you need centralized update logic. useState for simple primitives.

### Q24: Explain useContext
**A:** Consumes context value from nearest Provider ancestor. Avoids props drilling. All consumers re-render when context value changes.

### Q25: What are Custom Hooks?
**A:** Functions starting with "use" that extract reusable stateful logic. Each component gets its own state instance (not shared).

### Q26: Rules of Hooks?
1. Only call at the **top level** (not in loops, conditions, nested functions)
2. Only call from **React components** or **custom hooks**
3. Custom hooks must **start with "use"**

### Q27: What is useTransition?
**A:** Marks state updates as non-urgent (low priority). React keeps UI responsive while processing the transition in the background. Returns `[isPending, startTransition]`.

### Q28: What is useDeferredValue?
**A:** Creates a "lagging" copy of a value that updates with lower priority. Like useTransition but for values you receive as props.

---

## 🔴 ADVANCED (29-45)

### Q29: What is Reconciliation?
**A:** React's algorithm for diffing old and new Virtual DOM trees to determine minimal DOM updates. Uses two heuristics: different types = rebuild, same type = update. Lists use keys. O(n) complexity.

### Q30: What is React Fiber?
**A:** React's internal reconciliation engine (React 16+). Uses linked-list tree structure. Can pause/resume/abort rendering work. Enables concurrent features and priority-based updates.

### Q31: Two phases of React rendering?
1. **Render phase** — interruptible, builds work-in-progress tree, no DOM changes
2. **Commit phase** — synchronous, applies DOM mutations atomically

### Q32: What is a Higher Order Component (HOC)?
**A:** A function that takes a component and returns an enhanced component. Pattern: `const Enhanced = withSomething(Component)`. Used for cross-cutting concerns (auth, logging, loading).

### Q33: What is the Render Props pattern?
**A:** Component takes a function prop that returns JSX. The component calls this function with its internal state. Allows sharing logic with flexible rendering.

### Q34: What are Error Boundaries?
**A:** Class components that catch JS errors in child component tree during rendering. Show fallback UI instead of crashing. Use `componentDidCatch` and `getDerivedStateFromError`. No hook equivalent.

### Q35: What DON'T Error Boundaries catch?
- Event handlers (use try/catch)
- Async code (promises, setTimeout)
- Server-side rendering
- Errors in the boundary itself

### Q36: What are Portals?
**A:** `ReactDOM.createPortal(child, container)` renders children into a DOM node outside the parent hierarchy. Used for modals, tooltips. Events still bubble through React tree.

### Q37: What is React.memo?
**A:** HOC that prevents re-render if props haven't changed (shallow comparison). Custom comparator: `memo(Component, (prev, next) => areEqual)`.

### Q38: What triggers a re-render?
1. State change (setState)
2. Props change
3. Parent re-renders
4. Context value change
5. forceUpdate() (class components)

### Q39: What is State Batching?
**A:** React groups multiple setState calls into a single re-render. React 18 batches in ALL contexts (event handlers, promises, setTimeout).

### Q40: What is Code Splitting?
**A:** Loading components on-demand using `React.lazy()` + `<Suspense>`. Reduces initial bundle size. Each lazy component becomes a separate chunk.

### Q41: What is the Compound Component pattern?
**A:** Components that share implicit state via Context. Parent manages state, children consume it. Example: `<Tabs> <Tabs.Tab> <Tabs.Panel>`.

### Q42: How does event delegation work in React?
**A:** React attaches ONE event listener to the root container (not individual elements). Events bubble up and React handles them at the root level — more memory efficient.

### Q43: What is Concurrent Mode?
**A:** React's ability to work on multiple state updates simultaneously, interrupting low-priority work for urgent updates. Enabled by Fiber architecture and React 18.

### Q44: Props Drilling and Solutions?
**A:** Passing props through many intermediate components. Solutions:
1. Context API
2. State management (Redux, Zustand)
3. Component composition (restructure)

### Q45: Explain the component lifecycle
**A:** Mount: constructor → render → componentDidMount. Update: render → componentDidUpdate. Unmount: componentWillUnmount. Hooks: useEffect(fn,[]) = mount, useEffect(fn,[deps]) = update, cleanup = unmount.

---

## 🟣 TYPESCRIPT + REACT (46-50)

### Q46: How to type props in React?
**A:** Use `interface` or `type`: `function Card({ title }: { title: string })` or define `interface CardProps { title: string }` separately.

### Q47: interface vs type for React props?
**A:** Both work. `interface` can be extended/merged (open). `type` supports unions/intersections. Convention: interface for object shapes, type for unions.

### Q48: How to type useState?
**A:** `const [user, setUser] = useState<User | null>(null)`. TypeScript infers from initial value for primitives.

### Q49: How to type event handlers?
**A:** Use React event types: `React.MouseEvent<HTMLButtonElement>`, `React.ChangeEvent<HTMLInputElement>`, `React.FormEvent<HTMLFormElement>`.

### Q50: What are Generic Components?
**A:** Components with type parameters: `function List<T>({ items }: { items: T[] })`. Type-safe for any data type. TypeScript infers T from usage.

---

## 💡 Scenario-Based Questions

### S1: "You notice your app is slow. How do you debug?"
1. Use React DevTools Profiler
2. Look for unnecessary re-renders (highlight updates)
3. Check expensive computations → useMemo
4. Check function props → useCallback + React.memo
5. Check large lists → virtualization
6. Check bundle size → code splitting

### S2: "How would you share state between sibling components?"
**A:** Lift state up to common parent. Or use Context API. Or state management library for global state.

### S3: "Build a debounced search input"
```jsx
function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  return <input value={query} onChange={e => setQuery(e.target.value)} />;
}
```

### S4: "Why is my useEffect running in an infinite loop?"
**A:** Common causes:
1. Missing dependency array (runs every render)
2. Object/array in deps (new reference each render → use useMemo)
3. Setting state inside effect without condition

### S5: "How to prevent a child from re-rendering when parent updates?"
**A:** Wrap child with `React.memo`. Ensure props are stable: `useCallback` for functions, `useMemo` for objects/arrays.
