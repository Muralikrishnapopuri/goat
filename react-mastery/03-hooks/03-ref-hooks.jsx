// ============================================================
// 🪝 TASK 3.3: useRef & useImperativeHandle
// ============================================================
import { useRef, forwardRef, useImperativeHandle, useState } from 'react';

// ━━━ useRef — TWO use cases ━━━
// 1. Access DOM elements directly
// 2. Store mutable values that DON'T trigger re-renders

// ━━━ USE CASE 1: DOM Reference ━━━
function FocusInput() {
  const inputRef = useRef(null); // { current: null }

  const handleClick = () => {
    inputRef.current.focus();           // Direct DOM manipulation
    inputRef.current.style.border = '2px solid blue';
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Click button to focus me" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}

// ━━━ USE CASE 2: Mutable value (no re-render) ━━━
function StopWatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null); // Stores interval ID across renders
  const renderCount = useRef(0);    // Count renders without causing them

  renderCount.current += 1; // This doesn't trigger re-render!

  const start = () => {
    intervalRef.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const stop = () => clearInterval(intervalRef.current);
  const reset = () => { stop(); setTime(0); };

  return (
    <div>
      <p>Time: {time}s (Rendered {renderCount.current} times)</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

// ━━━ useRef vs useState ━━━
/*
┌────────────────┬────────────────────┬──────────────────────┐
│                │ useState           │ useRef               │
├────────────────┼────────────────────┼──────────────────────┤
│ Triggers       │ Yes (re-render)    │ No (silent update)   │
│ Persists       │ Yes (across render)│ Yes (across render)  │
│ Use for        │ UI-affecting data  │ DOM refs, timers     │
│ Access         │ value via getter   │ .current property    │
└────────────────┴────────────────────┴──────────────────────┘
*/

// ━━━ forwardRef — Passing ref to child component ━━━
const FancyInput = forwardRef((props, ref) => {
  return <input ref={ref} className="fancy" {...props} />;
});

function ParentForm() {
  const inputRef = useRef(null);
  return (
    <div>
      <FancyInput ref={inputRef} placeholder="Fancy input" />
      <button onClick={() => inputRef.current.focus()}>Focus Child</button>
    </div>
  );
}

// ━━━ useImperativeHandle — Custom ref API ━━━
const CustomInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  // Expose ONLY specific methods to parent (not full DOM access)
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; },
    getValue: () => inputRef.current.value,
    // Parent can't access the full DOM node — more controlled!
  }));

  return <input ref={inputRef} {...props} />;
});

function ParentWithCustomRef() {
  const ref = useRef(null);
  return (
    <div>
      <CustomInput ref={ref} placeholder="Custom ref" />
      <button onClick={() => ref.current.focus()}>Focus</button>
      <button onClick={() => ref.current.clear()}>Clear</button>
      <button onClick={() => alert(ref.current.getValue())}>Get Value</button>
    </div>
  );
}

/*
🎯 INTERVIEW:
Q: "What is useRef?"
A: Returns a mutable ref object { current: value } that persists across
   renders without causing re-renders. Used for DOM access and mutable values.

Q: "What is forwardRef?"
A: HOC that lets parent pass ref to a child's inner DOM element.

Q: "What is useImperativeHandle?"
A: Customizes the ref value exposed to parent via forwardRef.
   Limits what parent can do with the ref (encapsulation).
*/

export { FocusInput, StopWatch, FancyInput, ParentForm, ParentWithCustomRef };
