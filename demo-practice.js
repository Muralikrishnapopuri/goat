// const curry = (fn) => {
//     return function curried(...args) {
//         if (args.length >= fn.length) {
//              return fn(...args);
//         }
//         return (...newargs) => curried(...args, ...newargs);
//     }
// }
// const add = curry((i, j, k) => i + j + k);
// console.log(add(1,12)(44));

// const memorize= (fn)=>{
//     const cache = new Map();
//     return function (...args){
//         const key = JSON.stringify(args);
//         if(cache.has(key)) return cache.get(key);
//         const res = fn(...args);
//         cache.set(key,res);
//         return res;
//     }
// }

// const expcal = memorize((input)=>{
//     console.log("..trigger here");
//     return input*input
// }); 




// console.log(expcal(4));

// const arr = [10, 20];

// const result = arr.push(30, 40);

// console.log(arr);    
// console.log(result);


// let arr = [10,20,30,40,50];

// const length = arr.unshift(-20,-10);

// console.log(arr);
// console.log(length);

// const result = arr.map((x)=>x*2);
// const length = result.push(60);
// const neww = result.unshift(-20,-10);
// const new1 = result.pop();
// const new2 = result.shift();
// const new3 = result.filter((x)=>x>10);

// console.log(result);
// console.log(new3);



// function* test() {
//     yield 10;
//     yield 20;
// }

// const gen = test();

// console.log(gen.next()); // 10

// console.log(gen.next()); // 20


// let arr = [10,20,30,4010];


// const resultIndex = arr.lastIndexOf((x)=>x>20);


// console.log(resultIndex);


// const numbers = ['Apple', 'apple','kindaapple','apple','fruit','promogrante'];

// const valuee = numbers.lastIndexOf("apple", 5);
// console.log(valuee); 



// // let result = arr.slice(-4,-1);



// // console.log(result); // [20, 30]


// const a = [1,2,3,4,5];

// console.log(a.slice(3,4));
// console.log(a.slice(-5));
// console.log(a.slice(-4,-1));
// console.log(a.slice(2));


// console.log(a.splice(-2,1,33));
// console.log(a);

// // console.log(a.splice(2,2,2));

// // console.log(a.splice(4,0,5));



// let name = null;
// console.log(name+1)

// const findPalindrom = (s)=>{

// let start = 0; 
// let end = s.length-1;

// while(start<end){
//     if(s[start++]==s[end--]){
// continue
//     }else{
//         return "NOt a Palindrom...";
//     }


    
// }

// return "its true palindrom,,"
// }

// console.log(findPalindrom("dogod"));

// function revers(s){
//     let result= "";
//     //

//     for(let i =0;i<=s.length-1;i++){
//         result = s[i]+result;
//     }
   
// return result==s?"its a palindrom":"not a palindrom";
// }
// console.log(revers("palap"));


// function findMax(arr){
// let finalBig = 0;

// for(let i= 0; i<arr.length-1;i++){
//     if(arr[i]>finalBig){
//         finalBig=arr[i]
//     }
// }
// return finalBig
// }
// console.log(findMax([2,10,30,1,33,90,4]))

// const removeDup= (arr)=>{
//     let result =[22,55];

//     for(let i=0;i<arr.length;i++){
//        let ifnotdup= true;

//         for(let j=0;j<result.length;j++){
//             if(arr[i]==result[j]){
//                 ifnotdup = false;
//             }
//         }
//         if(ifnotdup){
//             result[result.length] = arr[i];
//         }
//     }
//     return result;
// }

// console.log(removeDup([22,55,22,3,44,22,3,0,3,4]));

// const anagramChecker = (s1,s2)=>{
//     if(s1.length!=s2.length) return "Not a Anagram no length macthed";
// let state = true;
//     for(let i=0;i<s1.length;i++){
//         for(let j=0;j<s2.length;j++){
//             if(s1[i]==sr[j]) return state = false;
//         }
//     }
    
// }

// console.log(anagramChecker("listen","silent"));

// const fib = (n) => {
//     if (n <= 0) return [];
//     if (n === 1) return [0];
//     let result = [0, 1];

//     for (let i = 2; i < n; i++) {
//         result[i] = result[i - 1] + result[i - 2];
//     }
//     return result;
// }
// console.log(fib(10));
// const countVowels = (str)=>{
//     let count = 0;
//     let vowels = ["a","e","i","u","o"];
//     for(let i=0;i<str.length;i++){
//         // if(vowels.includes(str[i])){
//         //     count++
//         // }
//         for(let j=0;j<vowels.length;j++){
//             if(str[i]==vowels[j]){
//                 count++;
//             }
//         }
//     }
//     return count;
// }
// console.log(countVowels("vowels"))


// const flatArray = (arr, r=[])=>{

//     for(let i=0;i<arr.length;i++){
//         if(Array.isArray(arr[i])){
//             flatArray(arr[i],r)
//         }else{
//             r[r.length]=arr[i];
//         }
//     }

//     return r;
 
// }
// console.log(flatArray([10,11,[12,13,[14,15,[16]]],17,[18,19,[20]]]))


// const sumTwo = (arr,macthNumber)=>{
//     let total = [];
//     for(let i=0;i<arr.length;i++){
//         for(let j=i+1;j<arr.length;j++){
//             if(arr[i]+arr[j]===macthNumber) {
                
//                 console.log(`Sum macthed - ${[arr[i],arr[j]]}`);
//                 total.push([arr[i],arr[j]])
//             }
//         }
//     }
//     return total;
// }
// const result = sumTwo([1,2,3,4,5,5,6],10);
//  console.log(flatArray(result));
