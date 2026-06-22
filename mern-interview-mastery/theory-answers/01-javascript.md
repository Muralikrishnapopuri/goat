# SECTION A: JavaScript — Expert Answers

---

## 1. Explain Event Loop

The **Event Loop** is the mechanism that allows JavaScript (single-threaded) to perform non-blocking operations by offloading tasks to the browser/Node.js APIs.

**How it works:**
1. **Call Stack** — Executes synchronous code (LIFO).
2. **Web APIs / Node APIs** — Handle async operations (setTimeout, fetch, DOM events).
3. **Callback Queue (Task Queue)** — Stores callbacks from Web APIs (setTimeout, setInterval).
4. **Microtask Queue** — Stores `.then()`, `catch()`, `finally()`, `queueMicrotask()`, `MutationObserver`.
5. **Event Loop** — Continuously checks: if Call Stack is empty → drain ALL microtasks → pick ONE task from callback queue → repeat.

```
┌─────────────────────────────┐
│         Call Stack           │
│  (Executes sync code)        │
└──────────┬──────────────────┘
           │ empty?
           ▼
┌─────────────────────────────┐
│     Microtask Queue          │  ← Promise.then, queueMicrotask
│  (Drain ALL before moving)   │
└──────────┬──────────────────┘
           │ empty?
           ▼
┌─────────────────────────────┐
│     Callback Queue           │  ← setTimeout, setInterval, I/O
│  (Pick ONE task per tick)    │
└─────────────────────────────┘
```

**Interview answer:**
> "The Event Loop is what enables JavaScript's asynchronous behavior despite being single-threaded. It continuously monitors the call stack — when it's empty, it first drains all microtasks (Promises), then picks one macrotask (setTimeout/IO) from the callback queue. This cycle repeats infinitely."

---

## 2. Single Thread vs Multi Thread

| Aspect | Single Thread | Multi Thread |
|--------|--------------|--------------|
| **Definition** | One thread executes all code sequentially | Multiple threads execute code in parallel |
| **JavaScript** | JS is single-threaded (one call stack) | Java, C++ are multi-threaded |
| **Concurrency** | Achieved via Event Loop (non-blocking) | Achieved via parallel threads |
| **Race Conditions** | Not possible (single thread) | Possible (shared memory) |
| **CPU-bound** | Blocks the thread | Can distribute across cores |
| **Node.js workaround** | Worker Threads, Child Processes, Cluster | Native support |

**Interview answer:**
> "JavaScript is single-threaded — it has one call stack and one memory heap. It achieves concurrency through the Event Loop and async APIs, not parallelism. For CPU-intensive tasks in Node.js, we use Worker Threads or the Cluster module to leverage multiple cores."

---

## 3. Blocking vs Non-Blocking I/O

**Blocking I/O:** The thread WAITS until the operation completes. Nothing else runs.
```js
// Blocking (synchronous)
const data = fs.readFileSync('/file.txt'); // Thread blocked here
console.log(data); // Runs only after read completes
```

**Non-Blocking I/O:** The thread initiates the operation and moves on. A callback handles the result.
```js
// Non-blocking (asynchronous)
fs.readFile('/file.txt', (err, data) => {
  console.log(data); // Runs when read completes
});
console.log('I run immediately!'); // Runs first
```

**Interview answer:**
> "Blocking I/O halts the thread until the operation finishes — bad for servers because one slow DB query blocks all users. Non-blocking I/O initiates the operation and registers a callback, freeing the thread to handle other requests. Node.js uses non-blocking I/O by default via libuv, which is why a single Node process can handle thousands of concurrent connections."

---

## 4. Callback Queue vs Microtask Queue

| Aspect | Microtask Queue | Callback Queue (Task Queue) |
|--------|----------------|---------------------------|
| **Contains** | Promise.then/catch/finally, queueMicrotask, MutationObserver | setTimeout, setInterval, setImmediate, I/O callbacks |
| **Priority** | **Higher** — drained completely first | **Lower** — one task per event loop tick |
| **Execution** | ALL microtasks run before ANY macrotask | One macrotask per tick |

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Output: 1, 4, 3, 2
```

**Why?** After synchronous code (1,4), microtask queue (Promise→3) drains first, then callback queue (setTimeout→2).

---

## 5. Promise vs Async/Await

Both handle async operations. `async/await` is syntactic sugar over Promises.

```js
// Promise chaining
fetchUser(id)
  .then(user => fetchOrders(user.id))
  .then(orders => console.log(orders))
  .catch(err => console.error(err));

