// 不知道的就暂时给个unknown
const mw = (req: unknown, res: unknown, next: () => void) => {
  console.log('这是最简单的中间件函数')
  // 测试不调用next() ， 是否会流转到下级路由或者中间件
  // 确实会停止往下流转
  next()
}
export default mw
