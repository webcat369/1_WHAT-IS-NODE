const { SuccessModel, ErrorModel } = require('../model/responseModel')
const { 
  getList,
  getDetail,
  createNewBlog,
  updateBlog,
  deleteBlog } = require('../controllers/blog')

// //引入处理sql语句的文件
// const { execSQL } = require('../db/mysql')

//处理博客相关的路由处理
const handleBlogRoute = (req,res) => {
  //定义处理路由的逻辑
  const method = req.method 
  //优化下面获取路径的代码
  // const url = req.url
  // const path = url.split('?')[0]

  //获取更新博客的id
  const id = req.query.id
  //新增博客的内容
  const blogData = req.body

  //新增博客列表路由
  if(method === 'GET' && req.path === '/api/blog/list'){
    // const sql = `select * from blogs;`
    // execSQL(sql,(err,result) => {
    //   if(err){
    //     console.log('err:',err)
    //     return
    //   }
    //优化：如果需要拿到execSQL回调函数中的结果result去做更多的事情，就可能出现回调地狱
    //   console.log('result:',result)
    // })

    //利用promise形式优化execSQL方法
    // execSQL(sql).then(result => {
    //   console.log('result:',result)
    // })


    ///api/blog/list?auther=zhangsan&keyword=123
    //new SuccessModel()
    const auther = req.query.auther || ''
    const keyword = req.query.keyword || ''

    //通过getList方法拿到auther和keyword关键字对应的列表数据
    const listDataPrmise = getList(auther,keyword)
    
    return listDataPrmise.then(listData => {
      // console.log('listData',listData)
      return new SuccessModel(listData)
    })

    // return {
    //   message:'获取博客列表相关数据'
    // }
  }
  
  //博客详情路由
  if(method === 'GET' && req.path === '/api/blog/detail'){
    //改造前
    // const detailData = getDetail(id)
    // return new SuccessModel(detailData)
    // return{
    //   message:'获取博客详情的接口'
    // }

    //改造后
    const detailDataPromise = getDetail(id)
    return detailDataPromise.then(detailData => {
      // console.log('detailData',detailData)
      return new SuccessModel(detailData)
    })

  }

  //新建博客路由
  if(method === 'POST' && req.path === '/api/blog/new'){
    // const newBlogData = createNewBlog(blogData)
    // return new SuccessModel(newBlogData)
    // return{
    //   message:'新建博客的接口'
    // }

    //改造后
    //新增博客用户可以编写title、content，但是author是登录的用户的名字，因为我们现在没有登录，就先编写假数据
    const author = 'zhangsan'
    req.body.author = author 
    const newBlogDataPromise = createNewBlog(blogData)
    return newBlogDataPromise.then(newBlogData => {
      // console.log('newBlogData',newBlogData)
      return new SuccessModel(newBlogData)
    })
  }

  //更新博客路由
  if(method === 'POST' && req.path === '/api/blog/update'){
    // console.log(req.body) //{ title: '标题', age: 21, content: '1' }

    //1.更新哪篇博客 2.更新博客的什么内容
    const updateBlogDataPromise = updateBlog(id,blogData)

    return updateBlogDataPromise.then(updateBlogData => {
      // console.log('updateBlogData',updateBlogData) 更新成功返回true
      if(updateBlogData){
        return new SuccessModel('更新博客成功！')
      }else{
        return new ErrorModel('更新博客失败...')
      }
    })
   
    // return{
    //   message:'更新博客的接口'
    // }
  }

  //删除博客路由
  if(method === 'POST' && req.path === '/api/blog/delete'){
    //假设获取到登录的用户名称
    const author = 'zhangsan'
    const deleteBlogDataPromise = deleteBlog(id,author)

    return deleteBlogDataPromise.then(deleteBlogData => {
      if(deleteBlogData){
        return new SuccessModel('删除博客成功！')
      }else{
        return new ErrorModel('删除博客失败...')
      }
    })
    
    // return{
    //   message:'删除博客的接口'
    // }
  }

}

module.exports = handleBlogRoute