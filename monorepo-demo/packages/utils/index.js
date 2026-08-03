// Shared Utility Functions across all apps
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function calculateTotal(price, taxRate = 0.18) {
  return (price + price * taxRate).toFixed(2);
}

module.exports = {
  formatDate,
  calculateTotal
};
