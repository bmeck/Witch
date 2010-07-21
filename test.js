var connect = require("./client_connect")
  , dns = require("./util/dns")
var client = connect.createClient(
  dns,
  function(res) {
    res.addListener("data",function(data){console.log(data)})
  }
)
client("GET","www.google.com/")