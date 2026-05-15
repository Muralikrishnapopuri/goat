// ============================================================
// 🧱 TASK 2.6: CONDITIONAL RENDERING
// ============================================================
import { useState } from 'react';

// ━━━ METHOD 1: if/else (Outside JSX) ━━━
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please log in</h1>;
}

// ━━━ METHOD 2: Ternary Operator (Inside JSX ✅ Most Common) ━━━
function Dashboard({ user }) {
  return (
    <div>
      {user ? <p>Hello, {user.name}</p> : <p>Please sign in</p>}
    </div>
  );
}

// ━━━ METHOD 3: && Short-Circuit (Show or Nothing) ━━━
function Notifications({ count }) {
  return (
    <div>
      {count > 0 && <span className="badge">{count} new</span>}
      {/* ⚠️ GOTCHA: {0 && <span>Text</span>} renders "0" not nothing!
          Fix: {count > 0 && ...} instead of {count && ...} */}
    </div>
  );
}

// ━━━ METHOD 4: Switch/Object Map (Multiple conditions) ━━━
function StatusBadge({ status }) {
  const badges = {
    active: <span style={{ color: 'green' }}>● Active</span>,
    inactive: <span style={{ color: 'gray' }}>● Inactive</span>,
    pending: <span style={{ color: 'orange' }}>● Pending</span>,
  };
  return badges[status] || <span>Unknown</span>;
}

// ━━━ METHOD 5: Early Return (Guard Clause) ━━━
function UserProfile({ user, isLoading, error }) {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!user) return null; // Render nothing

  return <div><h1>{user.name}</h1></div>;
}

// ━━━ PRACTICAL EXAMPLE ━━━
function App() {
  const [view, setView] = useState('home');

  const renderView = () => {
    switch (view) {
      case 'home': return <h2>Home Page</h2>;
      case 'about': return <h2>About Page</h2>;
      case 'contact': return <h2>Contact Page</h2>;
      default: return <h2>404 Not Found</h2>;
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => setView('home')}>Home</button>
        <button onClick={() => setView('about')}>About</button>
        <button onClick={() => setView('contact')}>Contact</button>
      </nav>
      {renderView()}
    </div>
  );
}

/*
🎯 INTERVIEW QUESTIONS:
Q: "What are the ways to conditionally render in React?"
A: if/else, ternary (?:), && short-circuit, switch, early return.

Q: "What's the gotcha with && operator?"
A: {0 && <Component />} renders "0" because 0 is falsy but renderable.
   Always use boolean conditions: {count > 0 && ...}

Q: "How to render nothing?"
A: Return null or undefined from a component.
*/

export { Greeting, Dashboard, Notifications, StatusBadge, UserProfile, App };
