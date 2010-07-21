var url = require("url")
  , Script = process.binding( 'evals' ).Script
exports.loader = function(data) {
  try {
    Script.runInNewContext( "with(window){"+data+"}", this.sandbox, this.location.href )
  }
  catch(exc) {
    console.log(exc.stack)
  }
}
exports.loader.test = function(urlstr) {
  return urlstr && (url.parse(urlstr).pathname || "/").slice(-3) == ".js"
}