/**
 * Challenge 03: Polyfills for high-order Array methods.
 * 
 * Tests core javascript prototypes, element iterations, callback triggers, and flat mapping.
 */

/**
 * Array.prototype.map polyfill
 */
Array.prototype.myMap = function (callback, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const O = Object(this);
  const len = O.length >>> 0; // Ensure unsigned 32-bit integer length
  const A = new Array(len);

  for (let k = 0; k < len; k++) {
    if (k in O) {
      A[k] = callback.call(thisArg, O[k], k, O);
    }
  }

  return A;
};

/**
 * Array.prototype.filter polyfill
 */
Array.prototype.myFilter = function (callback, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError("Array.prototype.myFilter called on null or undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const O = Object(this);
  const len = O.length >>> 0;
  const res = [];

  for (let k = 0; k < len; k++) {
    if (k in O) {
      if (callback.call(thisArg, O[k], k, O)) {
        res.push(O[k]);
      }
    }
  }

  return res;
};

/**
 * Array.prototype.reduce polyfill
 */
Array.prototype.myReduce = function (callback, initialValue) {
  if (this === null || this === undefined) {
    throw new TypeError("Array.prototype.myReduce called on null or undefined");
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const O = Object(this);
  const len = O.length >>> 0;
  let k = 0;
  let accumulator;

  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    // Find the first index with a value in sparse arrays
    let kPresent = false;
    while (k < len && !kPresent) {
      kPresent = k in O;
      if (kPresent) {
        accumulator = O[k];
      }
      k++;
    }
    if (!kPresent) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
  }

  for (; k < len; k++) {
    if (k in O) {
      accumulator = callback(accumulator, O[k], k, O);
    }
  }

  return accumulator;
};

/**
 * Array.prototype.flat polyfill
 * Recursively flattens an array up to the specified depth.
 */
Array.prototype.myFlat = function (depth = 1) {
  if (this === null || this === undefined) {
    throw new TypeError("Array.prototype.myFlat called on null or undefined");
  }

  const O = Object(this);
  const depthNum = Number(depth) || 0;

  function flatten(arr, currentDepth) {
    if (currentDepth <= 0) {
      return arr.slice();
    }
    
    return arr.myReduce((acc, item) => {
      if (Array.isArray(item)) {
        acc.push(...flatten(item, currentDepth - 1));
      } else {
        acc.push(item);
      }
      return acc;
    }, []);
  }

  return flatten(O, depthNum);
};

// ==========================================
// TEST SUITE / DEMONSTRATION RUNNER
// ==========================================

console.log("=== Testing Array Methods Polyfills ===");

const arr = [1, 2, 3, 4];

// Test Map
const mapped = arr.myMap((val) => val * 2);
console.log("myMap output (expected [2,4,6,8]):", mapped);

// Test Filter
const filtered = arr.myFilter((val) => val % 2 === 0);
console.log("myFilter output (expected [2,4]):", filtered);

// Test Reduce
const sum = arr.myReduce((acc, val) => acc + val, 0);
console.log("myReduce output (expected 10):", sum);

// Test Flat
const nested = [1, [2, [3, [4]]]];
const flatDepth1 = nested.myFlat(1);
const flatInfinity = nested.myFlat(Infinity);
console.log("myFlat depth 1 (expected [1, 2, [3, [4]]]):", JSON.stringify(flatDepth1));
console.log("myFlat depth Infinity (expected [1, 2, 3, 4]):", JSON.stringify(flatInfinity));
