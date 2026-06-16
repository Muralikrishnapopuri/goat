/**
 * Challenge 02: Polyfills for Promise Combinators.
 * 
 * Demonstrates deep understanding of async flows, microtasks, resolve/reject mechanisms, and error propagation.
 */

/**
 * Polyfill for Promise.all
 * Resolves when all promises resolve. Rejects immediately if any promise rejects.
 */
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Arguments must be an array"));
    }

    const results = [];
    let completedCount = 0;

    if (promises.length === 0) {
      return resolve(results);
    }

    promises.forEach((p, idx) => {
      Promise.resolve(p)
        .then((val) => {
          results[idx] = val;
          completedCount++;

          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // Immediate rejection on first failure
    });
  });
}

/**
 * Polyfill for Promise.allSettled
 * Resolves after all promises have either resolved or rejected. Never rejects.
 */
function promiseAllSettled(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Arguments must be an array"));
    }

    const results = [];
    let completedCount = 0;

    if (promises.length === 0) {
      return resolve(results);
    }

    promises.forEach((p, idx) => {
      Promise.resolve(p)
        .then((value) => {
          results[idx] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[idx] = { status: "rejected", reason };
        })
        .finally(() => {
          completedCount++;
          if (completedCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
}

/**
 * Polyfill for Promise.race
 * Resolves or rejects as soon as one of the promises settles.
 */
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Arguments must be an array"));
    }

    promises.forEach((p) => {
      Promise.resolve(p).then(resolve, reject);
    });
  });
}

/**
 * Polyfill for Promise.any
 * Resolves when any of the promises resolve. Rejects with AggregateError if all promises fail.
 */
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Arguments must be an array"));
    }

    const errors = [];
    let rejectedCount = 0;

    if (promises.length === 0) {
      return reject(new AggregateError([], "All promises were rejected"));
    }

    promises.forEach((p, idx) => {
      Promise.resolve(p)
        .then(resolve)
        .catch((err) => {
          errors[idx] = err;
          rejectedCount++;

          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
}

// ==========================================
// TEST SUITE / DEMONSTRATION RUNNER
// ==========================================

console.log("=== Testing Promise Polyfills ===");

const createDelayedPromise = (ms, val, shouldReject = false) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      shouldReject ? rej(`Error: ${val}`) : res(val);
    }, ms);
  });
};

const p1 = createDelayedPromise(100, "First resolved");
const p2 = createDelayedPromise(200, "Second resolved");
const p3 = createDelayedPromise(50, "Fast error", true);

// Test Promise.all polyfill
promiseAll([p1, p2])
  .then(res => console.log("Promise.all Success Output:", res))
  .catch(err => console.error("Promise.all Unexpected Catch:", err));

promiseAll([p1, p3])
  .then(res => console.log("Promise.all Unexpected Resolve:", res))
  .catch(err => console.log("Promise.all Correctly Rejected:", err));

// Test Promise.allSettled polyfill
promiseAllSettled([p1, p3])
  .then(res => console.log("Promise.allSettled Output:", JSON.stringify(res)));

// Test Promise.any polyfill
promiseAny([p3, p1])
  .then(res => console.log("Promise.any Output (should be first success):", res))
  .catch(err => console.error("Promise.any Unexpected Catch:", err));
