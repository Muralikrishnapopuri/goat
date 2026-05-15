// ============================================================
// 🧱 TASK 2.7: LISTS & KEYS (Reconciliation)
// ============================================================
import { useState } from 'react';

// ━━━ RENDERING LISTS WITH map() ━━━
function FruitList() {
  const fruits = ['Apple', 'Banana', 'Cherry', 'Date'];

  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={fruit}>{fruit}</li> // ✅ Use unique value as key
      ))}
    </ul>
  );
}

// ━━━ WHY KEYS MATTER (Critical for Interview!) ━━━
/*
HOW REACT RECONCILIATION WORKS WITH KEYS:

Without keys (or index keys) — React re-renders ALL items:
Old:  [A, B, C]
New:  [X, A, B, C]  (X added at start)
React: "1st changed, 2nd changed, 3rd changed, 4th is new"
→ Updates 4 DOM nodes ❌ (wasteful)

With unique keys — React knows exactly what changed:
Old:  [A(1), B(2), C(3)]
New:  [X(4), A(1), B(2), C(3)]
React: "1=same, 2=same, 3=same, 4=new → just INSERT X"
→ Updates 1 DOM node ✅ (efficient!)

RULES FOR KEYS:
1. Must be UNIQUE among siblings
2. Must be STABLE (don't change between renders)
3. Use data IDs (database ID, UUID)
4. ❌ NEVER use Math.random() as key
5. ⚠️ Avoid index as key if list can reorder/filter/add/remove
*/

// ━━━ INDEX AS KEY — When it's OK vs Bad ━━━
function IndexKeyDemo() {
  const [items, setItems] = useState(['A', 'B', 'C']);

  // ❌ BAD: Adding to start with index keys causes bugs
  // Input values get mixed up because React matches by position
  const addToStart = () => setItems(prev => ['NEW', ...prev]);

  return (
    <div>
      {items.map((item, index) => (
        // ❌ index key: if list reorders, React reuses wrong DOM
        <div key={index}>
          <span>{item}</span>
          <input type="text" placeholder={`Input for ${item}`} />
        </div>
      ))}
      <button onClick={addToStart}>Add to Start (Watch bug!)</button>
    </div>
  );
}

// ✅ CORRECT: Use stable unique IDs
function StableKeyDemo() {
  const [items, setItems] = useState([
    { id: 1, text: 'A' }, { id: 2, text: 'B' }, { id: 3, text: 'C' }
  ]);

  const addToStart = () => setItems(prev => [
    { id: Date.now(), text: 'NEW' }, ...prev
  ]);

  return (
    <div>
      {items.map(item => (
        <div key={item.id}> {/* ✅ Stable unique key */}
          <span>{item.text}</span>
          <input type="text" placeholder={`Input for ${item.text}`} />
        </div>
      ))}
      <button onClick={addToStart}>Add to Start (No bug!)</button>
    </div>
  );
}

// ━━━ RENDERING NESTED LISTS ━━━
function NestedList() {
  const categories = [
    { id: 1, name: 'Fruits', items: ['Apple', 'Banana'] },
    { id: 2, name: 'Veggies', items: ['Carrot', 'Peas'] },
  ];

  return (
    <div>
      {categories.map(cat => (
        <div key={cat.id}>
          <h3>{cat.name}</h3>
          <ul>
            {cat.items.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/*
🎯 INTERVIEW QUESTIONS:
Q: "Why are keys important in React?"
A: Keys help React identify which items changed, added, or removed.
   They enable efficient reconciliation by matching old/new elements.

Q: "Why is index as key bad?"
A: If list reorders, React matches by position (index), not identity.
   This causes wrong DOM reuse, lost input state, and rendering bugs.

Q: "What happens if you don't provide a key?"
A: React uses index by default and shows a console warning.

Q: "Can keys be the same across different lists?"
A: Yes. Keys only need to be unique among SIBLINGS, not globally.
*/

export { FruitList, IndexKeyDemo, StableKeyDemo, NestedList };
