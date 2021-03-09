//博客相关的方法
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

module.exports = {
  getList
}