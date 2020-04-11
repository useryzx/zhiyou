// 监听输入框并加入防抖
$("#search-input").on("input", function (e) {
    // 当输入完成500ms后访问搜索词汇接口，获取搜索联想词汇
    (function () {
        let timer = null;
        function fn() {
            if (timer) {
                clearTimeout(timer)
            }
            setTimeout(() => {
                timer = null;
                // 访问搜索接口
                if($("#search-input").val()){
                    $.ajax({
                        type: "get",
                        url: "/searchWord",
                        data: {
                            keyWord: $("#search-input").val()
                        },
                    }).then(words => {
                        let wordsObj = JSON.parse(words)
                        renderWord(wordsObj);
                    })
                }
                else{
                    $("#words-panel").html("");
                }
            }, 500);
        }
        return fn;
    }()());
})

// 模板渲染
function renderWord(words) {
    console.log('渲染界面');
    $.get("/tpl/keyWord.html",function(data){
        let wordsHtml = ejs.render(data, { words });
        $("#words-panel").html(wordsHtml);
    })
}