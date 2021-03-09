const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req,res)=>{
  if(req.method === 'POST'){
    let postData = ''
    //流 stream
    req.on('data',chunk => {
      //chunk是从客户端一点一点流向服务端的数据
      //cuhnk数据是二进制格式的，所以要用toString转化成字符串
      postData += chunk.toString()
    })

    req.on('end',() => {
      console.log('postData:',postData)
      res.end('数据发送完毕')
    })

    // 打印post请求发送数据的格式
    console.log('post data content type:',req.headers['content-type'])
  }
})

server.listen(5000,()=>{
  console.log('server running at port 5000')
})