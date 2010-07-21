module.exports = {
  onCreation: function ( req, next ) {
    var $this = this
      , location = {
      href : this.url.href
    }
    Object.defineProperty( this, "location", {
      get : function() {
        return location
      }
      , set: function( url ) {
        $this.load( url )
      }
    } )
    var load = function ( url ) {
      console.log ("now loading ... "+url)
      $this.addListener( "unload", function() {
        var sandbox = $this.client( "GET", url )
        sandbox.client = $this.client
      } )
      $this.emit( "unload" )
      if( $this.response ) $this.response.connection.destroy()
    }
    this.load = load
    if ( this.sandbox ) {
      Object.defineProperty( this.sandbox, "location", {
        get: function () {
          return location
        }
        , set: function ( url ) {
          load ( url )
          $this.load = null
        }
      } )
    }
    next()
  }
}