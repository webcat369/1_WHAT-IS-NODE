//博客相关的方法

//引入处理sql语句的文件
const { execSQL } = require('../db/mysql')

//获取博客列表的数据
const getList = (auther, keyword) => { //假装用auther,keyword参数请求数据库，拿到了数据
  //定义sql语句
  let sql = `select * from blogs where 1=1 `;

  if(auther){
    sql += `and auther='${auther}' `
  }

  if(keyword){
    sql += `and title like '%${keyword}%'`
  }

  // console.log('sql:',sql)

  //执行sql语句返回promise对象
  return execSQL(sql)

  //应该从数据库中拿数据
  //条件有限，所以先返回假数据
  // return [
  //   {
  //     id: 1,
  //     title: '标题1',
  //     content: '内容1',
  //     auther: 'zhangsan',
  //     createdAt: 1615281910981
  //   },
  //   {
  //     id: 2,
  //     title: '标题2',
  //     content: '内容2',
  //     auther: 'lisi',
  //     createdAt: 1615281950393
  //   }
  // ]

}

//获取博客详情的数据
const getDetail = (id) => {
  //定义sql语句
  const sql = `select * from blogs where id='${id}'` 

  //执行sql语句返回promise对象
  return execSQL(sql).then(rows => { //rows返回的是符合传入id的数组
    // console.log('rows',rows)
    return rows[0]
  })


  //先返回假数据
  // return [
  //   {
  //     id: 1,
  //     title: '标题1',
  //     content: '内容1',
  //     auther: 'zhangsan',
  //     createdAt: 1615281910981,
  //     detail: '详情咨询'
  //   }
  // ]
}

//创建新的博客
const createNewBlog = (blogData = {}) => { //blogData作为新博客的数据
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createdAt = Date.now(); //13位的秒数作为创建时间

  const sql = `
    insert into blogs (title, content, auther, createdAt) values ('${title}', '${content}', '${author}', '${createdAt}')
  `

  return execSQL(sql).then(insertedResult => {
    // console.log('insertedResult',insertedResult)
    return {
      id:insertedResult.insertId
    }
  })
  //假设将blogData中的title和content保存到数据库中，并返回保存这条数据的id
  //假设拿到返回的id
  // console.log('blogData:', blogData)
  // return {
  //   id: 1
  // }

}

//更新博客
const updateBlog = (id, blogData = {}) => {//http://localhost:5000/api/blog/update?id=12传入要修改的博客id
  // console.log('id:', id)
  // console.log('blogData:', blogData)

  const title = blogData.title
  const content = blogData.content

  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`

  return execSQL(sql).then(updateResult => {
    console.log('updateResult',updateResult)
    if(updateResult.affectedRows > 0){
      return true
    }
    return false
  })
  //假设，更新成功返回布尔值
  // return true
}

//删除博客
const deleteBlog = (id,author) => {//只能删除自己博客里的数据
  // console.log('id:', id)

  const sql =  `delete from blogs where id=${id} and author='${author}'`

  return execSQL(sql).then(deleteResult => {
    console.log('deleteResult',deleteResult)
    if(deleteResult.affectedRows > 0){
      return true
    }
    return false
  })

  //假设删除数据库中数据成功，返回true
  // return true
}

module.exports = {
  getList,
  getDetail,
  createNewBlog,
  updateBlog,
  deleteBlog
}