# SECTION B: React — Expert Answers

---

## 1. Virtual DOM

The **Virtual DOM** is a lightweight JavaScript object representation of the real DOM. React keeps a copy in memory and uses it to determine the minimum changes needed.

**Flow:**
1. State/props change → React creates a **new** Virtual DOM tree
2. React **diffs** the new tree against the previous one
3. Calculates the **minimum set of changes** (patches)
4. Applies only those changes to the **real DOM** (batch update)

```
State Change → New VDOM → Diff (Old vs New) → Patch Real DOM
```

**Why?** Direct DOM manipulation is expensive (reflows, repaints). Virtual DOM batches updates and minimizes real DOM touches.

**Interview answer:**
> "Virtual DOM is React's in-memory representation of the UI. When state changes, React builds a new VDOM tree, diffs it against the previous one using the Diffing Algorithm, and applies only the minimal changes to the real DOM. This makes updates efficient because direct DOM manipulation is the most expensive browser operation."

---

## 2. Diffing Algorithm

React's algorithm to compare two VDOM trees efficiently. Instead of O(n³) generic tree diff, React uses **heuristics** to achieve O(n):

**Two key assumptions:**
1. **Different element types** produce different trees → React destroys old tree, builds new one
2. **Keys** identify which child elements are stable across renders

```jsx
// Different types → full re-render
<div> → <span>  // React unmounts div, mounts span

// Same type → update attributes only
<div className="old"> → <div className="new">  // Only className changes

// Lists without keys → re-renders ALL (bad)
// Lists with keys → only re-orders/adds/removes changed items (good)
```

---

## 3. Reconciliation

**Reconciliation** is the process by which React updates the DOM. It's the overall algorithm that includes diffing.

**Steps:**
1. `setState` / state change triggers re-render
2. React calls `render()` to produce new VDOM
3. React **reconciles** (diffs) new VDOM vs old VDOM
4. Computes **minimal set of DOM operations**
5. **Commits** changes to real DOM in a batch

**Interview answer:**
> "Reconciliation is React's process of comparing the previous VDOM with the new one to determine what changed. It uses the Diffing Algorithm with two heuristics: elements of different types produce different trees, and the 'key' prop helps identify stable elements in lists. The output is a minimal set of DOM mutations."

---

## 4. React Fiber

**React Fiber** is the re-implementation of React's core reconciliation algorithm (introduced in React 16).

**Key improvements over old stack reconciler:**
- **Incremental rendering** — Can split rendering work into chunks
- **Prioritization** — Can prioritize updates (animations > data fetching)
- **Pause/resume** — Can pause work and come back later
- **Abort** — Can abandon work if no longer needed

**How it works:**
- Each component becomes a **Fiber node** (a unit of work)
- Fiber creates a **linked list** of work units
- Uses **requestIdleCallback** concept to do work during browser idle periods
- Two phases: **Render phase** (interruptible) → **Commit phase** (synchronous)

**Interview answer:**
> "React Fiber is the reconciliation engine introduced in React 16. It breaks rendering into units of work (fiber nodes) that can be paused, prioritized, and resumed. This enables features like Suspense, Concurrent Mode, and prevents long renders from blocking the main thread."

---

## 5. React Rendering Process

```
Trigger → Render Phase → Commit Phase → Browser Paint

1. TRIGGER: setState, props change, parent re-render, context change
2. RENDER PHASE (interruptible):
   - React calls component functions
   - Builds new VDOM tree
   - Diffs with previous tree
   - NO DOM mutations yet
3. COMMIT PHASE (synchronous):
   - React applies DOM mutations
   - Runs useLayoutEffect
   - Browser paints
   - Runs useEffect
```

---

## 6. Props vs State

| Aspect | Props | State |
|--------|-------|-------|
| **Ownership** | Passed from parent | Owned by component |
| **Mutability** | Read-only (immutable) | Mutable via setState |
| **Flow** | Top-down (unidirectional) | Internal |
| **Re-render** | When parent passes new props | When setState is called |
| **Purpose** | Configure child component | Track changing data |

