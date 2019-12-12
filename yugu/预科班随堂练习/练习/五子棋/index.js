

var gt = document.getElementById("gt");
var rl = document.getElementById("round-label");

//存放所有棋子的二维数组
var allps = [];

//记录当前该哪个颜色下子,true为黑色
var currentRound = true;

//本局游戏的回合记录
var pieceStack = [];

//记录游戏是否结束
var isOver;


//创建棋盘td
for(var i = 0;i<19;i++){
    var tr = gt.insertRow();
    var tempArr = [];
    for(var j = 0;j<19;j++){
        var td = tr.insertCell();
        td.onclick = tdClick;
        var d = document.createElement("div");
        td.appendChild(d);
        tempArr.push(d);
    }
    allps.push(tempArr);
}


//初始化游戏函数
function initGame(){
    isOver = false;
    //初始化所有td
    allps.forEach(tr=>{
        tr.forEach(p=>{
            p.setAttribute("state","normal");
        });
    });

    //移除红色边框
    if(pieceStack.length>0){
        var po = pieceStack[pieceStack.length-1];
        allps[po.y][po.x].classList.remove("current");
    }

    //清空记录栈
    pieceStack = [];

    //重置回合
    currentRound = true;
    rl.textContent = "当前回合:"+(currentRound?"黑":"白");
}

//td点击事件函数
function tdClick(e){
    if(isOver){
        return;
    }
    var state = e.target.getAttribute("state");
    if(state=="normal"){
        if(currentRound){
            e.target.setAttribute("state","black");
        }else{
            e.target.setAttribute("state","white");
        }

        //标记刚下的子为红边框
        if(pieceStack.length>0){
            var po = pieceStack[pieceStack.length-1];
            allps[po.y][po.x].classList.remove("current");
        }
        e.target.classList.add("current");
        
        //记录本棋子
        var pos = positionOfPiece(e.target);
        pieceStack.push(pos);
        //判断是否赢了
        if(isWin(pos)){
            isOver = true;
            var color = currentRound?"黑":"白";
            alert(color+"方胜利");
        }

        //切换回合
        currentRound = !currentRound;
        rl.textContent = "当前回合:"+(currentRound?"黑":"白");
    }
}

//获得某个棋子的坐标
function positionOfPiece(p){
    for(var i = 0;i<19;i++){
        var col = allps[i].indexOf(p);
        if(col>=0){
            return{x:col,y:i};
        }
    }
}

//悔棋按钮事件函数
function retractClick(){
    if(pieceStack.length<=0){
        return;
    }
    var pos = pieceStack.pop();
    allps[pos.y][pos.x].classList.remove("current");
    allps[pos.y][pos.x].setAttribute("state","normal");
    if(pieceStack.length>0){
        var po = pieceStack[pieceStack.length-1];
        allps[po.y][po.x].classList.add("current");
    }
    currentRound = !currentRound;
    rl.textContent = "当前回合:"+(currentRound?"黑":"白");
}

//判断是否胜利
function isWin(pos){
    //检查左右
    if(dirWin("lr",pos)){
        return true;
    }
    //检查上下
    if(dirWin("ud",pos)){
        return true;
    }
    //左上到右下
    if(dirWin("lurd",pos)){
        return true;
    }
    //右上到左下
    if(dirWin("ruld",pos)){
        return true;
    }
    return false;
}

//判断某个方向是否胜利
function dirWin(dir,pos){
    var color = currentRound?"black":"white";
    var pNum = 1;
    var flag = true;
    var cp = {x:pos.x,y:pos.y};
    while(flag){
        if(dir=="lr"){
            cp.x--;
        }else if(dir=="ud"){
            cp.y--;
        }else if(dir=="lurd"){
            cp.x--;
            cp.y--;
        }else if(dir=="ruld"){
            cp.x++;
            cp.y--;
        }
        
        if(!isInBoard(cp)){
            break;
        }
        
        if(allps[cp.y][cp.x].getAttribute("state")==color){
            pNum++;
            if(pNum>=5){
                return true;
            }
        }else{
            break;
        }
    }
    cp = {x:pos.x,y:pos.y};
    while(flag){
        if(dir=="lr"){
            cp.x++;
        }else if(dir=="ud"){
            cp.y++;
        }else if(dir=="lurd"){
            cp.x++;
            cp.y++;
        }else if(dir=="ruld"){
            cp.x--;
            cp.y++;
        }
        
        if(!isInBoard(cp)){
            break;
        }
        if(allps[cp.y][cp.x].getAttribute("state")==color){
            pNum++;
            if(pNum>=5){
                return true;
            }
        }else{
            break;
        }
    }
    console.log(pNum);
    return false;
}


//判断一个坐标是否在棋盘内
function isInBoard(point){
    return point.x>=0&&point.x<19
            &&point.y>=0&&point.y<19;
}

initGame();


if(navigator.userAgent.indexOf("Chrome")>=0){
    gt.style.width = "977px";
    gt.style.height = "980px";
}
