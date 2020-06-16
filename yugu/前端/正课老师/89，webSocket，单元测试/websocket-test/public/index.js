
const nicknameField = document.getElementById("nickname-field");

let wsConnection = null;

function enterBtnClick(){
    let nickname = nicknameField.value;
    if(!nickname.trim()){
        alert("昵称不能为空");
        return;
    }


    if(wsConnection){
        alert("已经进入了，无需重复进入");
        return;
    }


    // WebSocket类，用于创建websocket连接对象，参数是连接地址，使用ws协议。
    wsConnection = new WebSocket("ws://192.168.5.237:3000?"+nickname);

    
    // 连接成功时的回调函数
    wsConnection.onopen = function(){
        alert("登录成功");
    }


    // 连接失败的回调函数
    wsConnection.onerror = function(){
        alert("连接失败");
        wsConnection = null;
    }

    //连接断开的回调函数
    wsConnection.onclose = function(){
        alert("连接已断开");
        wsConnection = null;
    }
    
    // 当收到服务器发来的数据的回调函数
    wsConnection.onmessage = function(e){
        //console.log(e);
        let msgObj = JSON.parse(e.data);
        switch (msgObj.type) {
            case "system":
                receiveSystemMsg(msgObj);
                break;
            case "GroupChat":
                receiveChatGroupMsg(msgObj);
                break;
            case "error":
                alert(msgObj.data)
                break;
        }
    }

}

// 退出登录按钮
function exitBtnClick(){
    if(!wsConnection){
        alert("还未登录");
        return;
    }

    // 主动断开连接。
    wsConnection.close();

}

// 发送消息
let msgInput = document.getElementById("msg-input");
msgInput.onkeypress = function(e){
    // console.log(e);
    if(e.keyCode==13){
        sendBtnClick();
    }
}
function sendBtnClick(){
    if(!wsConnection){
        alert("请先登录");
        return;
    }

    let msg = msgInput.value;
    if(!msg.trim()){
        alert("不能发送空消息");
        return;
    }


    // 发送群聊消息
    let msgObj = {
        type:"groupChatMsg",
        data:msg
    }
    let msgStr = JSON.stringify(msgObj);
    wsConnection.send(msgStr);

    msgInput.value = "";
}


let chatMsgBox = document.getElementById("chat-msg-box");
// 获得系统消息
function receiveSystemMsg(msgObj){
    let p = document.createElement("p");
    p.style.color = msgObj.color;
    p.classList.add("system-msg");
    p.textContent = msgObj.data;

    if(isAtBottom()){
        chatMsgBox.appendChild(p);
        chatMsgBox.scrollTop = chatMsgBox.scrollHeight - chatMsgBox.clientHeight;
    }else{
        chatMsgBox.appendChild(p);
    }
}


// 获得群聊消息
function receiveChatGroupMsg(msgObj){
    let p = document.createElement("p");

    let s1 = document.createElement("span");
    s1.textContent = msgObj.from+":";
    s1.style.fontWeight = "bold";

    let s2 = document.createElement("span");
    s2.textContent = msgObj.data;
    s2.style.color = "#333";

    p.appendChild(s1);
    p.appendChild(s2);

    if(isAtBottom()){
        chatMsgBox.appendChild(p);
        chatMsgBox.scrollTop = chatMsgBox.scrollHeight - chatMsgBox.clientHeight;
    }else{
        chatMsgBox.appendChild(p);
    }
    
}


// 滚动到底部
function isAtBottom(){
    let st = chatMsgBox.scrollTop;
    let sh = chatMsgBox.scrollHeight;
    let ch = chatMsgBox.clientHeight;

    return sh - ch == st;
    
}