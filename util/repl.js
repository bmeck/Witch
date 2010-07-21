var Script = process.binding( 'evals' ).Script
module.exports = function ( res, next ) {
  var stdin = process.stdin ? process.stdin : process.stdin = process.openStdin()
    , sandbox = this.sandbox
    , repl = function ( data ) {
      try {
        Script.runInNewContext( data, sandbox )
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