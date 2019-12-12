var speed = document.getElementById("speed");

//得分
var totalScore = 0;
//行数
var rowNum = 40;
//列数
var colNum = 60;

//移动间隔
var inter = speed.value*1;

//游戏是否已结束
var overed = true;

//当前的移动方向
var currentDir;

//蛇头的位置
var hp = {
    y:0,
    x:8
}

//食物的位置
var fp = {
    y:0,
    x:0
}

//存放蛇身的数组
var bodys = [];

//存放所有td的二维数组。
var alltds = [];

var gt = document.getElementById("gt");

//定时器
var timer;

//初始化游戏
function initGame(){
    if(timer){
        clearInterval(timer);
        timer = null;
    }
    totalScore = 0;
    overed = false;
    gt.innerHTML = "";
    alltds = [];
    bodys = [];
    currentDir = 39;
    //创建tr,td并添加到table上
    for(var i = 0;i<rowNum;i++){
        var tr = gt.insertRow();
        var tempArr = [];
        for(var j = 0;j<colNum;j++){
            var td = tr.insertCell();
            td.setAttribute("state","normal");
            tempArr.push(td);
        }
        alltds.push(tempArr);
    }

    //随机生成蛇头位置
    hp.y = Math.floor(Math.random()*rowNum);
    hp.x = Math.floor(Math.random()*(colNum-5));
    alltds[hp.y][hp.x].setAttribute("state","head");
    

    //随机生成食物点
    generateFood();

    //每隔一段时间走一格。
    timer = setInterval(move,inter);
}


//随机生成食物位置的函数
function generateFood(){
    var flag = true;
    var x = 0,y = 0;
    while(flag){
        x = Math.floor(Math.random()*colNum);
        y = Math.floor(Math.random()*rowNum);
        if(x==hp.x&&y==hp.y){
            continue;
        }
        flag = false;
        for(var i = 0;i<bodys.length;i++){
            if(bodys[i].x==x&&bodys[i].y==y){
                flag = true;
                break;
            }
        }
    }
    fp.x = x;
    fp.y = y;
    alltds[y][x].setAttribute("state","food");
}


//监听键盘事件
document.body.onkeydown = function(e){
    if(overed){
        return;
    }
    if(e.keyCode<37||e.keyCode>40){
        return;
    }
    //上38，下40，左37，右39
    // 38-40
    // 40-38
    // 37-39
    // 39-37
    if(Math.abs(currentDir-e.keyCode)!=2){
        currentDir = e.keyCode;
        move();
        clearInterval(timer);
        timer = setInterval(move,inter);
    }
    
}

//蛇头移动函数
function move(){
    //判断移动之后是否失败
    isOver(currentDir);
    //移动蛇身
    bodyMove();
    //移动蛇头
    alltds[hp.y][hp.x].setAttribute("state","normal");
    if(currentDir==37){
        //左
        if(hp.x>0){
            hp.x--;
        }
    }else if(currentDir==39){
        //右
        if(hp.x<colNum-1){
            hp.x++;
        }
    }else if(currentDir==38){
        //上
        if(hp.y>0){
            hp.y--;
        }
    }else if(currentDir==40){
        if(hp.y<rowNum-1){
            hp.y++;
        }
    }
    //判断是否碰触自身
    isTouchBody();
    //判断蛇头是否碰触了食物
    if(hp.x==fp.x&&hp.y==fp.y){
        //增加3个蛇身
        for(var i = 0;i<1;i++){
            var b = {
                x:hp.x,
                y:hp.y
            }
            bodys.push(b);
            totalScore++;
        }
        var s = document.getElementById("score");
        s.textContent = "得分："+totalScore;
        //再生成一个食物
        generateFood();
    }

    //绘制蛇头
    alltds[hp.y][hp.x].setAttribute("state","head");

    //绘制蛇身
    for(var i = bodys.length-1;i>=0;i--){
        var td = alltds[bodys[i].y][bodys[i].x];
        td.setAttribute("state","body");
        var color = Math.floor(200/(bodys.length+1)*i);
        td.style.backgroundColor = "rgb(255,"+color+","+color+")";
    }
}

//蛇身移动函数
function bodyMove(){
    for(var i = bodys.length-1;i>0;i--){
        var td = alltds[bodys[i].y][bodys[i].x];
        td.setAttribute("state","normal");
        td.removeAttribute("style");
        bodys[i].x = bodys[i-1].x;
        bodys[i].y = bodys[i-1].y;
    }
    if(bodys.length>0){
        var td = alltds[bodys[0].y][bodys[0].x];
        td.setAttribute("state","normal");
        td.removeAttribute("style");
        bodys[0].x = hp.x;
        bodys[0].y = hp.y;
    }
}

//判断蛇头是否越界
function isOver(dir){
    console.log(dir);
    if(dir==37){
        if(hp.x<=0){
            gameOver();
        }
    }else if(dir==39){
        if(hp.x>=colNum-1){
            gameOver();
        }
    }else if(dir==38){
        //上
        if(hp.y<=0){
            gameOver();
        }
    }else if(dir==40){
        if(hp.y>=rowNum-1){
            gameOver();
        }
    }
}

//判断蛇头是否碰触蛇身
function isTouchBody(){
    if(overed){
        return;
    }
    for(var i = 0;i<bodys.length;i++){
        if(hp.x==bodys[i].x&&hp.y==bodys[i].y){
            gameOver();
            break;
        }
    }
}

function gameOver(){
    overed = true;
    clearInterval(timer);
    timer = null;
    alert("游戏结束");
}


//重新开始按钮
function btnClick(){
    inter = speed.value*1;
    initGame();
}

initGame();