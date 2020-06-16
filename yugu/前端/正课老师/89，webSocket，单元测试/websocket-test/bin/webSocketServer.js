const WebSocket = require("ws");

const httpServer = require("./www");


// 创建webSocket服务器，参数中可以指定所附属的http服务器。
const wss = new WebSocket.Server({
    server:httpServer
});



// 准备一个数组，存放所有已连接的用户的连接对象
let wsArray = [];


// 监听连接事件，每当有一个新用户连接，就会调用事件绑定的函数。
// 第一个参数是和此用户之间的连接对象。
wss.on("connection",function(ws){
    // console.log(ws.readyState);
    let nickname = ws.upgradeReq.url.split("?")[1];
    // url中的中文在网络传输时会被urlencode编码，进行urlencode解码。
    nickname = decodeURIComponent(nickname);
    console.log(nickname+"进入了聊天室");

    // 判断昵称是否可用
    if(wsArray.some(el=>el.nickname==nickname)){
        ws.send(JSON.stringify({
            type:"error",
            data:"此昵称已被占用"
        }));

        ws.close();
        return;
    }
    


    ws.nickname = nickname;

    // 断开连接事件
    ws.on("close",function(){
        disconnect(ws);
        // console.log(ws.readyState);
    });
    ws.on("error",function(){
        disconnect(ws);
    });

    // 获得消息事件
    ws.on("message",function(e){
        // console.log(e);
        let msgObj = JSON.parse(e);
        switch (msgObj.type) {
            case "groupChatMsg":
                sendChatGroupMsg(msgObj.data,ws.nickname);
                break;
        
            default:
                break;
        }
        
    })


    sendSystemGroupMsg(nickname+"进入了聊天室","#0f0");




    // 每当一个用户连接，就把它加入已连接的用户数组。
    wsArray.push(ws);
});



// 断开连接函数
function disconnect(ws){
    let index = wsArray.indexOf(ws);
    if(index>=0){
        wsArray.splice(index,1);
        sendSystemGroupMsg(ws.nickname+"离开了聊天室");
    }
    
    
}

// 群发系统消息
function sendSystemGroupMsg(msg,color="#f00"){
    wsArray.forEach(el=>{
        let msgObj = {
            type:"system",
            data:msg,
            color
        }
        let m = JSON.stringify(msgObj);
        if(el.readyState==1){
            el.send(m);
        }
        
    });
}

// 群发聊天消息
function sendChatGroupMsg(msg,from){
    wsArray.forEach(el=>{
        let msgObj = {
            type:"GroupChat",
            data:msg,
            from
        }
        let m = JSON.stringify(msgObj);
        if(el.readyState==1){
            el.send(m);
        }
    });
}