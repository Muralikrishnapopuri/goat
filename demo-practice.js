const outer = ()=>{
    let num = 5;
    const inner = ()=>{
        
        console.log(num);
    }
    inner();
}

outer();