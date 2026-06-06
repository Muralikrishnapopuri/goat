// JavaScript Practice: Core Examples & Snippets

// ==========================================
// 1. Reverse a String
// ==========================================

// Method A: Using a classic loop (No built-in functions)
function reverseStringClassic(str) {
  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Method B: Using ES6 split-reverse-join shortcut
const reverseStringShortcut = (str) => str.split("").reverse().join("");

console.log("--- 1. Reverse String ---");
console.log("Classic:", reverseStringClassic("antigravity")); // "ytivargitna"
console.log("Shortcut:", reverseStringShortcut("antigravity")); // "ytivargitna"
console.log();


// ==========================================
// 2. Remove Duplicates from an Array
// ==========================================

// Method A: Using a classic loop
function removeDuplicatesClassic(arr) {
  let uniqueArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!uniqueArr.includes(arr[i])) {
      uniqueArr.push(arr[i]);
    }
  }
  return uniqueArr;
}

// Method B: Using Set (Modern ES6)
const removeDuplicatesShortcut = (arr) => [...new Set(arr)];

console.log("--- 2. Remove Duplicates ---");
const duplicateArray = [1, 2, 2, 3, 4, 4, 4, 5, 1];
console.log("Classic:", removeDuplicatesClassic(duplicateArray)); // [1, 2, 3, 4, 5]
console.log("Shortcut:", removeDuplicatesShortcut(duplicateArray)); // [1, 2, 3, 4, 5]
console.log();


// ==========================================
// 3. Find Max Number in Array
// ==========================================

// Method A: Iterative loop
function findMaxClassic(arr) {
  if (arr.length === 0) return null;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// Method B: Math.max with Spread Operator
const findMaxShortcut = (arr) => Math.max(...arr);

console.log("--- 3. Find Max ---");
const numbers = [12, 5, 8, 130, 44];
console.log("Classic:", findMaxClassic(numbers)); // 130
console.log("Shortcut:", findMaxShortcut(numbers)); // 130
console.log();


// ==========================================
// 4. Palindrome Checker
// ==========================================

// Method A: Two-pointer technique (Optimized, O(N) time, O(1) space)
function isPalindromeClassic(str) {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left].toLowerCase() !== str[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

// Method B: ES6 Shortcut
const isPalindromeShortcut = (str) => {
  const cleanStr = str.toLowerCase();
  return cleanStr === cleanStr.split("").reverse().join("");
};

console.log("--- 4. Palindrome Checker ---");
console.log("Classic (racecar):", isPalindromeClassic("racecar")); // true
console.log("Classic (hello):", isPalindromeClassic("hello")); // false
console.log("Shortcut (radar):", isPalindromeShortcut("radar")); // true
console.log();


// ==========================================
// 5. Debounce Function (Practical Utility)
// ==========================================

// Debouncing ensures a function doesn't run too frequently
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

console.log("--- 5. Debounce ---");
const processChange = debounce(() => {
  console.log("API request triggered! (Only runs after 500ms of inactivity)");
}, 500);

// Simulating multiple rapid calls (only the last one runs after 500ms)
processChange();
processChange();
processChange();
console.log("Called processChange() three times rapidly, waiting for trigger...");
