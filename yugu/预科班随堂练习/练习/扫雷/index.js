//游戏行数
var rowNum = 10;

//游戏列数
var colNum = 10;

//地图中雷的数量
var bombNum = 10;

//记录游戏是否已结束
var isOver = false;

//已经打开的td数量
var openNum = 0;

//获得table元素对象
var gt = document.getElementById("g-table");

//存储所有td的数组
var alltds = [];

//游戏初始化函数
function initGame() {
    alltds = [];
    isOver = false;
    openNum = 0;
    gt.innerHTML = "";
    //根据行数和列数创建表格单元格
    for (var i = 0; i < rowNum; i++) {
        var tr = gt.insertRow();
        for (var j = 0; j < colNum; j++) {
            var td = tr.insertCell();
            td.setAttribute("state", "normal");
            td.onclick = tdClick;
            td.oncontextmenu = rightClick;
            alltds.push(td);
        }
    }
    //随机生成地雷的位置
    bombArr = [];
    for (var i = 0; i < rowNum * colNum; i++) {
        bombArr[i] = i;
    }
    for (var i = 0; i < bombNum; i++) {
        //随机生成一个索引，根据这个索引从地雷数组中
        //获得一个位置。
        var index = Math.random() * bombArr.length;
        index = Math.floor(index);

        alltds[bombArr[index]].hasBomb = true;
        console.log(bombArr[index]);
        bombArr.splice(index, 1);

        // alltds[colNum*(rowNum-1)+i].hasBomb = true;
    }

}

// 阻止右键菜单弹出
function rightClick(e) {
    if (e.target.getAttribute("state") == "normal") {
        e.target.setAttribute("state", "flag");
    } else if (e.target.getAttribute("state") == "flag") {
        e.target.setAttribute("state", "normal");
    }

    e.preventDefault();
}


//td左键点击事件绑定的函数
function tdClick(e) {
    if(isOver){
        return;
    }
    if (e.target.getAttribute("state") == "normal") {
        if (e.target.hasBomb) {
            isOver = true;
            openAll();
            e.target.setAttribute("state", "explode");
            alert("GAME OVER");
        } else {
            var ind = alltds.indexOf(e.target);
            opentd(ind);
        }

    }
    isWin();
}


//计算某个td周围有多少颗雷
function bombAround(index) {
    var num = 0;
    //左侧
    if (index % colNum != 0) {
        if (alltds[index - 1].hasBomb) {
            num++;
        }
        //左上
        if (index >= colNum) {
            if (alltds[index - colNum - 1].hasBomb) {
                num++;
            }
        }
    }
    //上侧
    if (index >= colNum) {
        if (alltds[index - colNum].hasBomb) {
            num++;
        }
        //右上
        if ((index + 1) % colNum != 0) {
            if (alltds[index - colNum + 1].hasBomb) {
                num++;
            }
        }
    }
    //右侧
    if ((index + 1) % colNum != 0) {
        if (alltds[index + 1].hasBomb) {
            num++;
        }
        //右下
        if (index / colNum < rowNum - 1) {
            if (alltds[index + colNum + 1].hasBomb) {
                num++;
            }
        }
    }
    //下侧
    if (index / colNum < rowNum - 1) {
        if (alltds[index + colNum].hasBomb) {
            num++;
        }
        if (index % colNum != 0) {
            if (alltds[index + colNum - 1].hasBomb) {
                num++;
            }
        }
    }
    return num;
}

//打开某个td
function opentd(ind) {
    if(alltds[ind].getAttribute("state")!="normal"){
        return;
    }
    var bn = bombAround(ind);
    if (bn == 0) {
        alltds[ind].setAttribute("state", "open");
        //左侧
        if (ind % colNum != 0) {
            opentd(ind-1);
            //左上
            if (ind >= colNum) {
                opentd(ind-colNum-1);
            }
        }
        //上侧
        if (ind >= colNum) {
            opentd(ind-colNum);
            //右上
            if ((ind + 1) % colNum != 0) {
                opentd(ind-colNum+1);
            }
        }
        //右侧
        if ((ind + 1) % colNum != 0) {
            opentd(ind+1);
            //右下
            if (ind / colNum < rowNum - 1) {
                opentd(ind+colNum+1);
            }
        }
        //下侧
        if (ind / colNum < rowNum - 1) {
            opentd(ind+colNum);
            //左下
            if (ind % colNum != 0) {
                opentd(ind+colNum-1);
            }
        }

    } else {
        alltds[ind].setAttribute("state", bn);
    }
    openNum++;
}

//打开所有td
function openAll(){
    for(var i = 0;i<colNum*rowNum;i++){
        if(alltds[i].hasBomb){
            alltds[i].setAttribute("state","bomb")
        }else{
            var bn = bombAround(i);
            if(bn == 0){
                alltds[i].setAttribute("state","open");
            }else{
                alltds[i].setAttribute("state",bn);
            }
        }
    }
}


//判断胜利
function isWin(){
    if(openNum >= colNum*rowNum-bombNum){
        isOver = true;
        alert("恭喜您已过关");
    }
}

initGame();

function btnClick(){
    var rowInput = document.getElementById("row");
    var colInput = document.getElementById("col");
    var bombInput = document.getElementById("bomb");

    rowNum = rowInput.value*1;
    colNum = colInput.value*1;
    bombNum = bombInput.value*1;

    initGame();
}