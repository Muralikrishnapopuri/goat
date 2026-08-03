// API App importing and using shared @monorepo/utils package
const { formatDate, calculateTotal } = require('@monorepo/utils');

console.log("==========================================");
console.log("⚡ [API APP] Running Back-End Service...");
console.log("==========================================");

const invoiceDate = formatDate(new Date());
const invoiceAmount = calculateTotal(250);

console.log(`🧾 Invoice Generated Date: ${invoiceDate}`);
console.log(`💰 Payable Amount (with 18% tax): $${invoiceAmount}`);
console.log("✅ API Service successfully loaded shared utils package!\n");