// Async/Await (cleaner)
async function getOrders(id) {
  try {
    const user = await fetchUser(id);
    const orders = await fetchOrders(user.id);
    console.log(orders);
  } catch (err) {
    console.error(err);
  }
}
```

| Aspect | Promise | Async/Await |
|--------|---------|-------------|
| **Readability** | Chain-based, can get messy | Linear, synchronous-looking |
| **Error handling** | `.catch()` | `try/catch` |
| **Debugging** | Harder (anonymous callbacks) | Easier (line-by-line) |
| **Parallel execution** | `Promise.all([...])` | `await Promise.all([...])` |

---

## 6. Promise.all vs allSettled vs race vs any

```js
const p1 = Promise.resolve(1);
const p2 = Promise.reject('error');
const p3 = Promise.resolve(3);
```

| Method | Behavior | Result |
|--------|----------|--------|
| `Promise.all([p1,p2,p3])` | **Fails fast** — rejects if ANY rejects | Rejects with `'error'` |
| `Promise.allSettled([p1,p2,p3])` | **Waits for all** — never short-circuits | `[{status:'fulfilled',value:1}, {status:'rejected',reason:'error'}, {status:'fulfilled',value:3}]` |
| `Promise.race([p1,p2,p3])` | **First to settle** (resolve OR reject) | Resolves with `1` |
| `Promise.any([p1,p2,p3])` | **First to resolve** (ignores rejections) | Resolves with `1` |

**When to use:**
- `all` → Parallel API calls where ALL must succeed (dashboard loading)
- `allSettled` → Parallel calls where you want results regardless (batch operations)
- `race` → Timeout pattern: `Promise.race([fetch(url), timeout(5000)])`
- `any` → Fastest mirror/CDN selection

---

## 7. call(), apply(), bind()

All three explicitly set the `this` context.

```js
const person = { name: 'Murali' };

function greet(city, country) {
  console.log(`${this.name} from ${city}, ${country}`);
}

greet.call(person, 'Hyderabad', 'India');    // Immediate, comma-separated args
greet.apply(person, ['Hyderabad', 'India']); // Immediate, array args
const bound = greet.bind(person, 'Hyderabad', 'India'); // Returns new function
bound(); // Invoke later
```

| Method | Invocation | Arguments | Use Case |
|--------|-----------|-----------|----------|
| `call` | Immediate | Comma-separated | Borrow methods, inheritance |
| `apply` | Immediate | Array | `Math.max.apply(null, arr)` |
| `bind` | Returns function | Comma-separated | Event handlers, partial application |

---

## 8. Closures

A **closure** is a function that retains access to its outer (lexical) scope even after the outer function has returned.

```js
function createCounter() {
  let count = 0; // Enclosed variable
  return {
    increment: () => ++count,
    getCount: () => count,
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
// 'count' is not accessible directly, but the returned functions still access it
```

**Real-world uses:** Data privacy, function factories, memoization, event handlers, module pattern.

**Common pitfall (loop + var):**
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3 (closure over same 'i')
}
// Fix: use 'let' (block-scoped) or IIFE
```

---

## 9. Prototypes

Every JavaScript object has a hidden `[[Prototype]]` (accessible via `__proto__` or `Object.getPrototypeOf()`). Functions have a `.prototype` property used when called with `new`.

```js
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return `Hi, I'm ${this.name}`;
};

const p = new Person('Murali');
p.greet(); // "Hi, I'm Murali"
// p.__proto__ === Person.prototype → true
```

**Interview answer:**
> "Prototypes are JavaScript's inheritance mechanism. Every object has a prototype — when you access a property that doesn't exist on the object, JS looks up the prototype chain. This is how methods like `toString()` are available on all objects — they're on `Object.prototype`."

---

## 10. Prototype Chain

The **prototype chain** is the series of linked prototypes JS traverses to find a property.

```
p → Person.prototype → Object.prototype → null
```

```js
p.hasOwnProperty('name');  // true (own property)
p.hasOwnProperty('greet'); // false (on Person.prototype)
p.toString();              // Found on Object.prototype
p.randomProp;              // undefined (reached null, not found)
```

---

## 11. Hoisting

JavaScript **hoists** declarations to the top of their scope during compilation (before execution).

```js
console.log(a); // undefined (var is hoisted with value undefined)
console.log(b); // ReferenceError (let is hoisted but in TDZ)
console.log(c); // ReferenceError (const same as let)

var a = 1;
let b = 2;
const c = 3;

greet(); // Works! Function declarations are fully hoisted
function greet() { console.log('Hello'); }

hello(); // TypeError: hello is not a function
var hello = function() { console.log('Hi'); }; // Only var is hoisted, not the assignment
```

---

## 12. TDZ (Temporal Dead Zone)

The **TDZ** is the period between entering a scope and the variable's declaration being executed. Accessing `let`/`const` variables in TDZ throws `ReferenceError`.

```js
{
  // TDZ for 'x' starts here
  console.log(x); // ReferenceError: Cannot access 'x' before initialization
  let x = 10;     // TDZ ends here
}
```

**Why TDZ exists:** To catch bugs. With `var`, accessing before declaration gives `undefined` silently, which causes hard-to-find bugs.

---

## 13. `this` Keyword

`this` depends on **how** a function is called, not where it's defined.

| Context | `this` value |
|---------|-------------|
| Global (non-strict) | `window` (browser) / `global` (Node) |
| Global (strict) | `undefined` |
| Object method | The object |
| `new` keyword | The new instance |
| Arrow function | Inherits from enclosing lexical scope |
| `call/apply/bind` | Explicitly set |
| Event handler | The element that fired the event |

```js
const obj = {
  name: 'Murali',
  greet() { console.log(this.name); },          // 'Murali' (object method)
  arrow: () => { console.log(this.name); },     // undefined (inherits outer this)
};
```

---

## 14. Arrow Function vs Normal Function

| Feature | Arrow Function | Normal Function |
|---------|---------------|-----------------| 
| `this` | Lexical (inherits from parent) | Dynamic (depends on caller) |
| `arguments` | Not available | Available |
| `new` keyword | Cannot be used as constructor | Can be used |
| `prototype` | No `.prototype` property | Has `.prototype` |
| Syntax | Concise `() => {}` | `function() {}` |
| Methods | Bad for object methods | Good for object methods |

**Rule of thumb:** Use arrow functions for callbacks, use regular functions for object methods and constructors.

---

## 15. Debouncing vs Throttling

Both limit function execution frequency.

**Debouncing:** Executes AFTER the user STOPS performing an action for a specified delay.
```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
// Use: Search input — fire API only after user stops typing for 300ms
```

**Throttling:** Executes AT MOST once every specified interval, regardless of how often triggered.
```js
function throttle(fn, limit) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
// Use: Scroll/resize events — execute handler at most every 200ms
```

---

## 16. Event Delegation

Attach a **single** event listener to a parent element instead of multiple listeners on child elements. Uses **event bubbling**.

```js
// ❌ Bad: Listener on every button
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', handleClick);
});

