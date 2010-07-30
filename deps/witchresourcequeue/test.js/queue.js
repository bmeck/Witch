var ResourceQueue=require("../ResourceQueue")
  , path = require("path")

var q = new ResourceQueue(require("../loaders/file"))
q.on("cat",function(stream,headers,ready_cb) {
  var buffer = ""
  stream.on("data",function(data){buffer+=data})
  //wait 5 seconds
  stream.on("end",setTimeout(function(){
  	ready_cb(function(){console.log(buffer)})
  },5000))
})
var file = path.join(path.dirname(__filename),"./a")
console.log(file+"?")
q.queue("file","file:/"+file,["file"])
q.queue("file","file:/"+path.join(path.dirname(__filename),"./b"),["file"])
