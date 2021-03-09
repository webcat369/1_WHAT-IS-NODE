const serverHandler = (req,res) => {
  res.setHeader('Content-Type','application/json')

  const responseData = {
    name:'小白',
    age:21
  }

  res.end(
    JSON.stringify(responseData)
  )

}

module.exports = serverHandler