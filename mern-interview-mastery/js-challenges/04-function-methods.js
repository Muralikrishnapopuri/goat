/**
 * Challenge 04: Polyfills for bind, call, and apply.
 * 
 * Essential for testing understanding of context binders (`this`), function invoking bounds, and arguments conversions.
 */

/**
 * Function.prototype.call polyfill
 */
Function.prototype.myCall = function (thisArg, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("Must be called on a function");
  }

  // Handle null/undefined contexts by falling back to global/window
  const context = thisArg === null || thisArg === undefined ? globalThis : Object(thisArg);

  // Generate a unique key on context object to prevent collisions
  const uniqueKey = Symbol("fnKey");
  context[uniqueKey] = this;

  // Run function and store response
  const result = context[uniqueKey](...args);

  // Remove symbol key reference
  delete context[uniqueKey];

  return result;
};

/**
 * Function.prototype.apply polyfill
 */
Function.prototype.myApply = function (thisArg, argsArray) {
  if (typeof this !== "function") {
    throw new TypeError("Must be called on a function");
  }
  if (argsArray !== null && argsArray !== undefined && !Array.isArray(argsArray)) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }

  const context = thisArg === null || thisArg === undefined ? globalThis : Object(thisArg);
  const uniqueKey = Symbol("fnKey");
  context[uniqueKey] = this;

  const args = argsArray || [];
  const result = context[uniqueKey](...args);

  delete context[uniqueKey];

  return result;
};

/**
 * Function.prototype.bind polyfill
 */
Function.prototype.myBind = function (thisArg, ...boundArgs) {
  if (typeof this !== "function") {
    throw new TypeError("Must be bound on a function");
  }

  const targetFn = this;

  return function (...args) {
    // Merge initial bound args with new calling args
    return targetFn.apply(thisArg, [...boundArgs, ...args]);
  };
};

// ==========================================
// TEST SUITE / DEMONSTRATION RUNNER
// ==========================================

console.log("=== Testing Function Context Polyfills ===");

const employee = {
  name: "Murali Krishna",
  getDetails(role, location) {
    return `${this.name} works as a ${role} in ${location}`;
  }
};

const guest = { name: "Sophia Bennett" };

// Test Call Polyfill
const detailsCall = employee.getDetails.myCall(guest, "Backend Architect", "Seattle");
console.log("myCall output (expected: Sophia Bennett works as a Backend Architect in Seattle):");
console.log("->", detailsCall);

// Test Apply Polyfill
const detailsApply = employee.getDetails.myApply(guest, ["Security Engineer", "Austin"]);
console.log("myApply output (expected: Sophia Bennett works as a Security Engineer in Austin):");
console.log("->", detailsApply);

// Test Bind Polyfill
const boundDetails = employee.getDetails.myBind(guest, "React Developer");
console.log("myBind output (expected: Sophia Bennett works as a React Developer in Bengaluru):");
console.log("->", boundDetails("Bengaluru"));
