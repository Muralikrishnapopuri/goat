// JavaScript Practice: Advanced Level Examples

// ==========================================
// 1. Async Concurrency Limiter (Task Queue)
// ==========================================
// Limits the maximum number of asynchronous tasks running in parallel.
class AsyncQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.next();
    });
  }

  next() {
    if (this.running >= this.concurrency || this.queue.length === 0) return;

    this.running++;
    const { task, resolve, reject } = this.queue.shift();

    task()
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this.running--;
        this.next();
      });
  }
}

// Demo of Async Queue
console.log("--- 1. Async Concurrency Queue ---");
const queue = new AsyncQueue(2); // Allow maximum 2 concurrent tasks
const delayTask = (id, delay) => () => {
  console.log(`Task ${id} started...`);
  return new Promise((resolve) => setTimeout(() => {
    console.log(`Task ${id} completed.`);
    resolve(id);
  }, delay));
};

// Queue tasks: tasks 1 & 2 start immediately; task 3 waits until one of them finishes.
queue.add(delayTask(1, 400));
queue.add(delayTask(2, 200));
queue.add(delayTask(3, 100));


// ==========================================
// 2. Deep Clone with Circular References
// ==========================================
// Handles Maps, Sets, Dates, Regex, and avoids infinite loops on self-referencing objects.
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);

  // Return cached reference to prevent infinite recursion on circular refs
  if (hash.has(obj)) return hash.get(obj);

  let clone;
  if (obj instanceof Map) {
    clone = new Map();
    hash.set(obj, clone);
    obj.forEach((val, key) => clone.set(deepClone(key, hash), deepClone(val, hash)));
    return clone;
  }

  if (obj instanceof Set) {
    clone = new Set();
    hash.set(obj, clone);
    obj.forEach(val => clone.add(deepClone(val, hash)));
    return clone;
  }

  // Handle standard objects and arrays
  clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, clone);

  const keys = Reflect.ownKeys(obj);
  for (const key of keys) {
    clone[key] = deepClone(obj[key], hash);
  }

  return clone;
}

// Demo of Deep Clone
setTimeout(() => {
  console.log("\n--- 2. Deep Clone ---");
  const original = {
    number: 42,
    date: new Date(),
    set: new Set([1, 2, 3]),
    nested: { a: 1 }
  };
  original.circular = original; // Self reference

  const cloned = deepClone(original);
  console.log("Is clone equal by reference?", original === cloned); // false
  console.log("Is nested object cloned?", original.nested !== cloned.nested); // true
  console.log("Circular reference verified:", cloned.circular.circular === cloned); // true
}, 600);


// ==========================================
// 3. Reactive State Store using JS Proxy
// ==========================================
// Implements reactive state tracking. Automatically detects changes even in nested paths.
function createReactiveStore(initialState, onChange) {
  const validator = {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      // Recursively proxy nested objects/arrays to intercept deep changes
      if (typeof value === 'object' && value !== null) {
        return new Proxy(value, validator);
      }
      return value;
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      if (oldValue !== value) {
        const result = Reflect.set(target, key, value, receiver);
        onChange(key, oldValue, value);
        return result;
      }
      return true;
    }
  };
  return new Proxy(initialState, validator);
}

// Demo of Reactive Store
setTimeout(() => {
  console.log("\n--- 3. Reactive State Store ---");
  const store = createReactiveStore(
    { user: { name: "Alice", details: { age: 25 } }, theme: "dark" },
    (key, oldVal, newVal) => {
      console.log(`State Changed -> Key: "${key}", Old: ${JSON.stringify(oldVal)}, New: ${JSON.stringify(newVal)}`);
    }
  );

  store.theme = "light"; // Logs change
  store.user.details.age = 26; // Logs change (deep detection)
}, 700);


// ==========================================
// 4. Custom Promise Implementation
// ==========================================
// Demonstrates async execution queueing using native Microtasks.
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.handlers = [];

    const resolve = (value) => {
      if (this.state !== 'pending') return;
      if (value instanceof MyPromise) {
        return value.then(resolve, reject);
      }
      this.state = 'fulfilled';
      this.value = value;
      this.handlers.forEach(h => queueMicrotask(h));
    };

    const reject = (error) => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.value = error;
      this.handlers.forEach(h => queueMicrotask(h));
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handle = () => {
        try {
          if (this.state === 'fulfilled') {
            if (typeof onFulfilled === 'function') {
              resolve(onFulfilled(this.value));
            } else {
              resolve(this.value);
            }
          } else if (this.state === 'rejected') {
            if (typeof onRejected === 'function') {
              resolve(onRejected(this.value));
            } else {
              reject(this.value);
            }
          }
        } catch (err) {
          reject(err);
        }
      };

      if (this.state === 'pending') {
        this.handlers.push(handle);
      } else {
        queueMicrotask(handle);
      }
    });
  }
}

// Demo of MyPromise
setTimeout(() => {
  console.log("\n--- 4. Custom Promise (MyPromise) ---");
  const myPromise = new MyPromise((resolve) => {
    setTimeout(() => resolve("Success!"), 100);
  });

  myPromise
    .then((val) => {
      console.log("MyPromise resolved:", val);
      return "Next value";
    })
    .then((val2) => {
      console.log("MyPromise chain resolved:", val2);
    });
}, 900);


// ==========================================
// 5. Infinite Currying
// ==========================================
// A curried function that adds numbers indefinitely until value/string conversion occurs.
function sumInfinite(...args) {
  const currentSum = args.reduce((a, b) => a + b, 0);
  const fn = (...nextArgs) => sumInfinite(currentSum, ...nextArgs);
  
  // Evaluates the sum when object coercion occurs
  fn.valueOf = () => currentSum;
  fn.toString = () => String(currentSum);
  
  return fn;
}

// Demo of Infinite Currying
setTimeout(() => {
  console.log("\n--- 5. Infinite Currying ---");
  const step1 = sumInfinite(1)(2);
  const step2 = step1(3)(4);
  const step3 = step2(5);
  
  console.log("Evaluated step1 (1 + 2):", +step1); // Coerce to number
  console.log("Evaluated step2 (1 + 2 + 3 + 4):", +step2); // Coerce to number
  console.log("Evaluated step3 (1 + 2 + 3 + 4 + 5):", +step3); // Coerce to number
}, 1100);
