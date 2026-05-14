/* 
  JS Practice: 50 Questions using Shortcuts & ES6+ 
*/

// 1. Palindrome Checker
const isPalindrome = (str) => {
  return str === str.split('').reverse().join('');
};

// 2. Reverse String
const reverseString = (str) => {
  return str.split('').reverse().join('');
};

// 3. Find Max
const findMax = (arr) => {
  return Math.max(...arr);
};

// 4. Remove Duplicates
const removeDuplicates = (arr) => {
  return [...new Set(arr)];
};

// 5. Anagram Checker
const isAnagram = (s1, s2) => {
  return s1.split('').sort().join('') === s2.split('').sort().join('');
};

// 6. Factorial
const factorial = (n) => {
  return n <= 1 ? 1 : n * factorial(n - 1);
};

// 7. Fibonacci
const fib = (n) => {
  return Array.from({ length: n }).reduce((acc, _, i) => {
    return acc.concat(i < 2 ? i : acc[i - 1] + acc[i - 2]);
  }, []);
};

// 8. Count Vowels
const countVowels = (str) => {
  return (str.match(/[aeiou]/gi) || []).length;
};

// 9. Longest Word
const longestWord = (str) => {
  return str.split(' ').sort((a, b) => b.length - a.length)[0];
};

// 10. Flatten Array
const flatten = (arr) => {
  return arr.flat(Infinity);
};

// 11. Two Sum
const twoSum = (arr, t) => {
  return arr
    .map((v, i) => [arr.indexOf(t - v), i])
    .find((p) => p[0] !== -1 && p[0] !== p[1]) || [];
};

// 12. Missing Number
const missingNum = (arr) => {
  return ((arr.length + 1) * (arr.length + 2)) / 2 - arr.reduce((a, b) => a + b, 0);
};

// 13. Merge Sorted Arrays
const mergeArrays = (a1, a2) => {
  return [...a1, ...a2].sort((a, b) => a - b);
};

// 14. Is Prime
const isPrime = (n) => {
  return n > 1 && Array.from({ length: Math.floor(Math.sqrt(n)) }, (_, i) => i + 2)
    .every((x) => n % x !== 0);
};

// 15. Character Count
const charCount = (str) => {
  return str.split('').reduce((acc, c) => {
    return { ...acc, [c]: (acc[c] || 0) + 1 };
  }, {});
};

// 16. Intersection
const intersect = (a1, a2) => {
  return a1.filter((v) => a2.includes(v));
};

// 17. Reverse Array
const revArr = (arr) => {
  return [...arr].reverse();
};

// 18. Group By
const groupBy = (arr, p) => {
  return arr.reduce((acc, v) => {
    return { ...acc, [v[p]]: [...(acc[v[p]] || []), v] };
  }, {});
};

// 19. Capitalize Words
const capitalize = (str) => {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
};

// 20. Is Empty Object
const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

// 21. Deep Clone
const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// 22. Deep Equal
const deepEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

// 23. Chunk Array
const chunk = (arr, n) => {
  return Array.from(
    { length: Math.ceil(arr.length / n) },
    (_, i) => arr.slice(i * n, i * n + n)
  );
};

// 24. First Non-Repeating Char
const firstNonRep = (str) => {
  return str.split('').find((c) => str.indexOf(c) === str.lastIndexOf(c));
};

// 25. Rotate Array
const rotate = (arr, k) => {
  return [...arr.slice(-k % arr.length), ...arr.slice(0, -k % arr.length)];
};

// 26. Majority Element
const majority = (arr) => {
  return arr.sort()[Math.floor(arr.length / 2)];
};

// 27. Valid Parentheses
const validParentheses = (s) => {
  while (/\(\)|\[\]|\{\}/.test(s)) {
    s = s.replace(/\(\)|\[\]|\{\}/g, '');
  }
  return !s;
};

// 28. Binary Search
const binSearch = (arr, t) => {
  let l = 0, r = arr.length - 1;
  while (l <= r) {
    let m = (l + r) >> 1;
    if (arr[m] === t) return m;
    arr[m] < t ? l = m + 1 : r = m - 1;
  }
  return -1;
};

// 29. Bubble Sort
const bubbleSort = (arr) => {
  return arr.sort((a, b) => a - b);
};

// 30. Camel to Snake
const camelToSnake = (s) => {
  return s.replace(/[A-Z]/g, (l) => `_${l.toLowerCase()}`);
};

// 31. Remove Falsy
const compact = (arr) => {
  return arr.filter(Boolean);
};

// 32. Find Duplicates
const duplicates = (arr) => {
  return arr.filter((v, i) => arr.indexOf(v) !== i);
};

// 33. Max Consecutive Ones
const maxOnes = (arr) => {
  return Math.max(...arr.join('').split('0').map((s) => s.length));
};

// 34. Move Zeroes
const moveZeroes = (arr) => {
  return [...arr.filter((v) => v !== 0), ...arr.filter((v) => v === 0)];
};

// 35. String Rotation
const isRotation = (s1, s2) => {
  return s1.length === s2.length && (s1 + s1).includes(s2);
};

// 36. Sum of Digits
const sumDigits = (n) => {
  return [...String(n)].reduce((a, b) => a + +b, 0);
};

// 37. Decimal to Binary
const decToBin = (n) => {
  return n.toString(2);
};

// 38. GCD
const gcd = (a, b) => {
  return b ? gcd(b, a % b) : a;
};

// 39. LCM
const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

// 40. Second Largest
const secondLargest = (arr) => {
  return [...new Set(arr)].sort((a, b) => b - a)[1];
};

// 41. Power Function
const power = (b, e) => {
  return b ** e;
};

// 42. Replace Spaces
const replaceSpaces = (s) => {
  return s.replaceAll(' ', '%20');
};

// 43. Permutations
const permut = (s) => {
  if (s.length < 2) return [s];
  return s.split('').flatMap((c, i) => {
    return permut(s.slice(0, i) + s.slice(i + 1)).map((p) => c + p);
  });
};

// 44. Memoize
const memoize = (fn) => {
  const c = new Map();
  return (...a) => {
    let k = JSON.stringify(a);
    if (c.has(k)) return c.get(k);
    c.set(k, fn(...a));
    return c.get(k);
  };
};

// 45. Debounce
const debounce = (f, d) => {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => f(...a), d);
  };
};

// 46. Throttle
const throttle = (f, l) => {
  let w = false;
  return (...a) => {
    if (!w) {
      f(...a);
      w = true;
      setTimeout(() => w = false, l);
    }
  };
};

// 47. Bind
const bind = (f, c, ...a) => {
  return (...a2) => f.apply(c, [...a, ...a2]);
};

// 48. Curry
const curry = (f) => {
  const g = (...a) => {
    return a.length >= f.length ? f(...a) : (...a2) => g(...a, ...a2);
  };
  return g;
};

// 49. Count Words
const countWords = (s) => {
  return s.trim().split(/\s+/).length;
};

// 50. Extract Numbers
const extNums = (s) => {
  return (s.match(/\d+/g) || []).map(Number);
};
