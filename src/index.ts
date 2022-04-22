const ax = 1
const ass = true
const aa = '9'

console.log(aa, ass, ax)

//这里是ts报错，当只有ts报错的时候，eslint是检测不到的，所以可以直接提交
const aaa: any[] = 1

//这里是ts报错，还有eslint报错的空格不标准等原因，提交时，会修改
const aab: any[] = 1

// // 这里是eslint报错，在这个报错的时候，是修改之后，再次不改动也无法提交
// const http = require('http')
export {}
