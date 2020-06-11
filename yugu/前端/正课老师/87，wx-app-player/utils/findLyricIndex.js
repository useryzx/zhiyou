function findLyricIndex(t,arr){
    let p1 = 0;
    let p2 = arr.length-1;

    while (p2-p1>1) {
        let mid = Math.floor((p1+p2)/2);
        let midTime = arr[mid].time;
        if(t<midTime){
            p2 = mid - 1;
        }else{
            p1 = mid;
        }
    }

    // return p2;

    if(p1==p2){
        return p1;
    }else{
        // console.log(t);
        // console.log(arr[p1].time);
        if(t>arr[p2].time){
            
            return p2;
        }else{
            
            return p1;
        }
    }
}



export default findLyricIndex;