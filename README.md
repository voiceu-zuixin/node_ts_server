# 介绍

用 express+ts+webpack+mySQL 来写一个简单的 http 服务器，为了学习 node、ts 和 mySQL

# 可以练习如下能力

1、用 webpack 来搭建项目的环境
2、配置 ts 的环境
3、配置代码规范，eslint、prettier、git husky、commitizen 等
4、练习 git 的一些命令
5、练习 axios 请求、跨域等
6、还需要一个前端页面来进行交互，来结合练习 axios 请求这些，proxy 配置，nginx 等代理
7、学习 mySQL

# ps：

但其实 node 作后端好像不需要最后转成 es5，因为不用在浏览器上运行，
所以 webpack 以及 ts 的作用是练习、以及练习配置，也是为了规范代码质量，毕竟有 ts 的类型约束

# 步骤

## 1、用 webpack 配置 ts 能运行的环境

`npm i webpack webpack-cli webpack-dev-server typescript ts-loader -D`
配置 webpack.config.js
配置 package.json 的 script build/serve

## 2、配置 node 的 ts 环境

`tsc --init`生成 tsconfig.json
安装 node 的 ts 类型声明文件 网址： https://www.typescriptlang.org/dt/search?search=node
webpack 仅仅是用来打包的，而 ts 想要运行 node，需要的是 ts-node，
如果想动态运行，类似 nodemon，则需要 ts-node-dev

所以我这里把 start 脚本写成 ts-node-dev 的相关命令，而不是 webpack，
后面再试试能不能用 webpack 实现运行 ts 的 node

node 与@types/node 的版本不同，导致 require('http')无法识别到，应该是这个原因，可惜后面发现不是主要问题
这个确实会导致当前的 require 不能链接到 http 的类型声明文件，但是换成低版本，依旧不行
只能是 import 导入 http 才可以链接进去

不过不论是哪种方式，webpack 都不能正常打包，直接使用 ts-node 来运行 main.ts 倒是可以打开服务器

我这里就杠上了，非要用 webpack 来打包，后面找到了，是 webpack.config.js 里面要把 target 写成 node
然后就可以打包了，之后使用 node 运行打包的 js 文件即可，为了方便，把脚本直接二合一
"serve": "webpack && node ./dist/bundle.js"
但是这样，无法动态的进行修改后打包并运行，因为是两个命令连着，
webpack-dev-server 是通过 express 进行搭建服务器的，如果用这个命令，就是在搭好的服务器上，执行搭建服务器的代码，矛盾了，这上面是要执行一些 html 或者 js 之类的代码，
而且如果第一个指令写这个，也会一直卡在第一个那里，进行动态监听文件的改变，而不会进行下一个指令
所以使用--watch 也不行，会卡住，因此只能使用 ts-node-dev 模块，类似 nodemon 一样，不过浏览器不会自动刷新

## 3、新建 github 仓库，并上传

在 github 上直接新建仓库

git init 新建 git 本地仓库

然后新建 .gitignore 文件，把 node_modules 放进去

git branch -m main 切换 master 到 main ， 现在 github 默认为 main，git 默认是 master

添加默认远程仓库地址
git remote add origin git@github.com:voiceu-zuixin/node_ts_server.git

git pull origin main --allow-unrelated-histories 拉取远程仓库的证书文件，这样才可以一起提交

git add . 添加到暂存区

git commit -m 'message' 提交改次更改信息

git push -u origin main 推送第一次代码到远程仓库

## 4、配置代码规范

1、 .editorconfig 让不同的编辑器遵循统一的标准，vscode 需要安装插件，webstorm 不用额外安装插件
目的是让多个开发人员维护一致的编码风格

2、 prettier 代码格式化工具，有点像 option+shift+f 快捷键，但是更强大，个人感觉和 editorconfig 有点类似
npm i prettier -D

创建 .prettierrc 指定规则
useTabs：使用 tab 缩进还是空格缩进，选择 false；
tabWidth：tab 是空格的情况下，是几个空格，选择 2 个；
printWidth：当行字符的长度，推荐 80，也有人喜欢 100 或者 120；
singleQuote：使用单引号还是双引号，选择 true，使用单引号；
trailingComma：在多行输入的尾逗号是否添加，设置为 none ；
semi：语句末尾是否要加分号，默认值 true，选择 false 表示不加；

创建 .prettierignore 指定忽略文件

安装 prettier 插件
要在编辑器里面设置，勾选 Format On Save

编辑脚本也可以进行所有文件一键格式化
"prettier": "prettier --write ."

3、 eslint 代码规范
npm i eslint -D
npx eslint --init 根据提示一步一步生成 .eslintrc.js
注意要把.eslintrc.js文件放进 .prettierignore里面，不然这里面都得让你修改格式

eslint --fix 命令可以进行修复

4、 git husky
在代码提交的时候，进行校验，之前的步骤是保证编写的时候要符合规则，但是不妨碍，不规则的代码进行提交
这个工具就可以在提交的时候强行进行校验，不符合eslint的就不能进行提交
配置脚本 ，意思是扩展名是  .js .ts 在src目录下的所有该类型文件，运行该命令可以修复这些文件
"lint": "eslint --fix --ext .js,.ts src"
.husky文件夹下的pre-commit修改 npm run lint

之后，commit代码的时候，会自动进行检测规范，并修复

实验证明，是检测修复了，但是提交的是之前的代码，不会把最新修正的代码一起add 和 commit
