/**
 * Challenge 05: Deep Clone implementation.
 * 
 * Frequently asked to evaluate understanding of recursive depth traversals, types checking,
 * circular references resolution, memory mapping, and complex Object hierarchies (Set, Map, Date, RegExp).
 */

/**
 * Recursively deep clones a given value.
 * 
 * @param {*} val - Value to clone.
 * @param {WeakMap} [hash=new WeakMap()] - Map storing circular reference records.
 * @returns {*} - The deeply cloned copy.
 */
function deepClone(val, hash = new WeakMap()) {
  // 1. Handle primitives, functions, null, undefined
  if (val === null || typeof val !== "object") {
    return val;
  }

  // KEY PLACEMENT: WeakMap circular references handler (Reference: topics-points.txt)
  if (hash.has(val)) {
    return hash.get(val);
  }

  // 3. Handle Special Objects: Date
  if (val instanceof Date) {
    return new Date(val.getTime());
  }

  // 4. Handle Special Objects: RegExp
  if (val instanceof RegExp) {
    return new RegExp(val.source, val.flags);
  }

  // 5. Handle Special Objects: Map
  if (val instanceof Map) {
    const mapCopy = new Map();
    hash.set(val, mapCopy);
    val.forEach((itemVal, itemKey) => {
      mapCopy.set(deepClone(itemKey, hash), deepClone(itemVal, hash));
    });
    return mapCopy;
  }

  // 6. Handle Special Objects: Set
  if (val instanceof Set) {
    const setCopy = new Set();
    hash.set(val, setCopy);
    val.forEach((itemVal) => {
      setCopy.add(deepClone(itemVal, hash));
    });
    return setCopy;
  }

  // 7. Handle Arrays and Plain Objects
  const clone = Array.isArray(val) ? [] : Object.create(Object.getPrototypeOf(val));
  hash.set(val, clone);

  // Reflect keys (including Symbols)
  Reflect.ownKeys(val).forEach((key) => {
    clone[key] = deepClone(val[key], hash);
  });

  return clone;
}

// ==========================================
// TEST SUITE / DEMONSTRATION RUNNER
// ==========================================

console.log("=== Testing Deep Clone ===");

// Create target complex object structure
const source = {
  number: 145,
  date: new Date("2026-06-16"),
  regex: /test-regex/gi,
  set: new Set([10, 20, { a: "innerSetObj" }]),
  map: new Map([["key1", { b: "innerMapValue" }]]),
  array: [1, 2, { c: 3 }],
  nested: {
    d: 4
  }
};

// Inject circular reference
source.circular = source;

const copy = deepClone(source);

// Verify results
console.log("Circular structure check (copy.circular === copy):", copy.circular === copy);
console.log("Is Date correctly duplicated (copy.date !== source.date):", copy.date !== source.date);
console.log("Is Date content preserved (copy.date.toISOString() === source.date.toISOString()):", copy.date.toISOString() === source.date.toISOString());
console.log("Is nested object cloned (copy.nested !== source.nested):", copy.nested !== source.nested);
console.log("Is inner Set object cloned:", [...copy.set][2] !== [...source.set][2]);
console.log("Is inner Map object cloned:", copy.map.get("key1") !== source.map.get("key1"));
