function wanFilter(n){
    if(n<10000){
        return n;
    }
    return (n/10000).toFixed(2)+"w";
}
export default wanFilter;