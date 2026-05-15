// ============================================================
// 🧱 TASK 2.8: FORMS — Controlled vs Uncontrolled
// ============================================================
import { useState, useRef } from 'react';

// ━━━ CONTROLLED COMPONENT (React owns the value ✅) ━━━
function ControlledForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', role: 'developer', agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" type="email" value={formData.email} onChange={handleChange} />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="developer">Developer</option>
        <option value="designer">Designer</option>
      </select>
      <label>
        <input name="agree" type="checkbox" checked={formData.agree}
          onChange={handleChange} /> I agree
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
// React state is the "single source of truth" for input values.
// Every keystroke → onChange → setState → re-render → updated value

// ━━━ UNCONTROLLED COMPONENT (DOM owns the value) ━━━
function UncontrolledForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Read values directly from DOM
    console.log('Name:', nameRef.current.value);
    console.log('Email:', emailRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} defaultValue="Murali" /> {/* defaultValue not value! */}
      <input ref={emailRef} type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}
// The DOM manages the input state. React only reads it on submit.

// ━━━ COMPARISON ━━━
/*
┌──────────────┬─────────────────┬─────────────────┐
│              │ Controlled      │ Uncontrolled    │
├──────────────┼─────────────────┼─────────────────┤
│ Source       │ React state     │ DOM             │
│ Updates      │ onChange+setState│ DOM handles it │
│ Validation   │ Real-time ✅    │ On submit only  │
│ Dynamic      │ Easy ✅         │ Hard            │
│ Performance  │ Re-renders often│ No re-renders ✅│
│ File inputs  │ ❌ Can't control│ ✅ Must use ref │
│ Recommended  │ ✅ Most cases   │ Simple forms    │
└──────────────┴─────────────────┴─────────────────┘
*/

// ━━━ FORM VALIDATION EXAMPLE ━━━
function ValidatedForm() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validate = (value) => {
    const errs = {};
    if (!value) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(value)) errs.email = 'Invalid email';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(email)) console.log('Valid:', email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => {
        setEmail(e.target.value);
        validate(e.target.value);
      }} />
      {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      <button type="submit">Submit</button>
    </form>
  );
}

/*
🎯 INTERVIEW QUESTIONS:
Q: "Controlled vs Uncontrolled?"
A: Controlled = React state drives input value (via value + onChange).
   Uncontrolled = DOM manages value, React reads via ref.

Q: "When to use uncontrolled?"
A: File inputs (can't control), simple forms, integrating non-React code.

Q: "Why use defaultValue instead of value for uncontrolled?"
A: `value` makes it controlled. `defaultValue` sets initial DOM value only.
*/

export { ControlledForm, UncontrolledForm, ValidatedForm };