```jsx
// Props: Parent controls, child reads
function Parent() {
  return <Child name="Murali" />;
}
function Child({ name }) {
  return <h1>{name}</h1>; // Can't modify 'name'
}

// State: Component owns and manages
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

---

## 7. Controlled vs Uncontrolled Components

**Controlled:** React state is the single source of truth. Every change goes through React.
```jsx
function Controlled() {
  const [value, setValue] = useState('');
  return <input value={value} onChange={e => setValue(e.target.value)} />;
}
```

**Uncontrolled:** DOM itself holds the state. React reads it when needed via `ref`.
```jsx
function Uncontrolled() {
  const inputRef = useRef();
  const handleSubmit = () => console.log(inputRef.current.value);
  return <input ref={inputRef} defaultValue="" />;
}
```

| Aspect | Controlled | Uncontrolled |
|--------|-----------|-------------|
| **Source of truth** | React state | DOM |
| **Validation** | On every keystroke | On submit |
| **Performance** | Re-renders on each change | No re-renders |
| **Use case** | Forms needing validation | Simple forms, file inputs |

---

## 8. useState

```jsx
const [state, setState] = useState(initialValue);
```

**Key rules:**
1. **Never mutate directly:** `state.push(item)` ❌ → `setState([...state, item])` ✅
2. **Functional updates** when new state depends on previous:
   ```jsx
   setCount(prev => prev + 1); // ✅ Guaranteed latest value
   setCount(count + 1);        // ❌ Stale closure risk
   ```
3. **Lazy initialization** for expensive computations:
   ```jsx
   const [data, setData] = useState(() => expensiveComputation());
   ```
4. **Batching:** Multiple setStates in same event handler = single re-render (React 18+)

---

## 9. useEffect

Handles **side effects**: API calls, subscriptions, DOM manipulation, timers.

```jsx
useEffect(() => {
  // Side effect code (runs AFTER render + paint)
  const subscription = subscribe(id);
  
  return () => {
    // Cleanup (runs before next effect or unmount)
    subscription.unsubscribe();
  };
}, [id]); // Dependency array
```

**Execution timeline:**
```
Render → Paint → useEffect runs → (re-render) → Cleanup → useEffect runs again
```

---

## 10. Dependency Array

Controls WHEN useEffect runs:

```jsx
useEffect(() => {}, []);      // Empty: runs ONCE after mount
useEffect(() => {}, [a, b]);  // Runs when 'a' or 'b' changes
useEffect(() => {});          // No array: runs EVERY render (usually a bug)
```

**Rules:**
- Include ALL values from component scope used inside the effect
- Objects/arrays create new references each render → use `useMemo` or extract primitives
- Functions should be wrapped in `useCallback` or moved inside useEffect

---

## 11. Cleanup Function

Returned function from `useEffect` that cleans up the previous effect before running the next one or on unmount.

```jsx
useEffect(() => {
  const timer = setInterval(() => tick(), 1000);
  const handler = (e) => handleResize(e);
  window.addEventListener('resize', handler);
  
  return () => {
    clearInterval(timer);                        // Clear timer
    window.removeEventListener('resize', handler); // Remove listener
  };
}, []);
```

**When cleanup runs:**
1. Before the effect re-runs (when dependencies change)
2. When component unmounts

---

## 12. Why useEffect Runs Twice

In **React 18 StrictMode (development only)**, React intentionally:
1. Mounts the component
2. Unmounts it (runs cleanup)
3. Mounts it again

**Why?** To help you find bugs — effects that don't clean up properly. If your effect breaks on remount, you have a bug.

**It does NOT happen in production.** Only in development with `<StrictMode>`.

**Fix:** Don't try to prevent it. Instead, write proper cleanup:
```jsx
useEffect(() => {
  const controller = new AbortController();
  fetch(url, { signal: controller.signal }).then(/* ... */);
  return () => controller.abort(); // Proper cleanup
}, [url]);
```

---

## 13. useRef

Returns a mutable ref object (`{ current: value }`) that persists across renders **without causing re-renders**.

```jsx
// Use 1: Access DOM elements
const inputRef = useRef(null);
<input ref={inputRef} />
inputRef.current.focus(); // Direct DOM access

// Use 2: Store mutable values (doesn't trigger re-render)
const renderCount = useRef(0);
useEffect(() => { renderCount.current++; });

