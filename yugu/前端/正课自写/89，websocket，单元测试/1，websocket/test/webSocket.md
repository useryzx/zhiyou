### webSocket

websocket是h5新增的webAPI，它是一种双攻双向的长链接通信技术，主要用于实时双向通信。

wss模块，是对nodejs中wensocket功能的封装，用于快速搭建websocket服务器

### 浏览器端websocket使用：

1. 使用new webSocket(url)创建wenSocket连接。
2. open事件，连接成功。
3. error事件，连接失败或异常断开。
4. close事件，主动断开或被动断开。
5. message事件，获得服务端发送消息。
6. 通过send（）方法向服务端发送消息。

## webSocket一般不使用JSON作为传输数据的格式，而是使用自己定制的数据格式。

