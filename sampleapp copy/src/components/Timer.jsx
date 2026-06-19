// ─────────────────────────────────────────────
// Timer.jsx
// CONCEPT: setInterval + lifecycle cleanup + instance variables
// EXECUTION FLOW:
//   1. constructor()       → state + timerId initialized to null
//   2. render()            → first paint (shows 0s)
//   3. componentDidMount() → interval started, timerId saved on `this`
//   4. every 1s → setState → render() updates display
//   5. componentDidUpdate  → logs elapsed time
//   6. componentWillUnmount → clearInterval(timerId) → no memory leak
// ─────────────────────────────────────────────

import React, { Component } from 'react';

class Timer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,   // elapsed seconds — triggers re-render when changed
      running: false,
    };

    // `this.timerId` is stored directly on the instance, NOT in state
    // Why? Because we don't want changing it to trigger a re-render
    // State = UI-affecting data. Instance vars = internal bookkeeping.
    this.timerId = null;

    // Arrow function class fields (alternative to bind in constructor)
    // The arrow captures `this` lexically — no .bind() needed
    this.start  = this.start.bind(this);
    this.pause  = this.pause.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  // ── LIFECYCLE 1 ────────────────────────────
  componentDidMount() {
    console.log('[Timer] Mounted');
    // Auto-start if prop says so
    if (this.props.autoStart) {
      this.start();
    }
  }

  // ── LIFECYCLE 2 ────────────────────────────
  componentDidUpdate(prevProps, prevState) {
    // React to prop changes (parent controls timer)
    if (prevProps.autoStart !== this.props.autoStart) {
      this.props.autoStart ? this.start() : this.pause();
    }

    // Call parent callback when timer hits the target
    if (this.props.onReach && this.state.seconds === this.props.onReach) {
      this.pause();
      this.props.onReach(this.state.seconds); // notify parent
    }
  }

  // ── LIFECYCLE 3 ────────────────────────────
  componentWillUnmount() {
    // CRITICAL: clear the interval or it keeps firing after unmount
    // Firing setState on an unmounted component = memory leak + React warning
    clearInterval(this.timerId);
    console.log('[Timer] Unmounted — interval cleared');
  }

  // ── CUSTOM METHODS ─────────────────────────
  start() {
    if (this.state.running) return; // guard: don't double-start

    // setInterval returns a numeric ID — store it for later cancellation
    this.timerId = setInterval(() => {
      // Arrow fn inside setInterval still has correct `this` (lexical scope)
      this.setState(prevState => ({ seconds: prevState.seconds + 1 }));
    }, 1000);

    this.setState({ running: true });
  }

  pause() {
    clearInterval(this.timerId); // stop the interval
    this.timerId = null;
    this.setState({ running: false });
  }

  resetTimer() {
    clearInterval(this.timerId);
    this.timerId = null;
    // Pass an object AND set running false in one setState call
    // React batches them — only one re-render fires
    this.setState({ seconds: 0, running: false });
  }

  // Helper: format seconds → MM:SS
  formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  // ── RENDER ─────────────────────────────────
  render() {
    const { seconds, running } = this.state;
    const { label = 'Timer' } = this.props;

    return (
      <div style={{ fontFamily: 'monospace', padding: 24, border: '1px solid #ddd', borderRadius: 8, maxWidth: 260 }}>
        <h2 style={{ fontFamily: 'sans-serif', marginBottom: 16 }}>{label}</h2>

        <p style={{ fontSize: 52, fontWeight: 700, letterSpacing: 2, margin: '12px 0', color: running ? '#1a7' : '#555' }}>
          {this.formatTime(seconds)}
        </p>

        {/* Conditional rendering: ternary inside JSX */}
        <p style={{ fontSize: 12, color: running ? 'green' : 'gray', marginBottom: 16 }}>
          {running ? '● running' : '■ paused'}
        </p>

        <div style={{ display: 'flex', gap: 8 }}>
          {/* Short-circuit rendering: && renders right side only if left is truthy */}
          {!running && <button onClick={this.start}>▶ Start</button>}
          {running  && <button onClick={this.pause}>⏸ Pause</button>}
          <button onClick={this.resetTimer}>↺ Reset</button>
        </div>
      </div>
    );
  }
}

// Usage example:
// <Timer label="Workout Timer" autoStart={false} />

export default Timer;
