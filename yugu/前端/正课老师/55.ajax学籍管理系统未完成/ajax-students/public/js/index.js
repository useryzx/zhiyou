// 首页的js逻辑都放到这个文件
//添加按钮的事件
$("#add-btn").on("click", function () {

    console.log("param");
    // 拿到form表单此次提交过来的数据
    let param = $("#add-form").serialize();


    // 接口
    $.post("/stu/add", param)
        .then(data => {
            if (data.err == 10) {
                // 引入的layer.js文件时一个图层提示框
                layer.alert("添加失败");
            } else {
                layer.alert("添加成功");
                // 表单隐藏，表单清空，显示添加的数据
                $("#addModal").modal("hide");
                $("#add-form")[0].reset();
                // 请求学生列表(以前是服务器直接返回的)
                queryStuList();
            }
        })
});
// 记录当前显示的页码
var currentPage = 0;
// 记录总页码
let totalPage;

// 设置当前的查询条件  (因为ui没有设置必填或者搜索的时候有可能
// 不去填写sex那么键就会为空 会渲染不成功  所以准备个空值)
let condition = {sex:""};

// 用来请求学生列表的函数
function queryStuList() {
    //  将当前页码写入查询条件
    condition.page = currentPage;
    $.get("/stu/list", condition)
        .then(data => {
            //    记录总页数
            totalPage = data.totalPage;
            renderStudentList(data);
        })
}
// 渲染学生列表数据
function renderStudentList(students) {
    //创建学生列表模板[请求的是当前student-table.html这个网页的数据]
    // 
    $.get("/tpl/student-table.html")
        .then(data => {
            // 把html里面的内容请去出来返回给index.html
            // data就是html页面的数据
            // 把模板和数据结合成一个html字符串
            let htmlStr = ejs.render(data, students);
            $("#stu-list").html(htmlStr);
        });

    // 请求分页模板
    $.get("/tpl/page.html")
        .then(data => {
            // 把html里面的内容请去出来返回给index.html
            // data就是html页面的数据
            // 把模板和数据结合成一个html字符串
            let htmlStr = ejs.render(data, {
                totalPage: students.totalPage,
                currentPage
            });
            $("#page-box").html(htmlStr);
        });
}

//  下一个按钮
// 由于这些按钮在页面刚启动的时候是不存在的，所以会出现绑定时间不成功
$("body").delegate("#next-btn", "click", function () {
    if (currentPage < totalPage - 1) {
        currentPage++;
        queryStuList();
    }
})

$("body").delegate("#prev-btn", "click", function () {
    if (currentPage > 0) {
        currentPage--;
        queryStuList();
    }
})
//  前往某一页
$("body").delegate(".page-item", "click", function () {
    currentPage = $(this).attr("ind") * 1;
    queryStuList();
})

//  搜索的方法
$("#search-btn").on("click", function () {
    // 把表单数据整合成数组
    let paramArr = $("#search-form").serializeArray();
    //    将表单中的数据插入到提前准备的condition对象中
    paramArr.forEach(element => {
        //    为condition添加属性和属性值[主要是输入的搜索条件
        // 都是属性]
        condition[element.name] = element.value;
    });
   
     //    重置为第一页
     currentPage = 0;
     queryStuList();
     // 隐藏搜索模态框
     $("#searchModal").modal("hide");
     // 渲染
     renderCondition ();
     // 重置
     $("#search-form")[0].reset();
});
// 渲染查询条件
function renderCondition () {  
    
    $.get("/tpl/condition.html")
        .then(data => {
            let htmlStr = ejs.render(data,condition);
            $("#condition-box").html(htmlStr);
        });
}
// 删除某个查询条件
$("body").delegate(".condition-btn","click",function () {
      //获取需要删除的名字
      let con =$(this).attr("con");
    //   从条件对象中删除
      condition[con] ="";
      renderCondition();
      queryStuList();
  })
//   删除某个学生
$("body").delegate(".delete-btn","click",function () {
     let l1 =layer.confirm("确定要删除吗?",{
        //  提示按钮
        btn:["确定","取消"]
     },()=>{
         let id =$(this).attr("stuid");
         $.get("/stu/delete",{_id:id})
         .then(data=>{
             if (data.err==0) {
                 layer.msg("删除成功");
             } else {
                layer.msg("删除失败");
               
             }
             queryStuList();
         })
         layer.close(l1);
     })
})
queryStuList();