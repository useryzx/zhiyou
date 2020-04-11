// 封装一个函数，该函数有参数可以根据具体的需求传入对应的参数
function jiecheng(n){
  var r =1;
  for(var i=2;i<=n;i++)
  {
      r*=i;
  }
  return r;
}
// 模块化(必须要遵循模块化的准则)
// module.exports =xxx的形式(要模块的功能)
module.exports =jiecheng;