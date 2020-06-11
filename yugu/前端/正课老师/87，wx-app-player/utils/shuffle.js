function shuffle(arr){
    let temp = arr.slice();
    let r = [];
    for(let i = 0;i<temp.length;i++){
        let ind = Math.floor(Math.random()*temp.length);
        let e = temp[ind];
        r.push(e);
        temp.splice(ind,1);
    }
    return r;
}

export default shuffle;