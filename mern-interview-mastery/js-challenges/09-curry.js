/**
 * Challenge 09: Function Currying with placeholder support.
 * 
 * Tests parameters accumulations, closures, and arguments mappings.
 */

// Define unique global placeholder symbol
const _ = Symbol("curryPlaceholder");

/**
 * Wraps a function to support dynamic currying and argument placeholders.
 * 
 * @param {Function} fn - Target function.
 * @returns {Function} - Curried function.
 */
function curry(fn) {
  const arity = fn.length;

  return function curried(...args) {
    // Slice off trailing placeholders if present
    const cleanArgs = [...args];
    
    // Check if we have received enough non-placeholder arguments to execute the function
    const receivedArgumentsCount = cleanArgs.filter(arg => arg !== _).length;
    const hasPlaceholdersInBounds = cleanArgs.slice(0, arity).includes(_);

    if (receivedArgumentsCount >= arity && !hasPlaceholdersInBounds) {
      return fn.apply(this, cleanArgs.slice(0, arity));
    }

    // Return a function to capture subsequent arguments
    return function (...nextArgs) {
      // Map subsequent arguments over placeholders first
      const combinedArgs = [];
      let nextArgIdx = 0;

      cleanArgs.forEach((arg) => {
        if (arg === _ && nextArgIdx < nextArgs.length) {
          combinedArgs.push(nextArgs[nextArgIdx++]);
        } else {
          combinedArgs.push(arg);
        }
      });

      // Append any remaining arguments
      while (nextArgIdx < nextArgs.length) {
        combinedArgs.push(nextArgs[nextArgIdx++]);
      }

      return curried.apply(this, combinedArgs);
    };
  };
}

// Attach placeholder identifier to function so callers can access it
curry._ = _;

// ==========================================
// TEST SUITE / DEMONSTRATION RUNNER
// ==========================================

console.log("=== Testing Currying with Placeholders ===");

const addThreeNumbers = (a, b, c) => a + b + c;

const curriedAdd = curry(addThreeNumbers);

// Test standard currying
console.log("Standard Curried Add (1)(2)(3):");
console.log("Result (expected 6):", curriedAdd(1)(2)(3));

// Test placeholder usage
console.log("\nUsing placeholders (curriedAdd(1, _, 3)(2)):");
console.log("Result (expected 6):", curriedAdd(1, curry._, 3)(2));

console.log("\nUsing multiple placeholders (curriedAdd(_, _, 3)(1)(2)):");
console.log("Result (expected 6):", curriedAdd(curry._, curry._, 3)(1)(2));
