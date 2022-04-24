import express = require('express')

const router = express.Router()

router.get('/login/list', (req, res) => {
  res.send('GET login list.')
  console.log(req.params, 'login')
  console.log(req)
})

// module.exports = {router}
export default router
