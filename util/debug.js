module.exports = function( res, next ) {
  for(var property in res.headers) {
    console.log(property+" : "+res.headers[property])
  }
  res.addListener("data",function(data){console.log(String(data))})
  next()
}