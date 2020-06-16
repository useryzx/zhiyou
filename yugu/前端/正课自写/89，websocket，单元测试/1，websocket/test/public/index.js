const nicknameField = document.getElementById('nickname-field');
let wsConnection = null;

function enterBtnClick() {
    let nickname = nicknameField.value;
    if (!nickname.trim()) {
        alert('昵称不能为空');
        return;
    }
    if (wsConnection) {
        alert('已经进入了，无需重复进入');
        return;
    }
    //此处必须使用绝对地址
    // webSocket类，用于创建websocket链接对象，参数是链接地址，使用ws协议
    wsConnection = new WebSocket('ws://127.0.0.1:3000?' + nickname);
    // 连接成功回调
    wsConnection.onopen = function () {
        alert('进入成功');
    }
    // 连接失败的回调
    wsConnection.onerror = function () {
        alert('连接失败');
        wsConnection = null;
    }
    // 连接断开的回调
    wsConnection.onclose = function () {
        alert('连接断开');
        wsConnection = null;
    }
    // 当收到服务器发来的数据的回调函数
    wsConnection.onmessage = function (e) {
        console.log(e);
        let msgObj = JSON.parse(e.data);
        switch (msgObj.type) {
            case 'system':
                receiveSystemMsg(msgObj);
                break;
            case 'groupChat':
                receiveGroupMsg(msgObj);
                break;
            default:
                break;
        }
    }
}

// 退出登录按钮
function exitBtnClick() {
    if (!wsConnection) {
        alert('未登录');
        return;
    }
    wsConnection.onclose();
}
let msgInput = document.getElementById('msg-input');
msgInput.onkeypress = function (e) {
    console.log(e.keyCode);

    if (e.keyCode == 13) {
        senBtnClick();
    }
}
// 发送消息
function senBtnClick() {
    if (!wsConnection) {
        alert('请先登录');
        return;
    }

    let msg = msgInput.value;

    if (!msg.trim()) {
        alert('不能发送空消息');
        return;
    }
    let msgObj = {
        type: 'groupChatMsg',
        data: msg
    }
    wsConnection.send(JSON.stringify(msgObj));
}
// 获得系统消息
let chatMsgBox = document.getElementById('chat-msg-box');

function receiveSystemMsg(msgObj) {
    let p = document.createElement('p');
    p.classList.add('system-msg');
    p.textContent = msgObj.data;
    p.style.color = msgObj.color
    if (isAtBottom()) {
        chatMsgBox.appendChild(p);
        chatMsgBox.scrollTop = chatMsgBox.scrollHeight - chatMsgBox.clientHeight;
    } else {
        chatMsgBox.appendChild(p);
    }
    chatMsgBox.appendChild(p);
}
// 获取群聊消息
function receiveGroupMsg(msgObj) {
    // nickname
    let span = document.createElement('span');
    let p = document.createElement('p');
    span.textContent = msgObj.from + ':';
    span.style.color = 'red';
    p.textContent = msgObj.data;
    p.style.color = 'black';
    if (isAtBottom()) {
        chatMsgBox.appendChild(span);
        chatMsgBox.appendChild(p);
        chatMsgBox.scrollTop = chatMsgBox.scrollHeight - chatMsgBox.clientHeight;
    } else {
        chatMsgBox.appendChild(span);
        chatMsgBox.appendChild(p);
    }

}

function isAtBottom() {
    let st = chatMsgBox.scrollTop;
    let sh = chatMsgBox.scrollHeight;
    let ch = chatMsgBox.clientHeight;
    return sh - ch == st;
}