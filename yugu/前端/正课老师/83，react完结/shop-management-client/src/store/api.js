const rootUrl = "";

export default {
    
    login:rootUrl+"/user/login",                // 登录接口
    isLogin:rootUrl+"/user/islogin",            // 判断是否登录接口
    addCategory:rootUrl+"/category/add",        //新增分类
    categoryList:rootUrl+"/category/list",      //分类列表
    editCategory:rootUrl+"/category/update",    //修改分类
    getCategory:rootUrl+"/category/query",      //获取某个分类
    uploadOne:rootUrl+"/upload/single",         //上传单个文件
    uploadMany:rootUrl+"/upload/multiple",      //上传多个文件
    addGood:rootUrl+"/good/add",                //新增商品
    goodList:rootUrl+"/good/search",            //商品列表
    editGood:rootUrl+"/good/update",            //修改商品
    addAdmin:rootUrl+"/user/add-admin",         //添加管理员
    addUser:rootUrl+"/user/add-account",        //添加普通用户
    logout:rootUrl+"/user/exit",                //退出登录
    userList:rootUrl+"/user/list",              //用户列表
    changePassword:rootUrl+"/user/set-psw",     //修改密码
    addSwiper:rootUrl+"/swiper-item/add",       //添加轮播页
    swiperList:rootUrl+"/swiper-item/list",     //轮播图列表
    deleteSwiper:rootUrl+"/swiper-item/delete", //删除轮播图
    orderList:rootUrl+"/order/search",          //订单列表
}