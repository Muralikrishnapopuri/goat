// Web App importing and using shared @monorepo/utils package
const { formatDate, calculateTotal } = require('@monorepo/utils');

console.log("==========================================");
console.log("🌐 [WEB APP] Running Front-End Service...");
console.log("==========================================");

const today = formatDate(new Date());
const cartTotal = calculateTotal(100);

console.log(`📅 Today's Date: ${today}`);
console.log(`🛒 Cart Total (with 18% tax): $${cartTotal}`);
console.log("✅ Web App successfully loaded shared utils package!\n");
