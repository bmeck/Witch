//function( {onCreation(req,next),onResponse(response,next),onStreaming(request,next)} || onResponse ) -> f(methods, urlobj, headers, body)

//req.method
//req.headers
//req.body
//on [end]

//res
var http = require( "http" )
  , url = require( "url" )
  , sys = require( "sys" )
  , events = require( "events" )

var createClient = exports.createClient = function createClient () {
  var onCreation = []
    , onStreaming = []
    , onResponse = []
  for ( var i = 0; i < arguments.length; i++ ) {
    var argument = arguments[ i ]
    if ( argument instanceof Function ) {
      onResponse.push( argument )
    }
    else {
      if ( "onCreation" in argument ) {
        onCreation.push( argument.onCreation )
      }
      if ( "onStreaming" in argument ) {
        onStreaming.push( argument.onStreaming )
      }
      if ( "onResponse" in argument ) {
        onResponse.push( argument.onResponse )
      }
    }
  }
  return function ( method, urlobj, headers, body ) {
    urlobj = url.parse( urlobj )
    if(!urlobj.protocol) {
      urlobj.protocol = "http:"
      urlobj.hostname = urlobj.pathname
      urlobj.pathname = null
    }
    var closure = new events.EventEmitter
    closure.url = url.parse( url.format( urlobj ) )
    var req = {
        headers : headers, method : method, body : body
      }
      , i = 0
      , sendRequest = function sendRequest() {
        var path = url.parse( url.format( closure.url ) )
          path = ( path.pathname || "/" ) + ( "search" in path ? path.search : "" )
        console.log(req.method + " " + path)
        console.log(sys.inspect(req.headers))
          var secure = (closure.url.protocol || "").toLowerCase() == "https:"
          var request = http.createClient(
            closure.url.port || (secure?443:80)
            , closure.url.hostname || "localhost"
            , secure
          )
          .request(
            req.method || "GET"
            , path || "/", req.headers
          )
//          console.log("HTTPS?:"+((closure.url.protocol || "").toLowerCase() == "https:" ))
          request.connection.addListener( "secure",function() {console.log("SECURED")} )
//           console.log([
//             closure.url.port || 80
//             , closure.url.hostname || "localhost"
//             , (closure.url.protocol || "http:").toLowerCase() == "https:"
//           ].join(','))
//           console.log([
//             req.method || "GET"
//             , path || "/", JSON.stringify(req.headers)
//           ].join(','))


          request.addListener( "response", function next( response ) {console.log("RESPONSE!")
            i = 0
            if ( onResponse.length ) onResponse[ 0 ].call( closure, response, function next() {
              i++
              if ( i >= onResponse.length ) {
                return
              }
              onResponse[ i ].call( closure, response, next )
            } )
          } )


          if( ! onStreaming.length ) request.end("body" in req ? req.body : undefined)
          else {
            i = 0
            onStreaming[ 0 ].call( closure, request, function next() {
              i++
              if ( i >= onStreaming.length ) {
                if(request.connection.readystate !== 'closed') request.end()
                return
              }
              else onStreaming.call( closure, request, next )
            } )
          }
        }
    if ( onCreation.length ) onCreation[ 0 ].call( closure, req, function next() {
        i++
        if ( i >= onCreation.length ) {
          sendRequest()
        }
        else onCreation[ i ].call( closure, req, next )
      } )
    else sendRequest()
    return closure
  }
}