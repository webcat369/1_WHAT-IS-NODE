const { SuccessModel } = require('../model/responseModel')
const { getList } = require('../controllers/blog')

//处理博客相关的路由处理
const handleBlogRoute = (req,res) => {
  //定义处理路由的逻辑
  const method = req.method 
  //优化下面获取路径的代码
  // const url = req.url
  // const path = url.split('?')[0]

  if(method === 'GET' && req.path === '/api/blog/list'){
    ///api/blog/list?auther=zhangsan&keyword=123
    //new SuccessModel()
    const auther = req.query.auther || ''
    const keyword = req.query.keyword || ''
    //通过getList方法拿到auther和keyword关键字对应的列表数据
    const listData = getList(auther,keyword)
    return new SuccessModel(listData)

    // return {
    //   message:'获取博客列表相关数据'
    // }
  }

  if(method === 'GET' && req.path === '/api/blog/detail'){
    return{
      message:'获取博客详情的接口'
    }
  }

  if(method === 'POST' && req.path === '/api/blog/new'){
    return{
      message:'新建博客的接口'
    }
  }

  if(method === 'POST' && req.path === '/api/blog/update'){
    return{
      message:'更新博客的接口'
    }
  }

  if(method === 'POST' && req.path === '/api/blog/delete'){
    return{
      message:'删除博客的接口'
    }
  }

}

module.exports = handleBlogRoute