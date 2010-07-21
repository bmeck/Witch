var url = require("url")
  , Script = process.binding( 'evals' ).Script
exports.loader = function(data) {
  try {
    Script.runInNewContext( data, this.sandbox, this.location.href )
  }
  catch(exc) {
    console.log(exc.stack)
  }
}
exports.loader.test = function(urlstr) {
  return url.parse(urlstr).pathname.slice(-3) == ".js"
}