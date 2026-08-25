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


let arr = [10, 20, 30, 40,50,60,70,80];

let result = arr.slice(-4,-1);



console.log(result); // [20, 30]


