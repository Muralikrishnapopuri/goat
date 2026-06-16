/**
 * Challenge 01: Debounce and Throttle implementations.
 * 
 * Frequently asked in frontend & full-stack interviews to evaluate performance optimization skills,
 * understanding of browser repaint cycles, timeouts, and closures.
 */

/**
 * Debounce
 * Delays the execution of a function until after a certain amount of time has elapsed
 * since the last time it was called. Useful for search autocomplete inputs, resize events, etc.
 * 
 * @param {Function} func - The function to debounce.
 * @param {number} delay - Delay in milliseconds.
 * @param {boolean} [immediate=false] - If true, trigger the function on the leading edge instead of the trailing.
 * @returns {Function} - The debounced function.
 */
function debounce(func, delay, immediate = false) {
  let timeoutId = null;

  return function (...args) {
    const context = this;
    const callNow = immediate && !timeoutId;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, delay);

    if (callNow) {
      func.apply(context, args);
    }
  };
}

/**
 * Throttle
 * Enforces a maximum number of times a function can be called over time.
 * Useful for scroll monitoring, infinity scroll page triggers, canvas animations, etc.
 * 
 * @param {Function} func - The function to throttle.
 * @param {number} limit - Throttle limit in milliseconds.
 * @returns {Function} - The throttled function.
 */
function throttle(func, limit) {
  let lastFunc;
  let lastRan;

  return function (...args) {
    const context = this;

    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// ==========================================
// TEST SUITE / DEMONSTRATION RUNNER
// ==========================================

console.log("=== Testing Debounce & Throttle ===");

const logMessage = (type) => console.log(`[${type}] Executed at: ${new Date().toLocaleTimeString()}`);

const debouncedLog = debounce(() => logMessage("DEBOUNCE"), 500);
const throttledLog = throttle(() => logMessage("THROTTLE"), 500);

// Simulate multiple rapid clicks
console.log("Simulating 5 rapid triggers over 200ms...");
let count = 0;
const interval = setInterval(() => {
  debouncedLog();
  throttledLog();
  count++;
  if (count === 5) {
    clearInterval(interval);
  }
}, 50);

// Expected outcome:
// Throttle will fire immediately on the 1st iteration.
// Debounce will only fire once, 500ms after the last interval call (at ~700ms total).
