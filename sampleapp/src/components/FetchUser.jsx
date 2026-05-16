// ─────────────────────────────────────────────
// FetchUser.jsx
// CONCEPT: API fetch in componentDidMount + loading/error states
//          + re-fetching when props change in componentDidUpdate
// EXECUTION FLOW:
//   1. constructor()       → state: { user: null, loading: true, error: null }
//   2. render()            → shows "Loading..." (loading = true)
//   3. componentDidMount() → fetch starts
//   4. fetch resolves      → setState({ user, loading: false })
//   5. render()            → shows user data
//   6. [prop userId changes] → componentDidUpdate detects → re-fetch
// ─────────────────────────────────────────────

import React, { Component } from 'react';

class FetchUser extends Component {

  constructor(props) {
    super(props);

    // Three-state pattern for async data:
    //   loading → true while request is in flight
    //   user    → null until data arrives
    //   error   → null unless request failed
    this.state = {
      user: null,
      loading: true,
      error: null,
    };

    // Store abort controller on instance (not state) to cancel in-flight requests
    // AbortController: browser API to cancel fetch mid-flight
    this.abortController = null;
  }

  // ── LIFECYCLE 1 ────────────────────────────
  // componentDidMount: best place for data fetching
  // Do NOT fetch in constructor — DOM isn't ready, and server-side rendering breaks
  componentDidMount() {
    console.log('[FetchUser] Mounted — starting fetch');
    this.fetchUser(this.props.userId);
  }

  // ── LIFECYCLE 2 ────────────────────────────
  // componentDidUpdate: re-fetch when the userId prop changes
  // IMPORTANT: Always compare prevProps/prevState — otherwise infinite loop!
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      console.log('[FetchUser] userId changed — re-fetching');
      // Cancel previous in-flight request before starting a new one
      if (this.abortController) this.abortController.abort();
      this.setState({ loading: true, error: null, user: null });
      this.fetchUser(this.props.userId);
    }
  }

  // ── LIFECYCLE 3 ────────────────────────────
  componentWillUnmount() {
    // Abort any in-flight fetch to prevent setState on unmounted component
    if (this.abortController) {
      this.abortController.abort();
      console.log('[FetchUser] Unmounting — fetch cancelled');
    }
  }

  // ── CUSTOM METHOD ──────────────────────────
  // Extracted into its own method so componentDidMount & componentDidUpdate can share it
  // `async/await` works fine in class methods
  async fetchUser(userId) {
    // Create fresh abort controller for this request
    this.abortController = new AbortController();

    try {
      // fetch returns a Promise — `await` pauses here until it resolves
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        { signal: this.abortController.signal } // pass signal to make it cancellable
      );

      // response.ok = true if status 200-299
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      // response.json() also returns a Promise
      const user = await response.json();

      // Only update state if component is still mounted
      // (AbortController handles this, but good habit)
      this.setState({ user, loading: false, error: null });

    } catch (err) {
      // AbortError fires when we cancel the request — not a real error
      if (err.name === 'AbortError') return;

      this.setState({ error: err.message, loading: false });
      console.error('[FetchUser] Fetch failed:', err);
    }
  }

  // ── RENDER ─────────────────────────────────
  // render() decides which UI to show based on current state
  render() {
    const { user, loading, error } = this.state;

    // Early returns for loading and error states
    if (loading) {
      return (
        <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
          <p style={{ color: '#888' }}>⏳ Loading user {this.props.userId}...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
          <p style={{ color: 'red' }}>❌ Error: {error}</p>
          {/* Bind inline: () => this.fetchUser() creates new fn each render (ok for buttons) */}
          <button onClick={() => this.fetchUser(this.props.userId)}>Retry</button>
        </div>
      );
    }

    // `user` is guaranteed to be non-null here (loading=false, error=null)
    return (
      <div style={{ padding: 24, border: '1px solid #ddd', borderRadius: 8, fontFamily: 'sans-serif', maxWidth: 300 }}>
        <h2 style={{ marginBottom: 8 }}>{user.name}</h2>
        <p style={{ color: '#555', fontSize: 14 }}>@{user.username}</p>
        <p style={{ fontSize: 13, marginTop: 8 }}>📧 {user.email}</p>
        <p style={{ fontSize: 13 }}>🌐 {user.website}</p>
        <p style={{ fontSize: 13 }}>🏢 {user.company?.name}</p>
      </div>
    );
  }
}

// Usage example:
// <FetchUser userId={1} />
// <FetchUser userId={3} />   ← componentDidUpdate detects change, re-fetches

export default FetchUser;
