const querystring = require('querystring')

const handleBlogRoute = require('./src/routes/blog')

//处理POST数据
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }

    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }

    let postData = ''

    req.on('data', (chunk) => {
      postData += chunk.toString()
    })

    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })

  return promise
}

const serverHandler = (req, res) => {
  //设置响应格式
  res.setHeader('Content-Type', 'application/json')

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

  //处理POST数据(这里是异步过程)
  getPostData(req).then((postData) => {
    req.body = postData

    //博客相关的路由
    const blogDataPromise = handleBlogRoute(req, res)
    if (blogDataPromise) {
      blogDataPromise.then(blogData => {
        // console.log('blogData',blogData)
        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }

    //未匹配到handleBlogRoute中的任何路由就返回404
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.write('404 Not Found')
    res.end()
  })

}

module.exports = serverHandler