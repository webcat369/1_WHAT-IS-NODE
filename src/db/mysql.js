const mysql = require('mysql')
//引入mysql的配置文件
const { MYSQL_CONFIG } = require('../config/db')

//创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG);

//开始连接
connection.connect();

//执行 sql 语句
// const sql = `select * from blogs`;
// const sql = `insert into blogs (title, content, auther, createdAt) values ('标题5', '内容5', 'wangwu', 12345670555);`;
// const sql = `update blogs set title='标题5' where content='内容1';`;
// connection.query(sql,(err,result) => {
//   if(err){
//     console.log('err:',err)
//     return
//   }
//   console.log('result:',result)
// })


//执行 sql 语句
// function execSQL(sql, callback) {
//   connection.query(sql, callback)
// }

/*
优化：如果需要拿到execSQL回调函数中的结果result去做更多的事情，就可能出现回调地狱
      console.log('result:',result)
解决：利用promise形式优化execSQL方法
*/
//重写execSQL方法
function execSQL(sql) {
  let promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}

module.exports = {
  execSQL
}