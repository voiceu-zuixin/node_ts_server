# 介绍
用express+ts+webpack+mySQL来写一个简单的http服务器，为了学习node、ts和mySQL

# 可以练习如下能力
1、用webpack来搭建项目的环境
2、配置ts的环境
3、配置代码规范，eslint、prettier、git husky、commitizen等
4、练习git的一些命令
5、练习axios请求、跨域等
6、还需要一个前端页面来进行交互，来结合练习axios请求这些，proxy配置，nginx等代理
7、学习mySQL

# ps：
但其实node作后端好像不需要最后转成es5，因为不用在浏览器上运行，
所以webpack以及ts的作用是练习、以及练习配置，也是为了规范代码质量，毕竟有ts的类型约束

# 步骤
## 1、用webpack配置ts能运行的环境
`npm i webpack webpack-cli webpack-dev-server typescript ts-loader -D`
配置webpack.config.js
配置package.json的script  build/serve

## 2、配置node的ts环境
`tsc --init`生成tsconfig.json
安装node的ts类型声明文件  网址： https://www.typescriptlang.org/dt/search?search=node
webpack仅仅是用来打包的，而ts想要运行node，需要的是ts-node，
如果想动态运行，类似nodemon，则需要ts-node-dev

所以我这里把start脚本写成ts-node-dev的相关命令，而不是webpack，
后面再试试能不能用webpack实现运行ts的node

node与@types/node的版本不同，导致require('http')无法识别到，应该是这个原因，可惜后面发现不是主要问题
这个确实会导致当前的require不能链接到http的类型声明文件，但是换成低版本，依旧不行
只能是import导入http才可以链接进去

不过不论是哪种方式，webpack都不能正常打包，直接使用ts-node来运行main.ts倒是可以打开服务器

我这里就杠上了，非要用webpack来打包，后面找到了，是webpack.config.js里面要把target写成node
然后就可以打包了，之后使用node运行打包的js文件即可，为了方便，把脚本直接二合一
"serve": "webpack && node ./dist/bundle.js"
但是这样，无法动态的进行修改后打包并运行，因为是两个命令连着，
webpack-dev-server是通过express进行搭建服务器的，如果用这个命令，就是在搭好的服务器上，执行搭建服务器的代码，矛盾了，这上面是要执行一些html或者js之类的代码，
而且如果第一个指令写这个，也会一直卡在第一个那里，进行动态监听文件的改变，而不会进行下一个指令
所以使用--watch也不行，会卡住，因此只能使用ts-node-dev模块，类似nodemon一样，不过浏览器不会自动刷新

## 3、新建github仓库，并上传
在github上直接新建仓库

git init 新建git本地仓库

然后新建 .gitignore文件，把node_modules放进去

git branch -m main 切换master到main ， 现在github默认为main，git默认是master

添加默认远程仓库地址
git remote add origin git@github.com:voiceu-zuixin/node_ts_server.git

git add . 添加到暂存区

git commit < message > 提交改次更改信息

git push origin main 推送第一次代码到远程仓库



