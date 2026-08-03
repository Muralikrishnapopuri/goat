/**
 * Helper script to generate a sample Excel input file
 * Run: node create_sample_data.js
 */
const XLSX = require("xlsx");

const sampleData = [
  {
    "Company Name": "Google",
    "HR Email": "hr@example-google.com",
    "Job Link": "https://careers.google.com/jobs/results/123456",
  },
  {
    "Company Name": "Microsoft",
    "HR Email": "recruiter@example-microsoft.com",
    "Job Link": "https://careers.microsoft.com/us/en/job/789012",
  },
  {
    "Company Name": "Amazon",
    "HR Email": "talent@example-amazon.com",
    "Job Link": "https://www.amazon.jobs/en/jobs/345678",
  },
  {
    "Company Name": "Flipkart",
    "HR Email": "hiring@example-flipkart.com",
    "Job Link": "https://www.flipkartcareers.com/#!/job-view/full-stack-developer",
  },
  {
    "Company Name": "Razorpay",
    "HR Email": "careers@example-razorpay.com",
    "Job Link": "https://razorpay.com/jobs/full-stack-engineer",
  },
];

const worksheet = XLSX.utils.json_to_sheet(sampleData);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "Jobs");

// Auto-size columns
const colWidths = Object.keys(sampleData[0]).map((key) => ({
  wch: Math.max(key.length, ...sampleData.map((r) => (r[key] || "").length)) + 2,
}));
worksheet["!cols"] = colWidths;

XLSX.writeFile(workbook, "job_applications.xlsx");
console.log("✔ Created job_applications.xlsx with sample data");
