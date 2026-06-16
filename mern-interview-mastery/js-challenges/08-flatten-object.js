/**
 * Challenge 08: Object Flatten and Unflatten implementations.
 * 
 * Frequently asked in full-stack interviews to check deep recursion,
 * object traversals, nested keys parsing, and target path assignment logic.
 */

/**
 * Flattens a nested object into a single-level object with dotted keys.
 * 
 * @param {Object} obj - The object to flatten.
 * @param {string} [prefix=''] - Nested key prefix accumulator.
 * @returns {Object} - Flattened object map.
 */
function flattenObject(obj, prefix = '') {
  let result = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date) && !(value instanceof RegExp)) {
        Object.assign(result, flattenObject(value, newKey));
      } else {
        result[newKey] = value;
      }
    }
  }

  return result;
}

/**
 * Unflattens a dotted-key object back into a nested object hierarchy.
 * 
 * @param {Object} obj - Dotted key object map.
 * @returns {Object} - Re-structured nested object.
 */
function unflattenObject(obj) {
  let result = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const parts = key.split('.');
      let current = result;

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (i === parts.length - 1) {
          current[part] = value;
        } else {
          if (!current[part] || typeof current[part] !== 'object') {
            current[part] = {};
          }
          current = current[part];
        }
      }
    }
  }

  return result;
}

// ==========================================
// TEST SUITE / DEMONSTRATION RUNNER
// ==========================================

console.log("=== Testing Object Flatten/Unflatten ===");

const nestedUser = {
  id: 101,
  profile: {
    username: "muralikrishna",
    personal: {
      firstName: "Murali",
      lastName: "Krishna"
    }
  },
  roles: ["admin", "developer"],
  status: "active"
};

console.log("Original Nested Object:\n", JSON.stringify(nestedUser, null, 2));

// Flatten
const flattened = flattenObject(nestedUser);
console.log("\nFlattened Object Output:\n", JSON.stringify(flattened, null, 2));

// Unflatten
const unflattened = unflattenObject(flattened);
console.log("\nRestored Unflattened Object Output:\n", JSON.stringify(unflattened, null, 2));

// Verify parity
console.log("\nParity Checks:");
console.log("profile.personal.firstName correct:", unflattened.profile.personal.firstName === "Murali");
console.log("roles array intact:", JSON.stringify(unflattened.roles) === JSON.stringify(["admin", "developer"]));
