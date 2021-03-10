const mysql = require('mysql')

//创建连接对象
const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'123456',
  port:3306,
  database:'myblog'
});
 
//开始连接
connection.connect();

//执行 sql 语句
// const sql = `select * from blogs`;
// const sql = `insert into blogs (title, content, auther, createdAt) values ('标题5', '内容5', 'wangwu', 12345670555);`;
const sql = `update blogs set title='标题5' where content='内容1';`;
connection.query(sql,(err,result) => {
  if(err){
    console.log('err:',err)
    return
  }
  console.log('result:',result)
})

//关闭连接
connection.end();
