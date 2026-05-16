// ─────────────────────────────────────────────
// Counter.jsx
// CONCEPT: Basic state + setState + event binding
// EXECUTION FLOW:
//   1. constructor()       → state initialized
//   2. render()            → JSX painted to screen
//   3. componentDidMount() → runs once after paint
//   4. [click] → setState → render() again
//   5. componentDidUpdate  → detects state change
// ─────────────────────────────────────────────

import React, { Component } from 'react';

// `class` keyword     → defines a blueprint
// `extends Component` → inherits React's powers (setState, lifecycle, etc.)
class Counter extends Component {

  // constructor: runs ONCE when component is first created ("born")
  // `props` = data passed from parent  (read-only, never mutate)
  constructor(props) {
    super(props); // MANDATORY — gives `this` its Component capabilities

    // `this.state` = the component's own private memory
    // Always an object. Never mutate directly (no this.state.count = 5)
    this.state = {
      count: 0,
      step: props.step || 1, // initializing from props is allowed in constructor
    };

    // .bind(this) → locks the method so `this` always means this component
    // Without bind, `this` inside increment() would be undefined in strict mode
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset     = this.reset.bind(this);
  }

  // ── LIFECYCLE 1 ────────────────────────────
  // componentDidMount: fires AFTER first render, DOM is ready
  // Equivalent hook: useEffect(() => { ... }, [])
  componentDidMount() {
    console.log('[Counter] Mounted. Initial count:', this.state.count);
    document.title = `Count: ${this.state.count}`;
  }

  // ── LIFECYCLE 2 ────────────────────────────
  // componentDidUpdate: fires AFTER every re-render
  // prevState = snapshot of state BEFORE this update
  // prevProps = snapshot of props BEFORE this update
  // Equivalent hook: useEffect(() => { ... }, [count])
  componentDidUpdate(prevProps, prevState) {
    // Guard clause: avoid infinite loop — only run if count actually changed
    if (prevState.count !== this.state.count) {
      console.log(`[Counter] count changed: ${prevState.count} → ${this.state.count}`);
      document.title = `Count: ${this.state.count}`;
    }
  }

  // ── LIFECYCLE 3 ────────────────────────────
  // componentWillUnmount: fires just BEFORE component is removed from DOM
  // Use for cleanup: clear timers, cancel subscriptions, remove event listeners
  // Equivalent hook: useEffect(() => { return () => cleanup() }, [])
  componentWillUnmount() {
    console.log('[Counter] Unmounting — resetting title');
    document.title = 'React App';
  }

  // ── CUSTOM METHODS ─────────────────────────
  // setState(updater, callback)
  //   updater   → function that receives prevState, returns new partial state
  //   callback  → optional, runs AFTER state is applied and render is done
  // Using updater fn (prevState =>) is safer than setState({ count: this.state.count + 1 })
  // because React batches updates — this.state may be stale at call time
  increment() {
    this.setState(
      prevState => ({ count: prevState.count + prevState.step }),
      () => console.log('[Counter] setState callback — new count:', this.state.count)
    );
  }

  decrement() {
    this.setState(prevState => ({ count: prevState.count - prevState.step }));
  }

  reset() {
    // setState with plain object (fine when not depending on previous state)
    this.setState({ count: 0 });
  }

  // ── RENDER ─────────────────────────────────
  // render() is the ONLY required method in a class component
  // Called every time state or props change
  // Must return JSX (or null to render nothing)
  render() {
    // Destructure from this.state for clean JSX
    const { count, step } = this.state;
    // this.props = read-only values passed in by parent
    const { label = 'Counter' } = this.props;

    // Inline style: React uses camelCase (backgroundColor, not background-color)
    const countColor = count > 0 ? 'green' : count < 0 ? 'red' : 'gray';

    return (
      <div style={{ fontFamily: 'sans-serif', padding: 24, border: '1px solid #ddd', borderRadius: 8, maxWidth: 280 }}>
        <h2 style={{ marginBottom: 8 }}>{label}</h2>
        <p style={{ fontSize: 48, fontWeight: 700, color: countColor, margin: '12px 0' }}>
          {count}
        </p>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>step: {step}</p>

        {/* Event handlers: must be `this.methodName` (bound in constructor) */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={this.decrement}>−</button>
          <button onClick={this.reset}>↺</button>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    );
  }
}

// Usage example:
// <Counter label="My Counter" step={2} />

export default Counter;
