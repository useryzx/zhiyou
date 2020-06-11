export default function(t){
    if(!(t instanceof Date)){
        t = new Date(t);
    }

    // let a = new Date(d);
    

    let y = t.getFullYear();
    let m = t.getMonth()+1;
    let d = t.getDate();

    m = m<10?"0"+m:m;
    d = d<10?"0"+d:d;

    // console.log(y+"-"+m+"-"+d);
    return y+"-"+m+"-"+d;

}