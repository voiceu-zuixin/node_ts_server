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

注意：Node 模块解析是 TypeScript 社区中最常用的，推荐用于大多数项目。 如果您在 TypeScript 中遇到导入和导出的解析问题，请尝试设置 moduleResolution: "node" 以查看它是否解决了问题。

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

insert_final_newline = false # 始终在文件末尾插入一个新行
该选项设置为 true，会让人在最后一行打字的时候出现频闪，因为非要给你加一个空行，你又在中文打字，很难受
建议为 false

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
注意要把.eslintrc.js 文件放进 .prettierignore 里面，不然这里面都得让你修改格式

eslint --fix 命令可以进行修复
配置脚本 ，意思是扩展名是 .js .ts 在 src 目录下的所有该类型文件，运行该命令可以修复这些文件
"lint": "eslint --fix --ext .js,.ts src"

4、 git husky
在代码提交的时候，进行校验，之前的步骤是保证编写的时候要符合规则，但是不妨碍，不规则的代码进行提交
这个工具就可以在提交的时候强行进行校验，不符合 eslint 的就不能进行提交
配置脚本 ，意思是扩展名是 .js .ts 在 src 目录下的所有该类型文件，运行该命令可以修复这些文件
"lint": "eslint --fix --ext .js,.ts src"
.husky 文件夹下的 pre-commit 修改 npm run lint

之后，commit 代码的时候，会自动进行检测规范，并修复

测试证明，是检测修复了，但是提交的是之前的代码，不会把最新修正的代码一起 add 和 commit
理一下思路，为什么修改后的代码没有被一起提交，

具体情景：
1、我把错误代码写好；
2、git add.
3、git commit -m 'test-wrong-code'
4、代码提交前自动检测、并修改、随后自动 commit
5、发现修改完成的代码出现在 vscode 的更改之下，连暂存区都不是，更别说提交修改后的代码

分析原因：
husky 的作用，是在 git 命令时触发 hook，自动执行预设指令，
此处预设 pre-commit 命令，指令是 npm run lint
再看看 lint "lint": "eslint --fix --ext .js,.ts src"
只有 fix 命令，所以推断，执行完 fix 命令后，没有后续指令，便直接 commit 了，并没有把 fix 后的代码 add 进暂存区，
因此可以尝试加一条 git add .的指令，使用&&，表示按序执行，&表示并列执行
"lint": "eslint --fix --ext .js,.ts src && git add ."

但是要考虑一下代码出错的情况，代码出错的时候应该是直接提醒，并中断后续操作
测试证明，出现错误后，不管加不加 && git add . 指令，都能将可以修改的不规范修改了，
比如空格换行，然后加入暂存区，但是还会进行第二次修改，发现那些无法修改的，修改不了，便没有放进暂存区
然后直接就中断了命令，似乎目的已经达成，遇到无法修改的问题，是要人为来修改，再次提交
所以这里的暂存区不暂存区问题也不大，因为还得修改，还得再放进去，再检测提交

但是如果只是简单的格式错误，那么，还是建议把 git add . 加上，这样自动修复后，可以自己加进去，一并提交

才发现‼️，这样不好，因为简单错误，在经过 fix 之后，只能是把空格之类的修改
类似 const aaas: string = 1，把 number 给 string 的类型错误，即便是错误的，如果加上 git add .
就会一并提交，
而且之前看到的，比如出现简单错误，fix 之后没有提交，也仅仅只是这个需要修改的文件，其他没有语法错误的文件
修改之后是可以成功提交的，

测试显示不加 git add . 也可以提交， 我傻了，

分情况讨论
1、有错误，但能改，仅仅只是空格这种问题  
 想让这种情况自动修改后进入暂存区一并提交

2、有错误，不仅是空格这种，还有类型等问题  
 想让这种情况自动修改能修改的内容后，不进入暂存区，让开发者自己再次修改，而其他文件自动排查无误后提交

测试情况如下
都修改了，其他文件也提交了，但是目标错误文件，只是修改到警告，比如把 let 改成了 const，但是还是提醒我，这个值没有用过，然后依旧没有放在暂存区

所以测试一下完全没问题的情况，看看能不能一起修改并提交
测试结果，一个本身是 warning 的，但没格式问题，比如没有用该值，另一个修改后完全没问题的，结果只有修改后完全没问题的没有被提交，这啥啊，摸不清规律，这种情况看来还是要加 git add .的，方便

