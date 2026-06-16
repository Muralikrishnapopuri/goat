/**
 * Challenge 06: Advanced Memoize implementation.
 * 
 * Implements a cache decorator with support for dynamic custom resolvers and TTL (Time-To-Live) cache invalidation.
 */

/**
 * Memoize function wrapper.
 * 
 * @param {Function} func - Original function to wrap.
 * @param {Object} [options] - Options configuration.
 * @param {Function} [options.resolver] - Custom key generator function (receives args, returns cache key string).
 * @param {number} [options.ttl] - Expiry limit in milliseconds. Cache entry invalidates after this duration.
 * @returns {Function} - The memoized function.
 */
function memoize(func, options = {}) {
  const { resolver, ttl } = options;
  const cache = new Map();

  return function (...args) {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    const now = Date.now();

    if (cache.has(key)) {
      const { value, timestamp } = cache.get(key);
      if (!ttl || now - timestamp < ttl) {
        console.log(`[Cache Hit] Key: ${key}`);
        return value;
      }
      // If expired, clear it
      cache.delete(key);
    }

    console.log(`[Cache Miss] Calculating new result for Key: ${key}`);
    const result = func.apply(this, args);
    cache.set(key, { value: result, timestamp: now });
    return result;
  };
}

// ==========================================
// TEST SUITE / DEMONSTRATION RUNNER
// ==========================================

console.log("=== Testing Memoize with TTL ===");

// Heavy computation simulation
const calculateFibonacci = (n) => {
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
};

// Memoize fibonacci with a 1000ms TTL limit
const memoizedFib = memoize(calculateFibonacci, { ttl: 1000 });

console.log("1st Call (Miss expected):");
console.log("Result:", memoizedFib(35));

console.log("2nd Call immediately (Hit expected):");
console.log("Result:", memoizedFib(35));

// Wait 1.2s to test TTL expiration invalidation
console.log("Waiting 1.2 seconds to let cache expire...");
setTimeout(() => {
  console.log("3rd Call after timeout (Miss expected due to TTL expiration):");
  console.log("Result:", memoizedFib(35));
}, 1200);
