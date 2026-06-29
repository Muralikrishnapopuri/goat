function curry(fn){
  return function curried(...args){
    if(args.length >= fn.length) return fn(...args);
    return (...nextargs)=> curried(...args,...nextargs);
  }
}
const add = curry((a,b,c)=> a +b + c);
console.log(add(2)(3)(8));
console.log(add(10,20)(30));