这种情况结论是：只要你修改了，然后加入暂存区，提交的时候进行检测并修复，但只能修复空格等基础错误，只要修改了，就会把这些修改后的（有可能已经没错误了，但你希望一次性提交，有可能还有类型错误等需要人为调整的），全部不管，相当于下一次修改，也不放进暂存区，然后把这次提交的剩余没问题的提交了，
但是如果你不管三七二十一，也不修改这些已经经过 eslint 初步修改之后依旧不行的文件，再次原封不动的提交，因为刚刚已经说了嘛，它会修改之后啥也不干，所以在 vscode 里是能看到被修改的，然后你 add 后 commit，这第二次就不会有任何警告，直接就能全部提交了，我也很迷糊，明明在编辑器里面还能看到红色的错误，却可以再次提交完成
提示：在这里的错误有赋值未使用，还有把 string 赋值给 number，其他错误还没试

明白了，报错如下，刚刚说的那个问题，其中赋值未用，是 ts 报错，eslint 指报警告，所以编辑器是飘红的，但是 eslint 是检测不出错误的，所以，看看能不能把这个规则添加进 eslint 配置里

编辑器中报错如下：
const aaas: number
已声明“aaas”，但从未读取其值。ts(6133)
不能将类型“string”分配给类型“number”。ts(2322)
'aaas' is assigned a value but never used. eslint(@typescript-eslint/no-unused-vars）

找了一下，好像没有那些配置，所以这个只能在编写的时候就自己注意，

所以再次测试如下案例（未加 && git add . )
//这里是 ts 报错，当只有 ts 报错的时候，eslint 是检测不到的，所以可以直接提交

const aaa: any[] = 1

//测试成功

//这里是 ts 报错，还有 eslint 报错的空格不标准等原因，提交时，会修改 eslint 的检测错误，但是 ts 的不行
//在 eslint 修改后，已经没有空格等规范问题，再次原封不动的提交，是可以提交的，虽然编辑器标红报错，这里报错的是 ts 语法问题，不是 eslint 代码不规范
//所以 ts 语法是要在编辑的时候就要注意的问题，当然编辑器是会标红的

const aab:any[]
=1;

//测试成功

// 这里是 eslint 报错，在这个报错的时候，是修改之后，再次不改动也无法提交，因为每次提交都能检测到

const http = require('http')

//测试成功

估计加上 && git add . 也是可行的，而且更方便，所以 eslint 的错误，应该要加 git add .
但是 ts 的语法错误，一定要自己在编写的时候就注意，当然会先运行一下，所以这些问题应该是不存在的，
终于搞透了，不过还是想找找有没有把这种 ts 报错的也加在 eslint 里面，总感觉是我的配置不太合格才导致这种问题

5、Commitizen
用于代码提交的时候，提交信息的格式统一
npm install commitizen -D

--save-exact 的作用就是固定依赖包的版本，不要带^或~，避免出现小版本。有利于版本统一。

npx commitizen init cz-conventional-changelog --save-dev --save-exact
然后提交的时候运行 npx cz 根据提示走就行

package.json 里面添加脚本 "commit":"cz"
以后不用运行 npx cz，也不是运行 git commit，而是直接运行 你 npm run commit

6、commitlint
限制不规范提交，刚刚的是主动的去规范提交，这个是防止不规范的提交
npm i @commitlint/config-conventional @commitlint/cli -D

根目录创建 commlit.config.js 在里面配置 commitlint

module.exports = { extends: ['@commitlint/config-conventional'] }

使用 husky 的命令生存 commit-msg 的 shell 脚本文件，最好不要自己去生成

npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"

如果运行 npx some-package --no-install，意味着告诉 npx ，它应该仅执行。

some-package，如果之前未安装，则不安装

如果想让 npx 强制使用本地模块，不下载远程模块，可以使用--no-install 参数。如果本地不存在该模块，就会报错。比如：

npx --no-install http-server

但是有点疑惑 commitlint 和 commitizen 没有什么相关的配置，为什么能够运行这个工具的提交呢
好像是都遵循着那个网上流行的提交风格，这个 conventional-changelog，好像是 angular 的

https://github.com/conventional-changelog/commitlint/#what-is-commitlint

> This is adapted from [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).
