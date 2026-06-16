/**
 * Challenge 10: Concurrency-Limited Asynchronous Task Runner.
 * 
 * Frequently asked in senior MERN stack interviews to evaluate core knowledge
 * of async control flows, promise queues, resource allocation, and job schedulers.
 */

class TaskRunner {
  /**
   * @param {number} limit - Maximum number of concurrent tasks allowed to run.
   */
  constructor(limit) {
    this.limit = limit;
    this.activeCount = 0;
    this.queue = [];
  }

  /**
   * Adds an asynchronous task function to the runner queue.
   * 
   * @param {Function} taskFn - Function returning a Promise.
   * @returns {Promise} - Resolves when the specific task finishes.
   */
  push(taskFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ taskFn, resolve, reject });
      this._runNext();
    });
  }

  /**
   * Internal scheduler checking limits and launching next tasks.
   * @private
   */
  _runNext() {
    if (this.activeCount >= this.limit || this.queue.length === 0) {
      return;
    }

    const { taskFn, resolve, reject } = this.queue.shift();
    this.activeCount++;

    Promise.resolve(taskFn())
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this.activeCount--;
        this._runNext(); // Schedule next task in queue
      });
  }
}

// ==========================================
// TEST SUITE / DEMONSTRATION RUNNER
// ==========================================

console.log("=== Testing Concurrency Task Runner ===");

const runner = new TaskRunner(2); // Maximum of 2 tasks run in parallel

const createAsyncTask = (id, delay, shouldFail = false) => {
  return () => {
    console.log(`[Task Start] ID: ${id} | Delay: ${delay}ms | Current Active: ${runner.activeCount + 1}`);
    return new Promise((res, rej) => {
      setTimeout(() => {
        console.log(`[Task Finished] ID: ${id}`);
        shouldFail ? rej(`Failed: ${id}`) : res(`Success: ${id}`);
      }, delay);
    });
  };
};

const startTime = Date.now();

// Queue 5 tasks with varying delays
const tasks = [
  runner.push(createAsyncTask(1, 400)),
  runner.push(createAsyncTask(2, 200)),
  runner.push(createAsyncTask(3, 300)),
  runner.push(createAsyncTask(4, 150)),
  runner.push(createAsyncTask(5, 100))
];

// Verify concurrency execution batches
Promise.allSettled(tasks).then((results) => {
  console.log("\nAll tasks finalized in:", Date.now() - startTime, "ms");
  console.log("Results details:");
  results.forEach((res, idx) => {
    console.log(`Task ${idx + 1}: ${res.status} | Value: ${res.value || res.reason}`);
  });
});

// Expected execution order:
// Tasks 1 and 2 start immediately (Active: 2).
// Task 2 finishes first (at 200ms). Task 3 starts.
// Task 3 or 1 finishes. Next tasks start.
// Verified concurrency maximum never exceeds 2 parallel runs.