// ✅ Good: Single listener on parent
document.getElementById('button-container').addEventListener('click', (e) => {
  if (e.target.matches('.btn')) {
    handleClick(e);
  }
});
```

**Benefits:** Better memory usage, works with dynamically added elements, fewer event listeners.

---

## 17. Shallow Copy vs Deep Copy

**Shallow Copy:** Copies only the first level. Nested objects are still references.
```js
const original = { a: 1, nested: { b: 2 } };
const shallow = { ...original };
shallow.nested.b = 99;
console.log(original.nested.b); // 99 — MUTATED! Same reference
```

**Deep Copy:** Copies ALL levels. Completely independent.
```js
const deep = structuredClone(original);     // Modern (best)
const deep2 = JSON.parse(JSON.stringify(original)); // Old way (loses functions, dates, undefined)
```

| Method | Type | Limitations |
|--------|------|-------------|
| `{...obj}`, `Object.assign` | Shallow | Nested refs shared |
| `[...arr]`, `Array.from` | Shallow | Nested refs shared |
| `structuredClone()` | Deep | No functions, DOM nodes |
| `JSON.parse(JSON.stringify())` | Deep | No functions, undefined, Date, RegExp, circular refs |

---

## 18. == vs ===

| Operator | Name | Type Coercion | Example |
|----------|------|--------------|---------|
| `==` | Loose equality | Yes | `'5' == 5` → `true` |
| `===` | Strict equality | No | `'5' === 5` → `false` |

```js
null == undefined   // true
null === undefined  // false
'' == false         // true
'' === false        // false
0 == false          // true
0 === false         // false
NaN == NaN          // false (NaN is never equal to anything)
```

**Rule:** Always use `===` except when intentionally checking `null == undefined`.

---

## 19. Map vs Filter vs Reduce

```js
const nums = [1, 2, 3, 4, 5];

// MAP: Transform each element → returns new array of SAME length
nums.map(n => n * 2);           // [2, 4, 6, 8, 10]

// FILTER: Keep elements passing test → returns new array of EQUAL or LESS length
nums.filter(n => n > 3);        // [4, 5]

// REDUCE: Accumulate into single value → returns ANY shape
nums.reduce((acc, n) => acc + n, 0); // 15

// Chained (real-world): Get total price of in-stock items
products
  .filter(p => p.inStock)
  .map(p => p.price * p.qty)
  .reduce((total, cost) => total + cost, 0);
