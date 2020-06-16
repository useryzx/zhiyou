const WebSocket = require('ws');
const httpServer = require('./www')
// 创建webSocket服务器，参数中可以指定所附属的http服务器
const wss = new WebSocket.Server({
	server: httpServer
});
// 准备一个数组存放所有已连接用户的连接对象

let wsArray = [];

// 监听连接事件，每当一个用户连接，就会调用事件绑定函数。
// 函数有两个参数，第一个参数是和此用户之间的连接对象，第二个是本次连接请求的请求对象。
wss.on('connection', function (ws) {
	console.log(ws.upgradeReq.url);
	let nickname = ws.upgradeReq.url.split('?')[1];
	// url中的中文会在网络传输时会被urlencode编码，需要进行解码
	nickname = decodeURIComponent(nickname);
	console.log(nickname + '进入聊天室');
	ws.nickname = nickname;
	// 断开连接事件
	ws.on('close', function () {
		disConnect(ws);
	})
	ws.on('error', function () {
		disConnect(ws);
	})
	ws.on('message', function (e) {
		console.log(e);
		let msgObj = JSON.parse(e);
		switch (msgObj.type) {
			case 'groupChatMsg':
				sendChatGroupMsg(msgObj.data, ws.nickname);
				break;
			default:
				break;
		}
	})
	// 为每个已连接对象发送消息
	sendSystemGroupMsg(nickname + '进入了聊天室' + 'green');


	// 每当一个用户连接，就把它加入已连接的用户数组中。
	wsArray.push(ws)
})



// 断开连接函数
function disConnect(ws) {
	let index = wsArray.indexOf(ws);
	if (index >= 0) {
		wsArray.splice(index, 1);
		sendSystemGroupMsg(ws.nickname + '离开了聊天室');
	}
}
// 群发消息函数
function sendSystemGroupMsg(msg, color = '#f00') {
	wsArray.forEach(el => {
		let msgObj = {
			type: 'system',
			data: msg,
			color
		}
		let m = JSON.stringify(msgObj)
		if (el.readyState == 1) {
			el.send(m);
		}
	})
}

//群发聊天消息
function sendChatGroupMsg(msg, from) {
	wsArray.forEach(el => {
		let msgObj = {
			type: 'groupChat',
			data: msg,
			from
		}
		let m = JSON.stringify(msgObj)
		if (el.readyState == 1) {
			el.send(m);
		}
	})
}