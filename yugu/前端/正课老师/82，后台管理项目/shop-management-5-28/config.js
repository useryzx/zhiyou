module.exports = {
    db:{
        path:"mongodb://127.0.0.1:27017/shop_management"
    },
    server:{
        port:3000,
        pageSize:10,        //分页查询默认每页条数
    },
    page:{
        swiperItemNum:8     //轮播图上限
    },
    defaultUserPsw:"123456" //新用户默认密码
    
}