```

---

## 20. Memory Leaks

Common causes in JavaScript:

1. **Global variables** — Accidentally creating globals (`function foo() { bar = 'leak'; }`)
2. **Forgotten timers** — `setInterval` without `clearInterval`
3. **Detached DOM nodes** — Removing DOM element but keeping a JS reference
4. **Closures** — Holding references to large objects unnecessarily
5. **Event listeners** — Not removing listeners on component unmount

**Detection:** Chrome DevTools → Memory tab → Heap Snapshots, Performance Monitor.

**Prevention:**
```js
// Always clean up
useEffect(() => {
  const interval = setInterval(tick, 1000);
  return () => clearInterval(interval); // Cleanup!
}, []);
```

---

## 21. Garbage Collection

JavaScript uses **automatic garbage collection** via the **Mark-and-Sweep** algorithm.

1. **Mark Phase** — GC starts from roots (global object, call stack) and marks all reachable objects.
2. **Sweep Phase** — Any unmarked (unreachable) objects are freed from memory.

**Key points:**
- Variables go out of scope → eligible for GC
- Circular references ARE handled by modern GC (unlike old reference-counting)
- You can't manually trigger GC (V8 handles it)
- `WeakMap` and `WeakSet` hold weak references — don't prevent GC

---

## 22. Currying

Currying transforms a function with multiple arguments into a sequence of functions, each taking one argument.

```js
// Normal
function add(a, b, c) { return a + b + c; }
add(1, 2, 3); // 6

// Curried
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
curriedAdd(1)(2)(3); // 6

// Generic curry utility
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn(...args);
    return (...nextArgs) => curried(...args, ...nextArgs);
  };
}

const add = curry((a, b, c) => a + b + c);
add(1)(2)(3);    // 6
add(1, 2)(3);    // 6
add(1)(2, 3);    // 6
```

**Use case:** Creating reusable, partially applied functions — `const double = multiply(2)`.

---

## 23. Memoization

Caching the result of expensive function calls and returning the cached result when the same inputs occur again.

```js
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log('Computing...');
  return n * n;
});

expensiveCalc(5); // "Computing..." → 25
expensiveCalc(5); // 25 (from cache, no "Computing...")
```

**React equivalents:** `useMemo` (values), `useCallback` (functions), `React.memo` (components).

---

## 24. Generators

Functions that can be **paused and resumed**. Defined with `function*`, yield values with `yield`.

```js
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }

// Practical: Paginated data fetching
function* fetchPages(url) {
  let page = 1;
  while (true) {
    const data = yield fetch(`${url}?page=${page++}`);
  }
}
```

**Use cases:** Lazy evaluation, infinite sequences, controlling async flow (Redux-Saga uses generators).

---

## 25. Polyfills

A **polyfill** is code that implements a feature on browsers that don't support it natively.

```js
// Polyfill for Array.prototype.map
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function (callback, thisArg) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
      if (i in this) {
        result.push(callback.call(thisArg, this[i], i, this));
      }
    }
    return result;
  };
}

// Polyfill for Promise.all
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    promises.forEach((p, i) => {
      Promise.resolve(p).then(value => {
        results[i] = value;
        if (++completed === promises.length) resolve(results);
      }).catch(reject);
    });
  });
};
```

**Commonly asked polyfills:** `map`, `filter`, `reduce`, `bind`, `Promise.all`, `flat`, `debounce`.

---

## 26. Output-Based Questions

```js
// Q1: Event Loop
console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');
// Output: A, D, C, B

// Q2: Closures + var
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 3, 3, 3 (var is function-scoped, closure over same i)

// Q3: Closures + let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 0, 1, 2 (let is block-scoped, each iteration gets new i)

// Q4: Hoisting
console.log(typeof foo); // "function" (function declaration hoisted)
console.log(typeof bar); // "undefined" (var hoisted, not the function)
function foo() {}
var bar = function() {};

// Q5: this keyword
const obj = {
  a: 1,
  getA: () => this.a,      // arrow inherits outer this (window/undefined)
  getA2() { return this.a; } // regular function, this = obj
};
console.log(obj.getA());   // undefined
console.log(obj.getA2());  // 1

// Q6: Promise chain
Promise.resolve(1)
  .then(x => x + 1)    // 2
  .then(x => { throw new Error('fail'); })
  .then(x => x + 1)    // SKIPPED
  .catch(e => 10)       // 10
  .then(x => x + 1);   // 11
// Final value: 11

// Q7: == coercion
console.log([] == false);    // true ([] → '' → 0, false → 0)
console.log([] == ![]);      // true (![]=false, []==false, both coerce to 0)
console.log({} == !{});      // false ({}→NaN, !{}→false→0)
```
