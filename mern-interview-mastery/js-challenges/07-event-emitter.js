/**
 * Challenge 07: Event Emitter implementation.
 * 
 * Frequently asked in interviews to evaluate system design patterns, closures,
 * event listeners callbacks map setups, and cleanup mechanisms.
 */

class EventEmitter {
  constructor() {
    this.events = {}; // Key: eventName, Value: Set of listener functions
  }

  /**
   * Subscribe to event alerts.
   * 
   * @param {string} eventName 
   * @param {Function} listener 
   * @returns {Object} - Object containing unsubscribe helper method.
   */
  on(eventName, listener) {
    if (typeof listener !== "function") {
      throw new TypeError("Listener must be a function");
    }

    if (!this.events[eventName]) {
      this.events[eventName] = new Set();
    }
    this.events[eventName].add(listener);

    // Return unsubscribe utility directly
    return {
      unsubscribe: () => this.off(eventName, listener)
    };
  }

  /**
   * Unsubscribe a specific listener callback from an event.
   * 
   * @param {string} eventName 
   * @param {Function} listener 
   */
  off(eventName, listener) {
    if (!this.events[eventName]) return;
    this.events[eventName].delete(listener);

    if (this.events[eventName].size === 0) {
      delete this.events[eventName];
    }
  }

  /**
   * Emit an event, calling all registered listeners with the provided arguments.
   * 
   * @param {string} eventName 
   * @param {...*} args 
   */
  emit(eventName, ...args) {
    if (!this.events[eventName]) return;

    // Use Array.from to avoid issues if a listener unsubscribes itself during execution
    const listeners = Array.from(this.events[eventName]);
    listeners.forEach((listener) => {
      listener.apply(this, args);
    });
  }

  /**
   * Subscribe to an event, executing the listener at most once before unsubscribing.
   * 
   * @param {string} eventName 
   * @param {Function} listener 
   */
  once(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper);
      listener.apply(this, args);
    };
    return this.on(eventName, wrapper);
  }
}

// ==========================================
// TEST SUITE / DEMONSTRATION RUNNER
// ==========================================

console.log("=== Testing Event Emitter ===");

const emitter = new EventEmitter();

const onUserLogin = (user) => console.log(`[Event Received] User Logged In: ${user}`);
const onUserLoginStats = (user) => console.log(`[Event Received Stats] Updating DB counters for: ${user}`);

// 1. Test basic subscribe and emit
const sub1 = emitter.on("user:login", onUserLogin);
emitter.on("user:login", onUserLoginStats);

console.log("Emitting 'user:login' with Murali...");
emitter.emit("user:login", "Murali");

// 2. Test unsubscribe helper
sub1.unsubscribe();
console.log("Emitting 'user:login' after unsubscribing primary logger (only DB counter should trigger)...");
emitter.emit("user:login", "Murali");

// 3. Test ONCE listener trigger
emitter.once("app:shutdown", (code) => console.log(`[Once Triggered] App shutting down with code: ${code}`));

console.log("Emitting 'app:shutdown' 1st time...");
emitter.emit("app:shutdown", 0);

console.log("Emitting 'app:shutdown' 2nd time (should NOT trigger logger)...");
emitter.emit("app:shutdown", 1);
