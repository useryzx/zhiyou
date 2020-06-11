const rootUrl = "";

export default {
    
    login:rootUrl+"/user/login",                // 登录接口
    isLogin:rootUrl+"/user/islogin",            // 判断是否登录接口
    addCategory:rootUrl+"/category/add",        //新增分类
    categoryList:rootUrl+"/category/list",      //分类列表
    editCategory:rootUrl+"/category/update",    //修改分类
    getCategory:rootUrl+"/category/query",      //获取某个分类
}