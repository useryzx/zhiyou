// 定义页数的全局变量
let page = 1;
let flag = false;

// 全局函数声明提前
getJokes(page);
// 给body绑定scroll事件
document.body.onscroll = function () {
  // 判断网页的纵向偏移，到底后传参访问
  if (document.documentElement.scrollTop >= document.documentElement.scrollHeight - document.documentElement.clientHeight - 100) {

    // 到底了翻页
    if (!flag) {
      console.log('kuai到底了');
      page++;
      // 调用获取jokes的函数
      getJokes(page)
    }
  }
};

// 跨域请求，复用函数
function getJokes(page) {
  flag = true;
  // 定义接口参数
  // 每页数量
  let num = 20;
  let data = {
    // 页码
    page: page,
    pagesize: num,
    key: "7c2eab0ffbd56cf066ac8b59da32e802",
  };
  // 代理访问
  $.post("/proxy/joke/content/text.php", data)
    .then((res) => {
      // 调用渲染函数
      renderJoke(res.result);
      flag = false;
    })
    .catch((err) => {
      console.log(err);
      flag = false;
    });
}

// 笑话模板
let renderJoke = (joke) => {
  $.get("/tpl/joke.html")
    .then((data) => {
      let jokeStr = ejs.render(data, joke);
      // 页面不刷新放进后面，使用append
      $("#joke-content").append(jokeStr);
    })
    .catch((err) => {
      console.log(err);
    });
};
