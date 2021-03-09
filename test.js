/*
  1.认识HTTP请求？
  * DNS解析(将域名解析出对应远程服务器的IP地址)，建立TCP连接(三次握手)，发起HTTP请求
  * 服务端接收到HTTP请求，进行处理，返回数据
  * 客户端接收返回数据，处理数据(例如渲染页面)

  分析服务端如何处理HTTP请求？
  2.处理GET请求？
  * get.js文件记录如何在node这种处理get请求(例如如何获取url中的参数)

  3.处理POST请求？
               客户端(桶)-----水管-----服务端(桶)
  GET请求：                 <----
                           获取数据

  POST请求：                ---->
                           发送数据
  * post.js文件记录如何在node这种处理post请求
  
  4.Node服务器处理HPPT请求的开发思路？
  * index.js文件记录如何处理HTTP请求的思路

  5.搭建开发环境(小的博客项目)
  * 初始化package.json文件 npm init -y
  * 创建bin文件，在其中创建www.js文件，为项目启动会执行的文件
  * 创建app.js文件作为服务器业务代码的文件(例如：响应的格式，获取cookie，获取get/post，解析get/post等)，引入到www.js文中
  * 创建好node服务器后，在package.json文件中修改配置:
  * 1.修改main:'bin/www.js'项目启动首次要执行的文件
  * 2.安装nodemon插件，npm install nodemon --D 可以自动的在服务端代码改变时重新执行最新的服务端代码
  * 3.修改执行命令下的启动项目的首次执行文件
  * 终端中输入：npm run dev
  
  6.初始化路由(开发接口)
  新建src目录下的routes/blog.js文件定义博客相关的路由

  7.开发第一个路由(博客相关的路由)
  * 使路由接口返回的数据更加规范-> 新建model目录下的responseModel.js文件，定义请求成功和失败返回的数据格式
  * 获取url参数(?auther=xxx&keyword=xx)中关键字对应的列表数据(方法)-> 新建controllers目录下的blog.js,定义跟博客相关的方法
*/