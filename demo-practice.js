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

const arr = [10, 20];

const result = arr.push(30, 40);

console.log(arr);    
console.log(result);


