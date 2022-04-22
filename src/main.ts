const test = '我能出来，代表ts能转成js'
console.log(test)

// 导入http模块
// const http = require('http')
// import的时候才有http的类型
import http from 'http'
const path = require('path')
const aaas: number =
'1'

//这样引入可以看到类型，上面那种应该也可以，只不过http可能真的是any类型
// import axios from "axios";

// 创建web服务器实例
const server = http.createServer()

// 绑定request事件，监听客户端请求
server.on('request', (req: string | string[] | Record<string, unknown>, res: any) => {
  //设置回传信息
  res.write('Hello World + tsl')
  //告诉用户端请求结束
  res.end()

  console.log('Someone visit our web server.')
})

// 启动服务器
server.listen(81, function () {
  console.log('server running on http://127.0.0.1:81')
})
