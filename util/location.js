module.exports = {
  onCreation: function ( req, next ) {
    var $this = this
      , location = {
        href : this.url.href
        , hash : this.url.hash
        , query : this.url.search
        , host : this.url.host
        , protocol : this.url.protocol
        , reload : function(force) {
          $this.load( $this.location )
        }
        , assign : function(url) {
          $this.load( url )
        }
        , replace : function(url) {
          $this.load( url )
        }
      }
      location.toString = function() {
        return String($this.location.href)
      }
    this.location = location
    var load = function ( url ) {
      console.log ("now loading ... "+url)
      $this.addListener( "unload", function() {
        //console.log("CLOSING CURRENT SESSION")
        var sandbox = $this.client( "GET", url )
        sandbox.client = $this.client
      } )
      $this.emit( "unload" )
      if( $this.response ) $this.response.connection.destroy()
    }
    this.load = load
    if ( this.sandbox ) {
      //todo fix sandbox.location setter
      //this.sandbox.location = location
      Object.defineProperty(this.sandbox,"location",{
          get:function(){
            return $this.location
          }
        , set:function(url){
          location.assign(url)
        }
      } )
    }
    next()
  }
  , onResponse : function (res, next) {
    console.log("REDIRECT='"+res.headers.location+"'")
    if(res.headers.location) {
      //TODO:Fails on large urls
      this.location.assign(res.headers.location)
    }
    else next()
  }
}