/* 
  JS Practice: 50 Questions Without Predefined Functions 
  (Relying on raw loops, avoiding array/string built-ins where possible)
*/

// 1. Palindrome Checker
function isPalindrome(s) { let l=0, r=s.length-1; while(l<r) if(s[l++]!==s[r--]) return false; return true; }

// 2. Reverse String
function reverseString(s) { let r=""; for(let i=s.length-1; i>=0; i--) r+=s[i]; return r; }

// 3. Find Max
function findMax(arr) { let m=-Infinity; for(let i=0; i<arr.length; i++) if(arr[i]>m) m=arr[i]; return m; }

// 4. Remove Duplicates
function removeDuplicates(arr) { let r=[]; for(let i=0; i<arr.length; i++){ let f=false; for(let j=0; j<r.length; j++) if(r[j]===arr[i]) f=true; if(!f) r[r.length]=arr[i]; } return r; }

// 5. Anagram Checker
function isAnagram(s1, s2) { if(s1.length!==s2.length) return false; let m={}; for(let i=0; i<s1.length; i++) m[s1[i]]=(m[s1[i]]||0)+1; for(let i=0; i<s2.length; i++) { if(!m[s2[i]]) return false; m[s2[i]]--; } return true; }

// 6. Factorial
function factorial(n) { let r=1; for(let i=2; i<=n; i++) r*=i; return r; }

// 7. Fibonacci
function fib(n) { if(n<=0) return []; if(n===1) return [0]; let r=[0,1]; for(let i=2; i<n; i++) r[i]=r[i-1]+r[i-2]; return r; }

// 8. Count Vowels
function countVowels(s) { let c=0, v={'a':1,'e':1,'i':1,'o':1,'u':1,'A':1,'E':1,'I':1,'O':1,'U':1}; for(let i=0; i<s.length; i++) if(v[s[i]]) c++; return c; }

// 9. Longest Word
function longestWord(s) { let m="", w=""; for(let i=0; i<=s.length; i++) if(i===s.length||s[i]===' ') { if(w.length>m.length) m=w; w=""; } else w+=s[i]; return m; }

// 10. Flatten Array
function flatten(arr, r=[]) { for(let i=0; i<arr.length; i++) Array.isArray(arr[i]) ? flatten(arr[i], r) : r[r.length]=arr[i]; return r; }

// 11. Two Sum
function twoSum(arr, t) { for(let i=0; i<arr.length; i++) for(let j=i+1; j<arr.length; j++) if(arr[i]+arr[j]===t) return [i,j]; return []; }

// 12. Missing Number
function missingNum(arr) { let n=arr.length+1, s=(n*(n+1))/2; for(let i=0; i<arr.length; i++) s-=arr[i]; return s; }

// 13. Merge Sorted Arrays
function mergeArrays(a1, a2) { let r=[], i=0, j=0; while(i<a1.length && j<a2.length) a1[i]<a2[j] ? r[r.length]=a1[i++] : r[r.length]=a2[j++]; while(i<a1.length) r[r.length]=a1[i++]; while(j<a2.length) r[r.length]=a2[j++]; return r; }

// 14. Is Prime
function isPrime(n) { if(n<=1) return false; for(let i=2; i*i<=n; i++) if(n%i===0) return false; return true; }

// 15. Character Count
function charCount(s) { let r={}; for(let i=0; i<s.length; i++) r[s[i]]=(r[s[i]]||0)+1; return r; }

// 16. Intersection
function intersect(a1, a2) { let r=[]; for(let i=0; i<a1.length; i++) for(let j=0; j<a2.length; j++) if(a1[i]===a2[j]) { let fd=false; for(let k=0; k<r.length; k++) if(r[k]===a1[i]) fd=true; if(!fd) r[r.length]=a1[i]; } return r; }

// 17. Reverse Array
function revArr(arr) { let r=[]; for(let i=arr.length-1; i>=0; i--) r[r.length]=arr[i]; return r; }

// 18. Group By
function groupBy(arr, p) { let r={}; for(let i=0; i<arr.length; i++) { let k=arr[i][p]; if(!r[k]) r[k]=[]; r[k][r[k].length]=arr[i]; } return r; }

