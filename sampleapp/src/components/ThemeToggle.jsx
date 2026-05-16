// ─────────────────────────────────────────────
// ThemeToggle.jsx
// CONCEPT: shouldComponentUpdate + getDerivedStateFromProps (static method)
//          + error boundary pattern (getDerivedStateFromError / componentDidCatch)
// EXECUTION FLOW:
//   ThemeToggle:
//     1. constructor()              → state.theme from props or localStorage
//     2. render()                   → passes theme down via props
//     3. [toggle click]             → setState theme → shouldComponentUpdate checks
//     4. shouldComponentUpdate      → returns true/false → controls re-render
//
//   ErrorBoundary:
//     1. render()                   → renders children normally
//     2. [child throws]             → getDerivedStateFromError → state.hasError = true
//     3. componentDidCatch          → logs error details
//     4. render()                   → shows fallback UI
// ─────────────────────────────────────────────

import React, { Component } from 'react';

// ─────────────────────────────────────────
// ErrorBoundary — catches errors in child tree
// Can ONLY be implemented as a class component (no hook equivalent yet)
// ─────────────────────────────────────────
class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  // STATIC method: called during render when a child throws
  // Returns new state to trigger fallback render
  // `static` = belongs to the CLASS, not the instance — no `this` access
  static getDerivedStateFromError(error) {
    // This runs during the render phase — keep it pure (no side effects)
    return { hasError: true, errorMessage: error.message };
  }

  // Called AFTER the error — safe place for side effects (logging, reporting)
  // `errorInfo.componentStack` shows which component tree threw
  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught error:', error);
    console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack);
    // In production: send to error reporting service
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI — custom via `fallback` prop or default
      return this.props.fallback || (
        <div style={{ padding: 16, border: '2px solid red', borderRadius: 8, fontFamily: 'sans-serif' }}>
          <h3 style={{ color: 'red' }}>⚠️ Something went wrong</h3>
          <p style={{ fontSize: 13, color: '#555' }}>{this.state.errorMessage}</p>
          <button onClick={() => this.setState({ hasError: false })}>Try again</button>
        </div>
      );
    }
    // When no error: render children as-is (transparent wrapper)
    return this.props.children;
  }
}


// ─────────────────────────────────────────
// ThemedBox — child component
// Receives theme as a prop (prop drilling)
// Shows getDerivedStateFromProps usage
// ─────────────────────────────────────────
class ThemedBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // Internal state initialized independently of props
      clicks: 0,
      derivedLabel: '',
    };
  }

  // STATIC method: called before every render (mount + updates)
  // Used to sync state with props — return new state object or null
  // Replaces the old (deprecated) componentWillReceiveProps
  // CAUTION: anti-pattern in most cases — prefer controlled components
  static getDerivedStateFromProps(props, state) {
    // Derive a label from the current theme prop
    const labelMap = { light: '☀️ Light mode', dark: '🌙 Dark mode', system: '💻 System' };
    const newLabel = labelMap[props.theme] || props.theme;

    // Return null if no state update needed (avoid unnecessary renders)
    if (newLabel === state.derivedLabel) return null;

    return { derivedLabel: newLabel }; // returning object merges into state
  }

  // ── OPTIMIZATION ───────────────────────────
  // shouldComponentUpdate: return false to SKIP re-render
  // Called before every render (except forceUpdate)
  // Equivalent to: React.PureComponent (which does shallow comparison automatically)
  // Only use when you've profiled and confirmed performance issue
  shouldComponentUpdate(nextProps, nextState) {
    // Skip re-render if theme and clicks haven't changed
    const themeChanged  = nextProps.theme !== this.props.theme;
    const clicksChanged = nextState.clicks !== this.state.clicks;
    const willUpdate = themeChanged || clicksChanged;
    console.log(`[ThemedBox] shouldComponentUpdate → ${willUpdate}`);
    return willUpdate; // true = re-render, false = skip
  }

  render() {
    const { theme } = this.props;
    const { clicks, derivedLabel } = this.state;

    const themes = {
      light:  { bg: '#fff',   text: '#222', border: '#ddd' },
      dark:   { bg: '#1a1a2e', text: '#eee', border: '#444' },
      system: { bg: '#f5f0ff', text: '#333', border: '#c5b8e8' },
    };
    const t = themes[theme] || themes.light;

    return (
      <div style={{ padding: 16, background: t.bg, color: t.text, border: `1px solid ${t.border}`, borderRadius: 6, marginTop: 12 }}>
        <p style={{ fontSize: 13, marginBottom: 8 }}>{derivedLabel}</p>
        <p style={{ fontSize: 12, color: t.text, opacity: 0.6, marginBottom: 8 }}>Clicked {clicks} times</p>
        <button
          onClick={() => this.setState(prev => ({ clicks: prev.clicks + 1 }))}
          style={{ padding: '6px 14px', borderRadius: 4, background: 'transparent', border: `1px solid ${t.border}`, color: t.text, cursor: 'pointer' }}
        >
          Click me
        </button>
      </div>
    );
  }
}


