let test = "我能出来，代表ts能转成js";
console.log(test);


let count = 0

// 导入http模块
const http = require("http");
// const path = require("path");
// import http from 'http'

//这样引入可以看到类型，上面那种应该也可以，只不过http可能真的是any类型
// import axios from "axios";

// 创建web服务器实例
const server = http.createServer();

// 绑定request事件，监听客户端请求
server.on("request", (req, res) => {
  /**
 * 设置请求头信息
 * code（statusCode）： 200
 * headers信息: Content-Type
 */
  res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf8' });
  //设置回传信息
  res.write('Hello World+ts');
  //告诉用户端请求结束
  res.end();
  console.log("Someone visit our web server.  次数：",count++);
});

// 启动服务器
server.listen(80, function () {
  console.log("server running on http://127.0.0.1:80");
});
