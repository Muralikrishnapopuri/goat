// ─────────────────────────────────────────────
// LoginForm.jsx
// CONCEPT: Controlled inputs + form validation + dynamic setState
// EXECUTION FLOW:
//   1. constructor()       → state holds all field values + errors + submitted
//   2. render()            → inputs render with value={this.state.fieldName}
//   3. [typing] onChange   → handleChange → setState → render (controlled input)
//   4. [submit] onSubmit   → validate → setState errors or setState submitted
// ─────────────────────────────────────────────

import React, { Component } from 'react';

class LoginForm extends Component {

  constructor(props) {
    super(props);

    // "Controlled component" pattern:
    // React state is the single source of truth for input values
    // input.value = state  (controlled by React, not the DOM)
    this.state = {
      fields: {
        email: '',
        password: '',
      },
      errors: {},          // validation error messages per field
      submitted: false,    // tracks if form was submitted successfully
      submitting: false,   // tracks async submission in progress
    };

    // Arrow function as class field — no need for .bind() in constructor
    // Supported with Babel (which Vite/CRA both include)
  }

  // ── LIFECYCLE 1 ────────────────────────────
  componentDidMount() {
    // Focus the first input after mount for better UX
    if (this.emailRef) this.emailRef.focus();
  }

  // ── LIFECYCLE 2 ────────────────────────────
  componentDidUpdate(prevProps, prevState) {
    // React to external error prop from parent (e.g. server auth error)
    if (prevProps.serverError !== this.props.serverError && this.props.serverError) {
      this.setState(prevState => ({
        errors: { ...prevState.errors, server: this.props.serverError }
      }));
    }
  }

  // ── CUSTOM METHODS ─────────────────────────

  // Generic handler for ALL inputs — reads name attribute to know which field
  // Arrow function = no .bind() needed, `this` is always the class instance
  handleChange = (e) => {
    const { name, value } = e.target; // destructure event target

    // Computed property key: [name] means use the variable's VALUE as the key
    // e.g. name="email" → { email: value }
    this.setState(prevState => ({
      fields: { ...prevState.fields, [name]: value }, // spread = copy all, override one
      errors: { ...prevState.errors, [name]: '' },    // clear error on type
    }));
  }

  validate() {
    const { fields } = this.state;
    const errors = {};

    // Email validation
    if (!fields.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      errors.email = 'Enter a valid email address';
    }

    // Password validation
    if (!fields.password) {
      errors.password = 'Password is required';
    } else if (fields.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors; // empty object = valid
  }

  handleSubmit = async (e) => {
    e.preventDefault(); // prevent browser default: page reload on submit

    const errors = this.validate();
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      this.setState({ errors }); // show validation errors
      return; // stop here, don't submit
    }

    // Show submitting state
    this.setState({ submitting: true });

    try {
      // Simulate API call (replace with real fetch in production)
      await new Promise(resolve => setTimeout(resolve, 1500));

      this.setState({ submitted: true, submitting: false });

      // Notify parent component via callback prop (if provided)
      if (this.props.onSuccess) {
        this.props.onSuccess(this.state.fields.email);
      }

    } catch (err) {
      this.setState({
        submitting: false,
        errors: { server: 'Login failed. Try again.' }
      });
    }
  }

  // ── RENDER ─────────────────────────────────
  render() {
    const { fields, errors, submitted, submitting } = this.state;

    // Early return: show success screen after submit
    if (submitted) {
      return (
        <div style={{ padding: 24, fontFamily: 'sans-serif', textAlign: 'center' }}>
          <p style={{ fontSize: 32 }}>✅</p>
          <h3>Welcome, {fields.email}!</h3>
          <button onClick={() => this.setState({ submitted: false, fields: { email: '', password: '' } })}>
            Log out
          </button>
        </div>
      );
    }

    return (
      <div style={{ padding: 24, border: '1px solid #ddd', borderRadius: 8, fontFamily: 'sans-serif', maxWidth: 320 }}>
        <h2 style={{ marginBottom: 20 }}>Login</h2>

        {/* onSubmit on the form — fires on button click OR Enter key */}
        <form onSubmit={this.handleSubmit} noValidate>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>Email</label>
            <input
              type="email"
              name="email"                        // name attr matches state.fields key
              value={fields.email}                // controlled: value comes from state
              onChange={this.handleChange}        // state updates on every keystroke
              ref={ref => this.emailRef = ref}    // callback ref: store DOM node on `this`
              style={{ width: '100%', padding: '8px 10px', borderRadius: 4, border: `1px solid ${errors.email ? 'red' : '#ccc'}` }}
            />
            {/* Short-circuit: only renders if errors.email is truthy */}
            {errors.email && <p style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>Password</label>
            <input
              type="password"
              name="password"
              value={fields.password}
              onChange={this.handleChange}
              style={{ width: '100%', padding: '8px 10px', borderRadius: 4, border: `1px solid ${errors.password ? 'red' : '#ccc'}` }}
            />
            {errors.password && <p style={{ color: 'red', fontSize: 12, marginTop: 4 }}>{errors.password}</p>}
          </div>

          {errors.server && (
            <p style={{ color: 'red', fontSize: 13, marginBottom: 12 }}>⚠️ {errors.server}</p>
          )}

          <button
            type="submit"
            disabled={submitting}  // `disabled` attr: prevents click while submitting
            style={{ width: '100%', padding: '10px', borderRadius: 4, background: submitting ? '#aaa' : '#333', color: '#fff', border: 'none', cursor: submitting ? 'not-allowed' : 'pointer' }}
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>

        </form>
      </div>
    );
  }
}

// Usage example:
// <LoginForm onSuccess={(email) => console.log('Logged in as', email)} />

export default LoginForm;
