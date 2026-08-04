const cron = require('node-cron');

console.log("==================================================");
console.log("⏰ Node-Cron Task Scheduler Demo Started!");
console.log("==================================================");
console.log("Press Ctrl+C to stop the process.\n");

let executionCount = 0;

// Task 1: Runs every 3 seconds (using 6-asterisk format: sec min hr day mth day-of-week)
const frequentTask = cron.schedule('*/3 * * * * *', () => {
  executionCount++;
  const timestamp = new Date().toLocaleTimeString();
  console.log(`⚡ [JOB #1 - Frequent Task] Executed at ${timestamp} (Run count: ${executionCount})`);

  // Stop task after 4 executions for demonstration
  if (executionCount >= 4) {
    console.log("🛑 [JOB #1] Stopping frequent task after 4 runs.");
    frequentTask.stop();
    console.log("\n==================================================");
    console.log("✅ Demo complete! Node-cron successfully executed!");
    console.log("==================================================");
    process.exit(0);
  }
});

// Task 2: Simulated Daily Midnight Clean-up Task (Cron string: '0 0 * * *')
// (Demonstration of standard 5-part cron syntax)
const cleanupTask = cron.schedule('0 0 * * *', () => {
  console.log("🧹 [JOB #2 - Nightly Cleanup] Running daily database cleanup at 00:00 Midnight...");
}, {
  scheduled: true,
  timezone: "Asia/Kolkata"
});
