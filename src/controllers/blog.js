//博客相关的方法

//获取博客列表的数据
const getList = (auther,keyword) => { //假装用auther,keyword参数请求数据库，拿到了数据
  //应该从数据库中拿数据
  //条件有限，所以先返回假数据
  return [
    {
      id:1,
      title:'标题1',
      content:'内容1',
      auther:'zhangsan',
      createdAt:1615281910981
    },
    {
      id:2,
      title:'标题2',
      content:'内容2',
      auther:'lisi',
      createdAt:1615281950393
    }
  ]

}

//获取博客详情的数据
const getDetail = (id) => {
  //先返回假数据
  return [
    {
      id:1,
      title:'标题1',
      content:'内容1',
      auther:'zhangsan',
      createdAt:1615281910981,
      detail:'详情咨询'
    }
  ]
}

//创建新的博客
const createNewBlog = (blogData = {}) => {
  //假设将blogData中的title和content保存到数据库中，并返回保存这条数据的id
  //假设拿到返回的id
  console.log('blogData:',blogData)
  return {
    id: 1
  }

}

//更新博客
const updateBlog = (id,blogData = {}) => {
  console.log('id:',id)
  console.log('blogData:',blogData)

  //假设，更新成功返回布尔值
  return true
}

//删除博客
const deleteBlog = (id) => {
  console.log('id:',id)

  //假设删除数据库中数据成功，返回true
  return true
}

module.exports = {
  getList,
  getDetail,
  createNewBlog,
  updateBlog,
  deleteBlog
}