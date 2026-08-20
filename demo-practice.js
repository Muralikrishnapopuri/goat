const removeDup = (arr) => {

    let r = [];
    for (let i = 0; i < arr.length; i++) {
        let f = false;

        for (let j = 0; j < r.length; j++) {

            if (r[j] == arr[i]) {
                f = true;
                break;
            }
        }
        if (!f) {
            r[r.length] = arr[i];
        }
    }
    for(let k=0;k<r.length;k++){
        if(r[k]>r[k+1]){
            let temp = r[k];
            r[k]=r[k+1];
            r[k+1]=temp;
        }
    }
    return r;

};
console.log(removeDup([10, 20,44, 10, 30, 40, 30,55,50]));