// ─────────────────────────────────────────
// ThemeToggle — root component
// Manages theme state + passes it down
// ─────────────────────────────────────────
class ThemeToggle extends Component {

  constructor(props) {
    super(props);

    // Read initial theme from localStorage (persisted across refreshes)
    // Graceful fallback: if localStorage throws (SSR, privacy mode), default to 'light'
    let savedTheme = 'light';
    try {
      savedTheme = localStorage.getItem('theme') || 'light';
    } catch (_) {}

    this.state = {
      theme: savedTheme,
      showBrokenChild: false, // toggle to demo ErrorBoundary
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Persist theme to localStorage on change
    if (prevState.theme !== this.state.theme) {
      try {
        localStorage.setItem('theme', this.state.theme);
      } catch (_) {}
    }
  }

  setTheme = (theme) => {
    this.setState({ theme });
  }

  render() {
    const { theme, showBrokenChild } = this.state;
    const themes = ['light', 'dark', 'system'];

    return (
      <div style={{ fontFamily: 'sans-serif', padding: 24, border: '1px solid #ddd', borderRadius: 8, maxWidth: 360 }}>
        <h2 style={{ marginBottom: 16 }}>Theme Switcher</h2>

        {/* Theme selector buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          {themes.map(t => (
            <button
              key={t}
              onClick={() => this.setTheme(t)}
              style={{
                padding: '6px 14px', borderRadius: 4, cursor: 'pointer',
                background: theme === t ? '#333' : 'transparent',
                color: theme === t ? '#fff' : '#555',
                border: '1px solid #ccc', textTransform: 'capitalize',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Pass theme DOWN as prop — "prop drilling" */}
        <ThemedBox theme={theme} />

        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #eee' }} />

        {/* ErrorBoundary demo */}
        <p style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>Error Boundary demo:</p>
        <button
          onClick={() => this.setState(prev => ({ showBrokenChild: !prev.showBrokenChild }))}
          style={{ fontSize: 12, padding: '5px 10px', marginBottom: 8 }}
        >
          {showBrokenChild ? 'Hide' : 'Mount'} broken component
        </button>

        {showBrokenChild && (
          <ErrorBoundary fallback={<p style={{ color: 'red', fontSize: 13 }}>💥 ErrorBoundary caught it!</p>}>
            {/* BrokenComponent would throw during render */}
            <BrokenComponent />
          </ErrorBoundary>
        )}
      </div>
    );
  }
}


// Intentionally broken component to demo ErrorBoundary
class BrokenComponent extends Component {
  render() {
    // Throwing inside render — ErrorBoundary will catch this
    throw new Error('Intentional crash for ErrorBoundary demo!');
  }
}


export { ErrorBoundary, ThemedBox };
export default ThemeToggle;
