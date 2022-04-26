import express from 'express'

const api = express.Router()

api.get('/api/get', (req, res) => {
  console.log('api/get  ,  收到请求', req.query)
  // res.send('api/get , 收到请求')
  res.send({
    status: 0,
    msg: 'api/get , 收到请求',
    data: req.query
  })
})

api.post('/api/post', (req, res) => {
  // res.send('api/post , 收到请求')
  // post要用body，get要用query
  console.log('api/post  ,  收到请求', req.body)

  res.send({
    status: 0,
    msg: 'api/post , 收到请求',
    data: req.body
  })
})

export default api
