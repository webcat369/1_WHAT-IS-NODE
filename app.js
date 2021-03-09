const querystring = require('querystring')

const handleBlogRoute = require('./src/routes/blog')

const serverHandler = (req,res) => {
  //设置响应格式
  res.setHeader('Content-Type','application/json')

  /*const responseData = {
    name:'小白',
    age:21
  }

  res.end(
    JSON.stringify(responseData)
  )*/
  
  //获取ur路径(path)
  const url = req.url
  req.path = url.split('?')[0]
  
  //解析url参数(query)
  req.query = querystring.parse(url.split('?')[1])
  
  //配置路由
  const blogData = handleBlogRoute(req,res)
  if(blogData){
    res.end(
      JSON.stringify(blogData)
    )
    return
  }

  //如果不是handleBlogRoute中的路由就返回404
  res.writeHead(404,{'Content-Type':'text/plain'})
  res.write('404 Not Found')
  res.end()

}

module.exports = serverHandler