// 19. Capitalize Words
function capitalize(s) { let r="", nw=true; for(let i=0; i<s.length; i++) { if(s[i]===' ') { r+=' '; nw=true; } else if(nw && s[i]>='a' && s[i]<='z') { r+=String.fromCharCode(s.charCodeAt(i)-32); nw=false; } else { r+=s[i]; nw=false; } } return r; }

// 20. Is Empty Object
function isEmpty(o) { for(let k in o) if(Object.prototype.hasOwnProperty.call(o,k)) return false; return true; }

// 21. Deep Clone
function deepClone(o) { if(o===null || typeof o!=='object') return o; let c=Array.isArray(o)?[]:{}; for(let k in o) if(Object.prototype.hasOwnProperty.call(o,k)) c[k]=deepClone(o[k]); return c; }

// 22. Deep Equal
function deepEqual(o1, o2) { if(o1===o2) return true; if(o1===null||o2===null||typeof o1!=='object'||typeof o2!=='object') return false; let k1=0, k2=0; for(let k in o1) if(Object.prototype.hasOwnProperty.call(o1,k)) k1++; for(let k in o2) if(Object.prototype.hasOwnProperty.call(o2,k)) k2++; if(k1!==k2) return false; for(let k in o1) { if(!Object.prototype.hasOwnProperty.call(o2,k)) return false; if(!deepEqual(o1[k],o2[k])) return false; } return true; }

// 23. Chunk Array
function chunk(arr, sz) { let r=[], c=[]; for(let i=0; i<arr.length; i++){ c[c.length]=arr[i]; if(c.length===sz || i===arr.length-1){ r[r.length]=c; c=[]; } } return r; }

// 24. First Non-Repeating Char
function firstNonRep(s) { let m={}; for(let i=0; i<s.length; i++) m[s[i]]=(m[s[i]]||0)+1; for(let i=0; i<s.length; i++) if(m[s[i]]===1) return s[i]; return null; }

// 25. Rotate Array
function rotate(arr, k) { let n=arr.length, r=[]; k=k%n; for(let i=n-k; i<n; i++) r[r.length]=arr[i]; for(let i=0; i<n-k; i++) r[r.length]=arr[i]; return r; }

// 26. Majority Element
function majority(arr) { let c=null, count=0; for(let i=0; i<arr.length; i++){ if(count===0) { c=arr[i]; count=1; } else if(c===arr[i]) count++; else count--; } return c; }

// 27. Valid Parentheses
function validParentheses(s) { let st=[]; for(let i=0; i<s.length; i++){ let c=s[i]; if(c==='('||c==='['||c==='{') st[st.length]=c; else{ if(!st.length) return false; let l=st[st.length-1]; st.length--; if(c===')'&&l!=='(' || c===']'&&l!=='[' || c==='}'&&l!=='{') return false; } } return st.length===0; }

// 28. Binary Search
function binSearch(arr, t) { let l=0, r=arr.length-1; while(l<=r){ let m=Math.floor((l+r)/2); if(arr[m]===t) return m; else if(arr[m]<t) l=m+1; else r=m-1; } return -1; }

// 29. Bubble Sort
function bubbleSort(arr) { for(let i=0; i<arr.length; i++) for(let j=0; j<arr.length-i-1; j++) if(arr[j]>arr[j+1]){ let t=arr[j]; arr[j]=arr[j+1]; arr[j+1]=t; } return arr; }

// 30. Camel to Snake
function camelToSnake(s) { let r=""; for(let i=0; i<s.length; i++) if(s[i]>='A'&&s[i]<='Z') r+="_"+String.fromCharCode(s.charCodeAt(i)+32); else r+=s[i]; return r; }

// 31. Remove Falsy
function compact(arr) { let r=[]; for(let i=0; i<arr.length; i++) if(arr[i]) r[r.length]=arr[i]; return r; }

// 32. Find Duplicates
function duplicates(arr) { let r=[], m={}; for(let i=0; i<arr.length; i++){ if(m[arr[i]]===1) r[r.length]=arr[i]; m[arr[i]]=(m[arr[i]]||0)+1; } return r; }

// 33. Max Consecutive Ones
function maxOnes(arr) { let m=0, c=0; for(let i=0; i<arr.length; i++){ if(arr[i]===1) { c++; if(c>m) m=c; } else c=0; } return m; }

