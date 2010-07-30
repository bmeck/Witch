var url = require("url")
  , fs = require("fs")
module.exports = function(address,headers,content) {

  var url_obj = url.parse(address)
  //check if its a file protocol and go
  if(url_obj && url_obj.protocol && url_obj.protocol.toLowerCase()=="file:") {

    var stream = fs.open(url.pathName)
    console.log(stream)
    return stream

  }
}