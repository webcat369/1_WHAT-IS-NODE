const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req,res)=>{
  //获取请求的方法和路由
  const method = req.method
  const url = req.url
  //获取url中的路径
  const path = url.split('?')[0]
  //获取url中的参数
  const query = querystring.parse(url.split('?')[1])


  console.log('method:',method)
  console.log('url:',url)
  console.log('path:',path)
  console.log('query:',query)

  //响应数据(返回数据)
  const responseData = {
    method,
    url,
    path,
    query
  }

  //给返回的字符串设置格式
  res.setHeader('Content-Type','application/json')

  if(method === 'GET'){
    res.end(
      JSON.stringify(responseData)
      //返回：{"method":"GET","url":"/api/list/body?name=xiaobai&age=21","path":"/api/list/body","query":{"name":"xiaobai","age":"21"}}
    )
  }

  if(method === 'POST'){
    let postData = ''

    req.on('data',chunk => {
      postData += chunk.toString()
    })

    req.on('end',() => {
      responseData.postData = postData

      res.end(
        JSON.stringify(responseData)
      )
    })
  }

  
})

server.listen(5000,() => {
  console.log('server running at port 5000')
})