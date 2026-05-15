// ============================================================
// 🧱 TASK 2.2: COMPONENTS — Function vs Class
// ============================================================
import React, { useState, useEffect, Component } from 'react';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 WHAT IS A COMPONENT?
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/*
A component is a REUSABLE piece of UI.
Think of it as a custom HTML element that you define.

Two types:
1. Functional Components (Modern - USE THIS ✅)
2. Class Components (Legacy - Know for interviews 📝)
*/

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 FUNCTIONAL COMPONENT (Modern Way ✅)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Simplest form — just a function that returns JSX
function Welcome() {
  return <h1>Welcome to React!</h1>;
}

// Arrow function style
const Greeting = () => {
  return <p>Hello from arrow function component</p>;
};

// With props
function UserCard({ name, role, avatar }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}

// With state (hooks)
function CounterFunctional() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
    return () => { /* cleanup */ };
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>+</button>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 CLASS COMPONENT (Legacy — Know for Interviews)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class CounterClass extends Component {
  // 1. Constructor: initialize state
  constructor(props) {
    super(props); // MUST call super(props)
    this.state = { count: 0 };
    // Bind methods (not needed with arrow functions)
    this.increment = this.increment.bind(this);
  }

  // 2. Lifecycle methods
  componentDidMount() {
    // Runs ONCE after first render (like useEffect(fn, []))
    console.log('Component mounted!');
  }

  componentDidUpdate(prevProps, prevState) {
    // Runs after every re-render (like useEffect(fn, [deps]))
    if (prevState.count !== this.state.count) {
      document.title = `Count: ${this.state.count}`;
    }
  }

  componentWillUnmount() {
    // Runs before component is removed (like useEffect cleanup)
    console.log('Component will unmount!');
  }

  // 3. Methods
  increment() {
    this.setState(
      prevState => ({ count: prevState.count + 1 }),
      () => console.log('State updated!') // callback after setState
    );
  }

  // 4. Render method (required)
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 COMPARISON TABLE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/*
┌─────────────────┬──────────────────────┬──────────────────────┐
│ Feature         │ Functional           │ Class                │
├─────────────────┼──────────────────────┼──────────────────────┤
│ Syntax          │ function/arrow       │ class extends        │
│ State           │ useState hook        │ this.state           │
│ Lifecycle       │ useEffect hook       │ lifecycle methods    │
│ "this" keyword  │ Not needed           │ Required everywhere  │
│ Performance     │ Slightly faster      │ Slightly heavier     │
│ Hooks support   │ ✅ Yes              │ ❌ No               │
│ Recommended     │ ✅ Yes (2024+)      │ ❌ Legacy only      │
│ Error Boundary  │ ❌ Not yet          │ ✅ Only way         │
└─────────────────┴──────────────────────┴──────────────────────┘
*/

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📌 COMPONENT COMPOSITION PATTERN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Components inside components — building blocks
function App() {
  const users = [
    { id: 1, name: 'Murali', role: 'Developer', avatar: '/murali.jpg' },
    { id: 2, name: 'Krishna', role: 'Designer', avatar: '/krishna.jpg' },
  ];

  return (
    <div className="app">
      <Header />
      <main>
        {users.map(user => (
          <UserCard key={user.id} {...user} />
        ))}
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return <header><h1>My App</h1></header>;
}

function Footer() {
  return <footer><p>© 2024</p></footer>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎯 INTERVIEW QUESTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/*
Q1: "What is the difference between functional and class components?"
A: Functional = plain JS function returning JSX, uses hooks.
   Class = ES6 class extending Component, uses this.state & lifecycle.
   Functional is preferred since React 16.8 (hooks).

Q2: "Why do we still need class components?"
A: Only for Error Boundaries. There's no hook equivalent for
   componentDidCatch / getDerivedStateFromError yet.

Q3: "Can you use hooks in class components?"
A: No. Hooks only work in functional components.

Q4: "What does super(props) do in constructor?"
A: Calls the parent class (React.Component) constructor and
   passes props to it. Without it, this.props would be undefined.

Q5: "What is component composition?"
A: Building complex UI by combining smaller, reusable components.
   Instead of inheritance, React uses composition (nesting components).
*/

export { Welcome, Greeting, UserCard, CounterFunctional, CounterClass, App };
