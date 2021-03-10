class BaseModel {
  constructor(data,message){
    //当传递的数据是字符串格式时，赋值给message
    if(typeof data === 'string'){
      this.message = data
      data = null
      message = null
    }
    //当传递的数据是对象格式时会直接赋值
    if(data){
      this.data = data
    }

    if(message){
      this.message = message
    }
  }
}

//成功的模型(SuccessModel extends BaseModel:成功模型继承了BaseModel)
class SuccessModel extends BaseModel {
  constructor(data,message){
    //当创建new SuccessModel的时候就会执行父类BaseModel的构造函数
    super(data,message)
    //并且在创建出来的实例里面新增属性errno(错误码),成功时设置为0
    this.errno = 0
  }
}

//失败的模型
class ErrorModel extends BaseModel {
  constructor(data,message){
    //当创建new ErrorModel的时候就会执行父类BaseModel的构造函数
    super(data,message)
    //并且在创建出来的实例里面新增属性errno(错误码),失败时设置为-1
    this.errno = -1
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}