//异步读取文件数据的Demo

//node的核心模块fs，用来读取文件
const fs = require('fs')
//node的核心模块path
const path = require('path')

//读取文件内容
function getFileContent(filename,callback){//文件名，回调函数
//1.数据文件的绝对路径(拿到index.js所在的promise-demo的目录)
const fullFilename = path.resolve(__dirname,'data',filename)

fs.readFile(fullFilename,(err,data) => {
  //异常
  if(err) {
    console.log(err)
    return
  }

  //正常情况
  // console.log(data.toString()) //json字符串
  callback(
    JSON.parse(data.toString())
  )
})

}

//回调地狱
getFileContent('a.json',(aData) => {
  // console.log('aData',aData.message)
  console.log('aData:',aData)
  getFileContent(aData.next, (bData) => {
    console.log('bData:',bData)
    getFileContent(bData.next, (cData) => {
      console.log('cData:',cData)
    })
  })
})
