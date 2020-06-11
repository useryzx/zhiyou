import CateList from "../CateList/CateList.jsx";
import CateAdd from "../CateAdd/CateAdd.jsx";
import CateEdit from "../CateEdit/CateEdit.jsx";
import AdminAdd from "../AdminAdd/AdminAdd.jsx";
import ChangePass from "../ChangePass/ChangePass.jsx";
import GoodAdd from "../GoodAdd/GoodAdd.jsx";
import GoodList from "../GoodList/GoodList.jsx";
import OrderList from "../OrderList/OrderList.jsx";
import Statement from "../Statement/Statement.jsx";
import SwiperEdit from "../SwiperEdit/SwiperEdit.jsx";
import UserAdd from "../UserAdd/UserAdd.jsx";


// export default {
//     "/home/cate-list":"查看分类",
//     "/home/cate-add":"添加分类",
//     "/home/admin-add":"添加管理员",
//     "/home/change-pass":"修改密码",
//     "/home/good-add":"添加商品",
//     "/home/good-list":"查看商品",
//     "/home/order-list":"查看订单",
//     "/home/statement":"数据统计",
//     "/home/swiper-edit":"设置轮播图",
//     "/home/user-add":"添加用户"
// }

const normalPages = [
    {
        key:"/home/cate-list",
        title:"查看分类",
        page:CateList
    },
    {
        key:"/home/cate-add",
        title:"添加分类",
        page:CateAdd
    },
    {
        key:"/home/admin-add",
        title:"添加管理员",
        page:AdminAdd
    },
    {
        key:"/home/change-pass",
        title:"修改密码",
        page:ChangePass
    },
    {
        key:"/home/good-add",
        title:"添加商品",
        page:GoodAdd
    },
    {
        key:"/home/good-list",
        title:"查看商品",
        page:GoodList
    },
    {
        key:"/home/order-list",
        title:"查看订单",
        page:OrderList
    },
    {
        key:"/home/statement",
        title:"数据统计",
        page:Statement
    },
    {
        key:"/home/swiper-edit",
        title:"设置轮播图",
        page:SwiperEdit
    },
    {
        key:"/home/user-add",
        title:"添加用户",
        page:UserAdd
    },
    
]

const editPage = [
    {
        key:"/home/cate-edit",
        title:"修改分类",
        page:CateEdit
    },

]


function keyToPageMap(key){
    let page = normalPages.find(el=>el.key === key);
    if(page){
        page = Object.assign({},page);
        return page;
    }

    page = editPage.find(el=>key.startsWith(el.key));
    if(page){
        page = Object.assign({},page);
        page.key = key;
        return page;
    }
    
}

export default keyToPageMap;