// 34. Move Zeroes
function moveZeroes(arr) { let r=[], z=0; for(let i=0; i<arr.length; i++){ if(arr[i]!==0) r[r.length]=arr[i]; else z++; } for(let i=0; i<z; i++) r[r.length]=0; return r; }

// 35. String Rotation
function isRotation(s1, s2) { if(s1.length!==s2.length) return false; let t=s1+s1; for(let i=0; i<=t.length-s2.length; i++){ let m=true; for(let j=0; j<s2.length; j++) if(t[i+j]!==s2[j]) m=false; if(m) return true; } return false; }

// 36. Sum of Digits
function sumDigits(n) { let s=0, str=n+""; for(let i=0; i<str.length; i++) s+=str.charCodeAt(i)-48; return s; }

// 37. Decimal to Binary
function decToBin(n) { if(n===0) return "0"; let r=""; while(n>0){ r=(n%2)+r; n=Math.floor(n/2); } return r; }

// 38. GCD
function gcd(a, b) { while(b!==0){ let t=b; b=a%b; a=t; } return a; }

// 39. LCM
function lcm(a, b) { return (a*b)/gcd(a,b); }

// 40. Second Largest
function secondLargest(arr) { let m1=-Infinity, m2=-Infinity; for(let i=0; i<arr.length; i++){ if(arr[i]>m1) { m2=m1; m1=arr[i]; } else if(arr[i]>m2 && arr[i]!==m1) m2=arr[i]; } return m2; }

// 41. Power Function
function power(b, e) { let r=1; for(let i=0; i<e; i++) r*=b; return r; }

// 42. Replace Spaces
function replaceSpaces(s) { let r=""; for(let i=0; i<s.length; i++) if(s[i]===' ') r+="%20"; else r+=s[i]; return r; }

// 43. Permutations
function permut(s) { let r=[]; function p(curr, rem){ if(rem.length===0){ let e=false; for(let i=0;i<r.length;i++) if(r[i]===curr) e=true; if(!e) r[r.length]=curr; return; } for(let i=0; i<rem.length; i++){ let r2=""; for(let j=0; j<rem.length; j++) if(i!==j) r2+=rem[j]; p(curr+rem[i], r2); } } p("", s); return r; }

// 44. Memoize
function memoize(f) { let c={}; return function(){ let k=""; for(let i=0;i<arguments.length;i++) k+=arguments[i]+"_"; if(c[k]!==undefined) return c[k]; let r=f.apply(this, arguments); c[k]=r; return r; }; }

// 45. Debounce
function debounce(f, d) { let t=null; return function(){ let ctx=this, args=arguments; if(t!==null) clearTimeout(t); t=setTimeout(function(){ f.apply(ctx, args); }, d); }; }

// 46. Throttle
function throttle(f, l) { let w=false; return function(){ let ctx=this, args=arguments; if(!w){ f.apply(ctx, args); w=true; setTimeout(function(){ w=false; }, l); } }; }

// 47. Bind
function customBind(f, c) { let ba=[]; for(let i=2; i<arguments.length; i++) ba[ba.length]=arguments[i]; return function(){ let a=[]; for(let i=0; i<ba.length; i++) a[a.length]=ba[i]; for(let i=0; i<arguments.length; i++) a[a.length]=arguments[i]; return f.apply(c, a); }; }

// 48. Curry
function curry(f) { return function c() { if(arguments.length>=f.length) return f.apply(this, arguments); let a=arguments; return function(){ let na=[]; for(let i=0;i<a.length;i++) na[na.length]=a[i]; for(let i=0;i<arguments.length;i++) na[na.length]=arguments[i]; return c.apply(this, na); }; }; }

// 49. Count Words
function countWords(s) { let c=0, inw=false; for(let i=0; i<s.length; i++){ if(s[i]!==' '&&s[i]!=='\t'&&s[i]!=='\n'){ if(!inw){ c++; inw=true; } } else inw=false; } return c; }

// 50. Extract Numbers
function extNums(s) { let r=[], cn=""; for(let i=0; i<s.length; i++){ if(s[i]>='0'&&s[i]<='9') cn+=s[i]; else if(cn!==""){ r[r.length]=Number(cn); cn=""; } } if(cn!=="") r[r.length]=Number(cn); return r; }
