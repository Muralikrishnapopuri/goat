// ============================================================
// ⚡ TASK 5.1: Virtual DOM & Reconciliation (Interview Gold!)
// ============================================================

// ━━━ WHAT IS THE VIRTUAL DOM? ━━━
/*
The Virtual DOM is a JAVASCRIPT OBJECT representation of the Real DOM.
It's a lightweight copy — a tree of plain JS objects.

Real DOM node:
<div id="app" class="container">
  <h1>Hello</h1>
  <p>World</p>
</div>

Virtual DOM representation:
{
  type: 'div',
  props: {
    id: 'app',
    className: 'container',
    children: [
      { type: 'h1', props: { children: 'Hello' } },
      { type: 'p', props: { children: 'World' } }
    ]
  }
}
*/

// ━━━ HOW RECONCILIATION WORKS ━━━
/*
STEP-BY-STEP PROCESS:

1. STATE CHANGE triggers a re-render
2. React calls the component function again
3. New JSX → New Virtual DOM tree
4. React DIFFS old Virtual DOM vs new Virtual DOM
5. Creates a list of minimum changes needed
6. Applies ONLY those changes to the Real DOM (commit phase)

┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Old Virtual │    │  New Virtual  │    │   Real DOM   │
│     DOM      │◄──►│     DOM      │───►│  (patches)   │
│              │diff│              │    │              │
└──────────────┘    └──────────────┘    └──────────────┘
*/

// ━━━ DIFFING ALGORITHM RULES ━━━
/*
React uses these heuristics (O(n) instead of O(n³)):

RULE 1: Different TYPES → destroy old tree, build new
  Old: <div><Counter /></div>
  New: <span><Counter /></span>
  → Destroys div + Counter, creates span + NEW Counter (state lost!)

RULE 2: Same TYPE, different PROPS → update props only
  Old: <div className="old" />
  New: <div className="new" />
  → Only updates className attribute

RULE 3: Same TYPE component → keep instance, update props
  Old: <Counter count={1} />
  New: <Counter count={2} />
  → Same instance, just receives new props → re-render

RULE 4: Lists use KEYS for identification
  Old: [<li key="a">A</li>, <li key="b">B</li>]
  New: [<li key="c">C</li>, <li key="a">A</li>, <li key="b">B</li>]
  → React knows: insert C at start, A and B are unchanged
  Without keys: React compares by index → updates ALL items
*/

// ━━━ PRACTICAL EXAMPLE OF RECONCILIATION ━━━
/*
Component:
function App() {
  const [show, setShow] = useState(true);
  return (
    <div>
      {show ? <Counter /> : <Timer />}
      <button onClick={() => setShow(!show)}>Toggle</button>
    </div>
  );
}

When show changes from true to false:
1. Old tree has <Counter /> at position 0
2. New tree has <Timer /> at position 0
3. Different TYPE → React UNMOUNTS Counter (state destroyed!)
4. React MOUNTS Timer (fresh state)

IMPORTANT: Position in tree matters!
<div>
  {show && <Counter />}     ← Position 0 changes between Counter/nothing
  <Timer />                  ← Position shifts!
</div>

vs

<div>
  {show ? <Counter /> : null}  ← Position 0 always exists
  <Timer />                     ← Position 1 always exists (stable!)
</div>
*/

// ━━━ WHY NOT DIRECT DOM MANIPULATION? ━━━
/*
Real DOM operations are EXPENSIVE:
- Layout recalculation (reflow)
- Repainting pixels
- Triggering CSS animations

Virtual DOM benefits:
1. Batch multiple changes into one DOM update
2. Minimize DOM operations (only change what's different)
3. Cross-platform (React Native uses same Virtual DOM → native views)
4. Declarative (describe WHAT, not HOW)
*/

/*
🎯 INTERVIEW:
Q: "How does the Virtual DOM work?"
A: React maintains a JS object tree mirroring the DOM. On state change,
   it creates a new tree, diffs with the old one, and applies only the
   minimal changes to the real DOM (reconciliation).

Q: "What is the diffing algorithm complexity?"
A: O(n) using two heuristics: different types = rebuild, same type = update.
   Lists use keys for identification.

Q: "What happens when component type changes at same position?"
A: React unmounts the old component (destroying state) and mounts
   the new one. Component identity is tied to position + type.

Q: "Is Virtual DOM faster than direct DOM?"
A: Not always. It's faster for complex UIs with frequent updates because
   it batches and minimizes DOM operations. For simple updates, direct
   DOM can be faster. The real benefit is the declarative programming model.
*/

console.log("✅ Task 5.1 — Virtual DOM & Reconciliation understood!");
