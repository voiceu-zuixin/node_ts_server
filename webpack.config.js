const path = require('path')

module.exports = {
  mode: 'development',
  entry: "./src/main.ts",
  // devtool:"source-map",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolve: {
    // 可以在require('./xx/xx')的时候省略后缀
    extensions: ['.js', '.ts', '.d.ts']
  },
  devServer: {
    //暂时不知道写什么

  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      }
    ]
  },
  //可以是web/node，node的话就可以找到http、fs等模块了
  // 虽然vscode还是无法点链接过去，但是build和serve已经可以运行了
  // 但是serve还得继续调整才能显示目的，因为这个是自己搭建好express服务器，需要html
  // 而此处的项目是打包的就是一个启动服务器代码

  // 可以尝试配置命令，每次打包后，用node运行打包好的js
  target: 'node',
  // externals: {
  //   fs: "commonjs fs",
  //   path: "commonjs path"
  // }
}