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

  7.开发第一个路由(博客相关的获取列表路由)
  * 使路由接口返回的数据更加规范-> 新建model目录下的responseModel.js文件，定义请求成功和失败返回的数据格式
  * 获取url参数(?auther=xxx&keyword=xx)中关键字对应的列表数据(方法)-> 新建controllers目录下的blog.js,定义跟博客相关的方法
  
  8.处理异步代码
  * promise-demo目录下的index.js文件，用传统的方式演示了异步读取文件数据；promise.js文件用promise来优化了异步请求造成的回调地狱的问题；
  * 处理post请求时，发送给服务器的数据是异步的过程，所以会用到promise来获取post请求发送来的数据，也方便后期维护
  
  9.处理POST数据
  * 在app.js中定义getPostData方法利用promise处理post请求发送的异步数据
  * 并在处理博客相关路由之前调用getPostData方法，但由于处理post请求数据是异步的，在getPostData方法还没有执行完毕时后面的代码就会执行
  * 所以将处理博客相关的路由的方法和未匹配到人任何路由就报404的方法放入.then()的postData回调函数中执行
  
  10.新建、更新、删除博客
  * 定义createNewBlog，updateBlog，deleteBlog方法分别进行创建新的博客、更新博客和删除博客操作

  @安装MySQL教程:https://www.cnblogs.com/winton-nfs/p/11524007.html#_caption_0
  开启服务：net start mysql
　关闭服务：net stop mysql
  登录mysql：mysql -u root -p
　Enter PassWord：(密码)-> root

  11.使用MySQL增，查
    -- 要使用哪个数据库
    -- use myblog;

    -- 展示要显示的数据表
    -- show tables;

    -- 向blogs表中插入一条数据（新增）
    -- insert into blogs (title, content, auther, createdAt) values ('标题4', '内容4', 'lisi', 12345670666);

    -- 查看全表
    -- select * from blogs;

    -- 查看表中的某几列数据
    -- select id, auther from blogs;

    -- 查看符合某个条件的数据
    -- select * from blogs where title='标题1';

    -- 查看符合多个条件的数据
    -- select * from blogs where title='标题1' and auther='zhangsan';
    -- select * from blogs where title='标题1' or auther='zhangsan';

    -- 模糊查询（查出包含符合条件的所有数据）
    -- select * from blogs where auther like '%zhang%';

    -- 将查出来的数据按id排序（默认顺序）
    -- select * from blogs where auther like '%zhang%' order by id;
    -- 倒序
    -- select * from blogs where auther like '%zhang%' order by id desc;

  12.使用MySQL改，删
    -- 根据条件修改数据
    -- update blogs set title='标题3' where content='内容1';
    -- 将安全模式关闭
    -- SET SQL_SAFE_UPDATES = 0;

    -- 删除符合条件的数据
    -- delete from blogs where title='标题4';

    -- 软删除：在表中新增state字段（INT）定义默认值为1，当state为0时，这条数据不可用，不会显示。
    -- 查看表blogs中所有state字段为1的数据
    -- select * from blogs where state='1'; 
    -- 将要删除的数据state字段改为0，该数据不可用就不会显示
    -- update blogs set state='0' where auther='zhangsan';
    -- 再次查看
    -- select * from blogs where state='1';
    -- 不等于0 <>0
    -- select * from blogs where state<>0;
  
  13.node.js连接MySQL
  * 新建mysql-demo目录做连接演示
  * 在mysql-demo目录内新建index.js文件，并进入mysql-demo目录终端初始化Demo：npm init -y 生成package.json文件
  * 并安装mysql:npm install mysql
  * 接着在index.js文件中执行下面五个步骤：->引入mysql->创建连接对象->开始连接->执行 sql语句->关闭连接；
  
  14.封装执行sql语句的工具函数
  * 在src目录下新建db目录下mysql.js创建MySQL相关的数据库的文件
  * 在博客项目目录下安装MySQL：npm install mysql
  * 在mysql.js文件中执行下面五个步骤：->引入mysql->创建连接对象->开始连接->封装执行 sql语句的方法->导出处理sql语句的方法；
  * 利用promise优化封装的处理sql语句的execSQL方法，避免如果需要拿到execSQL回调函数中的结果result去做更多的事情，就可能出现回调地狱，不利于代码读取和后期维护
  
  15.获取博客类表接口 对接MySQL
  * 改造：将routes目录下blog.js文件中引入的execSQL方法移入到controllers目录下blog.js文件中，因为这个文件才是返回数据的地方
  * 在controllers目录下blog.js文件的 对应获取博客数据方法中 定义sql语句，并调用execSQL方法执行sql语句，并 return execSQL方法，返回promise对象
  * 在routes目录下的blogs.js文件中的新增博客列表路由中 获取到返回的promise对象(listDataPrmise)，并在listDataPrmise的.then()方法中获取到新增博客列表的数据（listData）
  * 将return new SuccessModel(listData)放入到listDataPrmise.then()中执行，会返回SuccessModel对象，我们最终使用到这个对象的地方是handleBlogRoute（也就是处理博客相关的路由方法）使用的地方
  * 也就是app.js文件中，所以想要在app.js文件中获取到return new SuccessModel(listData)返回的对象，就需要return listDataPrmise.then(...)的结果，所以app.js中的handleBlogRoute返回的结果就是SuccessModel的promise对象
  * 然后获取handleBlogRoute返回的promise对象，并用.then()拿到blogData(也就是返回的SuccessModel对象)
*/