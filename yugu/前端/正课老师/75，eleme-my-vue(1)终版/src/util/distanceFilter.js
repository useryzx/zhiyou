export default function(d){
    if(d<1000){
        return d+"m";
    }
    
    return (d/1000).toFixed(2)+"km";
}