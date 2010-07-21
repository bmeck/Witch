var path = require( "path" )
  , fs = require( "fs" )
  , url = require( "url" )
  , http = require( "http" )
  , sys = require( "sys" )
module.exports = function() {
  this.watchers = []
  this.loaders = []
  this.obtainers = []
  for ( var i = 0; i < arguments.length; i++ ) {
    var argument = arguments[i]
    if(argument.watcher) {
      watchers.push(argument.watcher)
    }
    if(argument.loader) {
      loaders.push(argument.loader)
    }
    if(argument.obtainer) {
      obtainers.push(argument.obtainer)
    }
  }
  function getDefaultWatcher( urlstr ) {
    for ( var i = 0; i < watchers.length; i++ ) {
      if ( watchers[ i ].test( urlstr ) ) {
        return watchers[ i ]
      }
    }
    return function(resource) {
      var buffer = []
      return {
        data : function (data) {
          buffer.push( data )
        }
        , end : function () {
          resource.data = buffer.join( "" )
          resource.loaded = true
        }
      }
    }
  }
  function getDefaultObtainer( urlstr, callback/*stream*/ ) {
    for ( var i = 0; i < obtainers.length; i++ ) {
      if ( obtainers[ i ].test( urlstr ) ) {
        return obtainers[ i ].hooks ( urlstr )
      }
    }
    var urlstr = url.parse( urlstr ), secure = false
    switch (urlstr.protocol) {
      case "https:":
        secure = true
      default:
      case "http:":
        var request = http.createClient(
          urlstr.port || 80
          , urlstr.hostname || urlstr.pathname|| "localhost"
          , secure
        ).request(
          "GET"
          , urlstr.hostname ? urlstr.pathname : "/"
          , {host:urlstr.hostname || urlstr.pathname|| "localhost"}
        )
        request.addListener( "response", function(response){
          if(response.statusCode >= 400) callback(new Error("Status code of "+response.statusCode+" returned"))
          else callback(false,response)
        } )
        request.end()
        return
      case "file:":
        callback( fs.readFile( urlstr.href ) )
        return
    }
  }
  function getDefaultOnLoad( url ) {
    for ( var i = 0; i < loaders.length; i++ ) {
      //console.log(loaders[ i ].test( url ))
      if ( loaders[ i ].test( url ) ) {
        return loaders[ i ]
      }
    }
    return function ( data ) {
      //console.log( "@"+url+">LOADED>"+data )
    }
  }
  return function ( res, next ) {
    var location = this.location.href
    this.resources = []
    var queue = []
      , $this = this
    queue.flush = function() {
      for ( var i = 0; i < queue.length; i++ ) {

        var resource = queue[ i ]
        if ( resource.loaded ) {
          if ( resource.onload ) resource.onload.call( $this, resource.data )
        }
        else {
          queue.splice( 0, i )
          return
        }
      }
       queue.splice( 0, queue.length )
    }
    this.queueResource = function( resource, options ) {
      //standard action is blocking
      if (typeof resource === "string") {
      location = url.parse(location)
      var resourceUrl = path.join( path.dirname(location.pathname), resource )
      resourceUrl = ((location.protocol+"//")||"http://")+(location.hostname||"")+resourceUrl+(location.search||"")
      //console.log("resource="+resourceUrl)
        var queueObj = {}, watcher
        if ( options && options.watcher ) {
          watcher = options.watcher
        }
        else {
          watcher = getDefaultWatcher( resourceUrl )
        }

       var hooks = watcher( queueObj )
       getDefaultObtainer( resourceUrl, function( err, stream ) {
         if (err) {
           return console.log("FAILED TO LOAD:"+resourceUrl+" ("+JSON.stringify(err)+")")
         }
         if ( hooks.data ) stream.addListener( "data", hooks.data )
         if ( hooks.end ) stream.addListener( "end", function() { hooks.end();queue.flush() } )
          //console.log( "loading -> " + sys.inspect(queueObj) )
        } )
       if( options && options.onload ) {
          queueObj.onload = options.onload
        }
        else {
          queueObj.onload = getDefaultOnLoad( resourceUrl )
        }
        queueObj.url = resourceUrl
        queue.push( queueObj )
      }
      else if(resource.data) {
        //console.log( "queueing -> " + resource.data )
        queue.push( {loaded:true,data:resource.data,onload:(resource.onload||getDefaultOnLoad( resource.url ))} )
      }
      queue.flush()
    }
    next()
  }
}