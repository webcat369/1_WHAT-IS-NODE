const http = require('http')
const querystring = require('querystring') 

//创建服务器
const server = http.createServer((req,res)=>{
  //获取请求方法
  const method = req.method
  console.log('method:',method)
  //获取请求地址
  const url = req.url
  console.log('url:',url)
  //给req新增query属性保存由querystring.parse()方法转化出的对象
  req.query = querystring.parse(url.split('?')[1])
  console.log('query:',req.query)
  //解决中文乱码问题
  res.setHeader("Content-Type","text/html;charset=UTF-8");
  // res.end('Hello 小白')

  //返回是以字符串的形式返回
  res.end(
    //返回获取到的url中的参数
    JSON.stringify(req.query)
  )
})

server.listen(5000,()=>{
  console.log('server running at port 5000')
})
//启动：node get.js