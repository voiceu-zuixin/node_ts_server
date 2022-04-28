//用ts写代码不是要每个代码都去标记类型，像这些已经是引入到包，人家类型已经定好了，不必再去多此一举
//真正需要写的是那些自己定义的函数、对象等数据

// 导入express
// import express from 'express'

//要用这种写法，这样就可以用require了，或者下面这种写法
// import express from 'express'
import express = require('express')
// const express = require('express')

// 导入数据库mysql模块
import mysql from 'mysql'

//导入路由模块
// import router = require('./router/login')
import router from './router/login'
import api from './router/api'

// 导入中间件函数
import mw from './router/middleware'
import cors from 'cors'

// 创建web服务器
const app = express()

// 建立与mysql的链接
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin',
  database: 'my_db_01'
})

// 测试mysql能否正常工作
db.query('select 1', (err, results) => {
  if (err) console.log(err.message)

  // 能打印[ RowDataPacket { '1': 1 } ] 就说明能正常进行
  // console.log(results)
})

//查询users里的所有数据
const sqlSelect = 'select * from users'
db.query(sqlSelect, (err, results) => {
  if (err) console.log(err.message)
  console.log(results)
})

// mysql插入对象
const user = {
  username: 'pitter packer',
  password: 321123
}

// 用? ? 来占位，后面按序替换
const sqlInsert = 'insert into users (username, password) values (?, ?)'
db.query(sqlInsert, [user.username, user.password], (err, results) => {
  if (err) console.log(err.message)
  if (results.affectedRows === 1) console.log('插入数据成功')
})

//再次查询插入之后的数据库，查看是否成功
db.query(sqlSelect, (err, results) => {
  if (err) console.log(err.message)
  console.log(results)
})

// 定义局部中间件
const mw2 = (req: unknown, res: unknown, next: () => void) => {
  console.log('这是局部中间件函数')
  // 测试不调用next() ， 是否会流转到下级路由或者中间件
  // 确实会停止往下流转
  next()
}

//错误级别中间件
const mw3 = (err: Error, req: unknown, res: unknown, next: () => void) => {
  console.log('这是局部-错误-中间件函数')

  console.log('局部错误中间件捕获到的错误：' + err.message)

  // 测试不调用next() ， 是否会流转到下级路由或者中间件
  // 确实会停止往下流转
  // next()
}

//调用express.static方法，对外提供静态资源,这样该文件夹路径可以不写，直接写该文件夹下的剩下路径即可访问
//比如./public/index.ts 我可以直接写成http://loaclhost/index.ts
//当然ts文件不能被浏览器识别，这样的话就会下载该文件，可以弄一个js/css文件或者html来测试

//并且，use中间件，必须写在前面，路由一层一层匹配，写到后面的 /:id 路由下就被拦截了
// 主目录下可以省略 ./
app.use(express.static('public'))
// app.use(express.static('./public'))

// 全局中间件
app.use(mw)
app.use(router)

// JSONP必须在CORS之前，不然先开了cors，后面jsonp就被当成是cors接口了
// 只支持get
app.get('/api/jsonp', (req, res) => {
  console.log('jsonp')
  console.log(req.query.callback)
  // 获得客户端发送过来的回调函数的名字
  const funcName = req.query.callback
  // 得到要通过jsonp形式发送给客户端的数据
  const data = {
    name: 'fhz',
    age: 20
  }
  // 根据前两部的数据，拼接出一个函数调用的字符串
  const scriptStr = `${funcName}(${JSON.stringify(data)})`
  // 把上一步拼接的字符串，响应给客户端的<script>标签进行解析执行
  // ps：为什么script标签可以跨域，因为这是规定了普通get、post这些请求，不能跨域
  // 但是标签中带有 src 属性的一类标签，比如 <img>  <iframe> <script>可以跨域请求
  console.log(scriptStr)
  // 在这里直接返回过去，是因为JQuery都封装好了
  res.send(scriptStr)
})

app.use(express.urlencoded({ extended: false }))
// 使用cors跨域中间件
app.use(cors())
app.use(api)

//监听客户端等GET和POST请求，并向客户的响应具体的内容
app.get('/user', (req, res) => {
  //调用express提供的res.send()方法，向客户端响应一个JSON对象
  res.send({
    name: 'voiceu',
    age: 12,
    gender: 'male'
  })
})

app.post('/user', (req, res) => {
  res.send('response success')
})

app.get('/mid2', mw2, (req, res) => {
  res.send('mid2')
  console.log('我是mid2')
})

app.get('/err', (req, res) => {
  console.log('我收到了 err请求')
  res.send('我收到了 err请求')
  throw new Error('new Error in get /err')
  res.send('err发生了错误')
})

app.use(mw3)

// 接受json形式的数据，需要配置解析json的中间件，否则是undefined，不能收到
app.get('/json', express.json(), (req, res) => {
  console.log(req.body)
  res.send('我已经成功接收json数据')
})

//通过url方式进行传参
app.get('/', (req, res) => {
  //通过req.query来解析
  console.log(req.query, '我是get "/"')
  res.send(req.query)
})

//通过url中动态参数的方式进行传参
// http://localhost/:id 这种形式可以动态获取到{id:xx}，其中:表示id是动态可变的
app.get('/:id', (req, res) => {
  //可以通过req.params方法
  console.log(req.params, ':id')
  //浏览器会自动请求 /favicon.ico 所以中间件之后，路由到这里会匹配到 id:favicon.ico
  console.log(req)

  res.send(req.params)
})

// 启动web服务器
app.listen(80, () => {
  console.log('express server running on http://127.0.0.1')
})
