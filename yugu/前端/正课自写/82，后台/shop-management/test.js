new Promise(function(resolve,reject){
    setTimeout(() => {
        reject(1);
    }, 1000);
})

.then(res=>{
    console.log(res);
})

.catch(err=>{
    console.log(err);
    console.log(new Number(1));
})