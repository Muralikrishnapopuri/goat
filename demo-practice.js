function logic(fn){
    const cache = new Map();
    return function innerlogic(...args){
        const key = JSON.stringify(args);
        if(cache.has(key)) return cache.get(key);

        const result = fn(...args);
         cache.set(key,result);
         return result;
    }
}
const calcualatecashe = logic((n)=>{
    console.log("computing,,")
    return n*n;
})
console.log(calcualatecashe(2));
console.log(calcualatecashe(2));



function logic(fn){
    const cache = new Map();
    return function innerlogic(...args){
        const key = JSON.stringify(args);
        if(cache.has(key)) return cache.get(key);

        const result = fn(...args);
         cache.set(key,result);
         return result;
    }
}
const calcualatecashe = logic((n)=>{
    console.log("computing,,")
    return n*n;
})
console.log(calcualatecashe(2));
console.log(calcualatecashe(2));

function logic(fn){
    const cache = new Map();
    return function innerlogic(...args){
        const key = JSON.stringify(args);
        if(cache.has(key)) return cache.get(key);

        const result = fn(...args);
         cache.set(key,result);
         return result;
    }
}
const calcualatecashe = logic((n)=>{
    console.log("computing,,")
    return n*n;
})
console.log(calcualatecashe(2));
console.log(calcualatecashe(2));
