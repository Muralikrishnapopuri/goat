// ============================================================
// ⚡ TASK 5.3: Component Lifecycle (Class ↔ Hooks Mapping)
// ============================================================
import React, { Component, useState, useEffect, useRef } from 'react';

// ━━━ COMPLETE LIFECYCLE DIAGRAM ━━━
/*
┌─────────────── MOUNTING ────────────────┐
│ constructor()                           │
│ static getDerivedStateFromProps()        │
│ render()                                │
│ componentDidMount() ←→ useEffect(fn,[]) │
├─────────────── UPDATING ────────────────┤
│ static getDerivedStateFromProps()        │
│ shouldComponentUpdate() ←→ React.memo   │
│ render()                                │
│ getSnapshotBeforeUpdate()               │
│ componentDidUpdate() ←→ useEffect(fn,[deps])│
├─────────────── UNMOUNTING ──────────────┤
│ componentWillUnmount() ←→ useEffect cleanup│
├─────────────── ERROR ───────────────────┤
│ componentDidCatch()                     │
│ static getDerivedStateFromError()       │
└─────────────────────────────────────────┘
*/

// ━━━ CLASS LIFECYCLE EXAMPLE ━━━
class LifecycleDemo extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('1. CONSTRUCTOR');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('2. getDerivedStateFromProps');
    return null; // Return object to update state, or null
  }

  componentDidMount() {
    console.log('4. componentDidMount (after first render)');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('5. shouldComponentUpdate');
    return true; // Return false to skip re-render
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('7. getSnapshotBeforeUpdate (before DOM update)');
    return { scrollPosition: document.body.scrollTop };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('8. componentDidUpdate', snapshot);
  }

  componentWillUnmount() {
    console.log('9. componentWillUnmount');
  }

  componentDidCatch(error, info) {
    console.log('ERROR:', error, info);
  }

  render() {
    console.log('3/6. render()');
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          +
        </button>
      </div>
    );
  }
}

// ━━━ HOOKS EQUIVALENT ━━━
function LifecycleHooksDemo() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();
  const isFirstRender = useRef(true);

  // componentDidMount
  useEffect(() => {
    console.log('Mounted!');
    return () => console.log('Will unmount!'); // componentWillUnmount
  }, []);

  // componentDidUpdate (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    console.log('Updated! Prev count:', prevCountRef.current);
    prevCountRef.current = count;
  }, [count]);

  console.log('Render');
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}

// ━━━ MAPPING TABLE ━━━
/*
┌──────────────────────────┬──────────────────────────────┐
│ Class Lifecycle          │ Hooks Equivalent             │
├──────────────────────────┼──────────────────────────────┤
│ constructor              │ useState(initialValue)       │
│ componentDidMount        │ useEffect(fn, [])            │
│ componentDidUpdate       │ useEffect(fn, [deps])        │
│ componentWillUnmount     │ useEffect return cleanup     │
│ shouldComponentUpdate    │ React.memo(Component)        │
│ getDerivedStateFromProps │ Update state during render   │
│ componentDidCatch        │ ❌ No hook (class only)     │
│ forceUpdate              │ useReducer dispatch          │
└──────────────────────────┴──────────────────────────────┘

🎯 INTERVIEW:
Q: "Explain the React component lifecycle."
A: Three phases: Mount (constructor→render→didMount),
   Update (render→didUpdate), Unmount (willUnmount).
   In hooks: useEffect with [] = mount, [deps] = update, cleanup = unmount.

Q: "What lifecycle method has no hook equivalent?"
A: componentDidCatch / getDerivedStateFromError (Error Boundaries).
   This is why class components are still needed for error boundaries.
*/

export { LifecycleDemo, LifecycleHooksDemo };
