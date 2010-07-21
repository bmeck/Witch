var Script = process.binding( 'evals' ).Script
  , sys = require( "sys" )
module.exports = function ( res, next ) {
  var stdin = process.stdin ? process.stdin : process.stdin = process.openStdin()
    , sandbox = this.sandbox
    , repl = function ( data ) {
      try {
        var result = Script.runInNewContext( "with(window){"+data+"}", sandbox )
        console.log( sys.inspect(result) )
      }
      catch ( e ) {
        console.log( e.stack )
      }
    }
  this.repl = repl
  this.addListener( "unload", function() {
    stdin.removeListener( "data", repl )
  } )
  stdin.addListener( "data", repl )
  next()
}