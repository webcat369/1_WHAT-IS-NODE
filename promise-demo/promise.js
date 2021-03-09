//利用promise优化--异步读取文件数据的Demo中回调地狱问题

//node的核心模块fs，用来读取文件
const fs = require('fs')
//node的核心模块path
const path = require('path')

//promise 实现
function getFileContent(filename) {//文件名称
  const promise = new Promise((resolve, reject) => {
    //获取数据文件绝对路劲
    const fullFilename = path.resolve(__dirname, 'data', filename)

    fs.readFile(fullFilename, (err, data) => {
      //异常
      if (err) {
        reject(err)
        return
      }

      //正常情况
      // console.log(data.toString()) //json字符串
      resolve(
        JSON.parse(data.toString())
      )
    })
  })
  return promise
}

getFileContent('a.json').then((aData => {
  console.log('aData:',aData)
  return getFileContent(aData.next)
})).then((bData) => {
  console.log('bData:',bData)
  return getFileContent(bData.next)
}).then((cData) => {
  console.log('cData:',cData)
})