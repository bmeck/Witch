module.exports = {
  onCreation:function(req,next) {
    var $this = this
      , sandbox = this.sandbox = {
      alert : console.log
      , console : {
        log : console.log
        , error : console.log
        , warn : console.log
      }
      , setTimeout : setTimeout
      , setInterval : setInterval
    }
    this.sandbox.window = sandbox
    next()
  }
}