// Use 3: Store previous value
const prevValue = useRef();
useEffect(() => { prevValue.current = currentValue; }, [currentValue]);
```

**`useRef` vs `useState`:** useRef changes don't trigger re-renders. Use for values you need to persist but don't need to display.

---

## 14. useMemo

Memoizes a **computed value**. Re-computes only when dependencies change.

```jsx
const expensiveValue = useMemo(() => {
  return items.filter(i => i.active).sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

**When to use:**
- Expensive computations (sorting, filtering large arrays)
- Referential equality for objects/arrays passed as props
- Preventing unnecessary child re-renders

**When NOT to use:**
- Simple calculations
- Primitive values (strings, numbers already have stable references)

---

## 15. useCallback

Memoizes a **function reference**. Returns same function instance unless dependencies change.

```jsx
const handleClick = useCallback((id) => {
  setItems(prev => prev.filter(item => item.id !== id));
}, []); // Empty deps = same function forever

// Without useCallback: new function every render → child re-renders
// With useCallback: same function reference → child skips re-render (if using React.memo)
```

**Key:** `useCallback` is only useful when the callback is passed to a memoized child (`React.memo`) or used in a dependency array.

---

## 16. React.memo

**Higher-order component** that memoizes a component. Skips re-render if props haven't changed (shallow comparison).

```jsx
const ExpensiveList = React.memo(function ExpensiveList({ items, onDelete }) {
  console.log('Rendering list...');
  return items.map(item => (
    <div key={item.id} onClick={() => onDelete(item.id)}>{item.name}</div>
  ));
});

// Custom comparison
const MemoComp = React.memo(Component, (prevProps, nextProps) => {
  return prevProps.id === nextProps.id; // Return true to SKIP re-render
});
```

**Combo:** `React.memo` + `useCallback` + `useMemo` = maximum optimization.

---

## 17. Context API

Provides a way to pass data through the component tree without prop drilling.

```jsx
// 1. Create
const ThemeContext = createContext('light');

// 2. Provide
function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Dashboard />
    </ThemeContext.Provider>
  );
}

// 3. Consume
function Button() {
  const { theme, setTheme } = useContext(ThemeContext);
  return <button className={theme}>Toggle</button>;
}
```

**Caveat:** ALL consumers re-render when the context value changes. Split contexts or use `useMemo` on the value to mitigate.

---

## 18. Context API vs Redux

| Aspect | Context API | Redux |
|--------|------------|-------|
| **Purpose** | Prop drilling solution | Full state management |
| **Complexity** | Simple | More boilerplate |
| **Performance** | All consumers re-render | Selective subscriptions |
| **DevTools** | None | Redux DevTools (time-travel) |
| **Middleware** | None | Thunk, Saga for async |
| **Best for** | Theme, auth, locale | Complex, shared state |
| **Scale** | Small-medium apps | Large apps |

**Interview answer:**
> "Context API is great for low-frequency updates like theme or auth state. Redux is better for high-frequency, complex state shared across many components because it allows selective subscriptions — only components that use specific state slices re-render. For most apps, Context + useReducer is sufficient."

---

## 19. Prop Drilling

Passing props through multiple intermediate components that don't use them, just to reach a deeply nested child.

```jsx
// ❌ Prop Drilling
App → Layout → Sidebar → UserInfo → Avatar
// 'user' prop passed through Layout and Sidebar unnecessarily

// ✅ Solutions:
// 1. Context API
// 2. Redux / Zustand
// 3. Component composition (children pattern)
function Layout({ children }) {
  return <div className="layout">{children}</div>;
}
<Layout><Avatar user={user} /></Layout>
```

---

## 20. Custom Hooks

Extract reusable stateful logic into functions prefixed with `use`.

```jsx
// Custom hook: useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(data => { setData(data); setLoading(false); })
      .catch(err => {
        if (err.name !== 'AbortError') { setError(err); setLoading(false); }
      });
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// Usage
function Users() {
  const { data, loading, error } = useFetch('/api/users');
  if (loading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <UserList users={data} />;
}
```

**Rules:** Must start with `use`, can call other hooks, follows Rules of Hooks.

---

## 21. React Router

```jsx
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/dashboard/*" element={<Dashboard />} /> {/* Nested routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function UserProfile() {
  const { id } = useParams();           // URL params
  const navigate = useNavigate();        // Programmatic navigation
  return <button onClick={() => navigate('/home')}>Go Home</button>;
}
```

---

## 22. Protected Routes

```jsx
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// Role-based
function RoleRoute({ children, requiredRole }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== requiredRole) return <Navigate to="/unauthorized" />;
  return children;
}

// Usage
<Route path="/admin" element={
  <ProtectedRoute>
    <RoleRoute requiredRole="admin">
      <AdminDashboard />
    </RoleRoute>
  </ProtectedRoute>
} />
```

---

## 23. Lazy Loading

Load components **on demand** instead of upfront.

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

**Benefits:** Smaller initial bundle, faster first load, code splitting by route.

---

## 24. Code Splitting

Breaking the bundle into smaller chunks loaded on demand.

**Methods:**
1. **`React.lazy` + `Suspense`** — Route-level splitting (above)
2. **Dynamic `import()`** — Any module
3. **Webpack magic comments** — Named chunks

```js
// Named chunk (Webpack)
const AdminPanel = lazy(() => import(/* webpackChunkName: "admin" */ './Admin'));

// Conditional import
button.onclick = async () => {
  const { heavyFunction } = await import('./heavyModule');
  heavyFunction();
};
```

---

## 25. Suspense

Declaratively handle loading states for lazy components and (in React 18+) data fetching.

```jsx
<Suspense fallback={<Skeleton />}>
  <LazyComponent />
</Suspense>

// Nested Suspense boundaries
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <Suspense fallback={<ListSkeleton />}>
    <ProductList />
  </Suspense>
</Suspense>
```

---

## 26. Error Boundaries

Class components that catch JavaScript errors in their child component tree. **Cannot be done with hooks (yet).**

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo); // Send to Sentry, etc.
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong: {this.state.error.message}</div>;
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <RiskyComponent />
</ErrorBoundary>
```

**Note:** Error boundaries do NOT catch: event handlers, async code, SSR, errors in the boundary itself.

---

## 27. Portals

Render children into a DOM node **outside** the parent component's DOM hierarchy.

```jsx
import { createPortal } from 'react-dom';

function Modal({ children, onClose }) {
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') // Rendered here in DOM
  );
}
```

**Use cases:** Modals, tooltips, dropdowns — things that need to visually "break out" of parent overflow/z-index.

**Key:** Events still bubble through React's component tree (not DOM tree).

---

## 28. Fragments

Group multiple elements without adding extra DOM nodes.

```jsx
// Long syntax
<React.Fragment>
  <h1>Title</h1>
  <p>Content</p>
