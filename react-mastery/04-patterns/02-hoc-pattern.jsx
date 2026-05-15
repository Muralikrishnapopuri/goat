// ============================================================
// 🎨 TASK 4.2: Higher Order Components (HOC)
// ============================================================
import { useState, useEffect } from 'react';

// ━━━ WHAT IS A HOC? ━━━
/*
A HOC is a FUNCTION that takes a component and returns a NEW component
with enhanced behavior. It's a pattern, not a React API.

Pattern: const Enhanced = withSomething(OriginalComponent)
*/

// ━━━ HOC 1: withLoader — Add loading state ━━━
function withLoader(WrappedComponent, fetchUrl) {
  return function WithLoaderComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(fetchUrl)
        .then(res => res.json())
        .then(data => { setData(data); setLoading(false); });
    }, []);

    if (loading) return <p>Loading...</p>;
    return <WrappedComponent data={data} {...props} />;
  };
}

// Usage:
function UserList({ data }) {
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
const UserListWithLoader = withLoader(UserList, '/api/users');
// <UserListWithLoader /> ← automatically handles loading!

// ━━━ HOC 2: withAuth — Protect routes ━━━
function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
      return <p>Please log in to view this page.</p>;
    }
    return <WrappedComponent {...props} />;
  };
}

function Dashboard() { return <h1>Secret Dashboard</h1>; }
const ProtectedDashboard = withAuth(Dashboard);

// ━━━ HOC 3: withLogger — Add console logging ━━━
function withLogger(WrappedComponent) {
  return function WithLoggerComponent(props) {
    useEffect(() => {
      console.log(`[${WrappedComponent.name}] mounted with props:`, props);
      return () => console.log(`[${WrappedComponent.name}] unmounted`);
    }, []);

    return <WrappedComponent {...props} />;
  };
}

// ━━━ COMPOSING MULTIPLE HOCs ━━━
// const EnhancedDashboard = withLogger(withAuth(Dashboard));

// ━━━ HOC PITFALLS ━━━
/*
1. Don't use inside render (creates new component every render)
   ❌ function App() { const Enhanced = withHOC(Comp); return <Enhanced /> }
   ✅ const Enhanced = withHOC(Comp);  // Outside component!

2. Refs don't pass through (use forwardRef)
3. Static methods don't copy (use hoist-non-react-statics)
4. "Wrapper hell" — too many HOCs make debugging hard

Modern alternative: Custom Hooks can replace most HOCs!
*/

/*
🎯 INTERVIEW:
Q: "What is a Higher Order Component?"
A: A function that takes a component and returns an enhanced component.
   Used for cross-cutting concerns like auth, logging, loading.

Q: "HOC vs Custom Hook?"
A: Both share logic. HOCs wrap components (add wrapper div).
   Custom hooks share logic without adding to component tree.
   Prefer custom hooks in modern React.
*/

export { withLoader, withAuth, withLogger, ProtectedDashboard };
