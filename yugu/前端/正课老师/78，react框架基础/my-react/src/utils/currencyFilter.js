export default function (price,prefix="￥"){
    return prefix + (price*1).toFixed(2);
}