</React.Fragment>

// Short syntax
<>
  <h1>Title</h1>
  <p>Content</p>
</>

// With key (only Fragment, not <>)
{items.map(item => (
  <React.Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.desc}</dd>
  </React.Fragment>
))}
```

---

## 29. StrictMode

Development-only tool that highlights potential problems:

```jsx
<React.StrictMode>
  <App />
</React.StrictMode>
```

**What it does:**
- Double-invokes render, effects, and state updaters (to find impure renders)
- Warns about deprecated lifecycle methods
- Warns about legacy string refs
- Warns about findDOMNode usage
- **Does nothing in production**

---

## 30. Component Re-rendering

**A component re-renders when:**
1. Its **state** changes (`setState`)
2. Its **parent** re-renders (even if props unchanged)
3. **Context** it consumes changes
4. **forceUpdate()** is called (class components)

**Preventing unnecessary re-renders:**
```jsx
// 1. React.memo for child components
const Child = React.memo(({ data }) => <div>{data}</div>);

// 2. useMemo for computed values
const filtered = useMemo(() => items.filter(i => i.active), [items]);

// 3. useCallback for callbacks passed to children
const handleClick = useCallback(() => doSomething(id), [id]);

// 4. Split state — keep state close to where it's used
// 5. Key prop — use stable, unique keys in lists
```

---

## 31. Performance Optimization

**Comprehensive checklist:**

| Technique | Tool | When |
|-----------|------|------|
| Memoize components | `React.memo` | Expensive child re-renders |
| Memoize values | `useMemo` | Expensive computations |
| Memoize callbacks | `useCallback` | Callbacks to memo'd children |
| Code splitting | `lazy` + `Suspense` | Large bundles |
| Virtualization | `react-window` / `react-virtuoso` | Long lists (1000+ items) |
| Debounce inputs | Custom debounce | Search, filter inputs |
| Image optimization | Lazy loading, WebP | Image-heavy pages |
| Bundle analysis | `webpack-bundle-analyzer` | Identify large deps |
| Profiling | React DevTools Profiler | Find bottlenecks |

---

## 32. API Integration

```jsx
// Modern approach with custom hook + AbortController
function useApi(url) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState(s => ({ ...s, loading: true }));

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => setState({ data, loading: false, error: null }))
      .catch(err => {
        if (err.name !== 'AbortError') {
          setState({ data: null, loading: false, error: err.message });
        }
      });

    return () => controller.abort();
  }, [url]);

  return state;
}

// With Axios + interceptors
const api = axios.create({ baseURL: '/api' });
api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) refreshToken();
    return Promise.reject(err);
  }
);
```

---

## 33. Folder Structure

```
src/
├── assets/          # Images, fonts, static files
├── components/      # Reusable UI components
│   ├── ui/          # Button, Input, Modal, Table
│   └── layout/      # Header, Footer, Sidebar
├── pages/           # Route-level components
├── hooks/           # Custom hooks
├── context/         # React contexts
├── services/        # API call functions
├── utils/           # Helper functions
├── constants/       # App constants, enums
├── routes/          # Route configuration
├── store/           # Redux/Zustand store (if used)
└── App.jsx
```

---

## 34. Project Architecture

**Feature-based architecture** (recommended for large apps):
```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── context/
│   │   └── index.js
│   ├── products/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── index.js
│   └── orders/
├── shared/
│   ├── components/
│   ├── hooks/
│   └── utils/
└── App.jsx
```

**Interview answer:**
> "I follow a feature-based architecture where each feature (auth, products, orders) is self-contained with its own components, hooks, services, and context. Shared utilities go in a shared folder. This scales well because adding new features doesn't pollute existing code, and teams can work on features independently."
