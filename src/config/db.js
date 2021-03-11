let MYSQL_CONFIG = {}

// 由于开发环境和生产环境下mysql的配置是不一样的，抽离配置建立单独的文件保存方便以后修改
MYSQL_CONFIG = {
  host:'localhost',
  user:'root',
  password:'123456',
  port:3306,
  database:'myblog'
}

module.exports = {
  MYSQL_CONFIG
}