//exposes -> response.sax
//  sax.onDirective
//  sax.onElement
//  sax.onAttribute
//  sax.onText
var EventEmitter = require("events").EventEmitter
  , htmlparser = require( "../../deps/node-htmlparser/lib/node-htmlparser.min" )
  , sys = require( "sys" )
  , handler = new htmlparser.DefaultHandler( function ( error, dom ) {
    if ( error ) {
      console.log( "ERROR : " + error )
    }
    else {
      while ( dom[ 0 ].type == "directive" || dom[ 0 ].type == "text" ) {
        dom.shift()
      }
      var path = [ dom[ 0 ] ]
        , indices = [ 0 ]
        , depth = 0
      while ( path.length ) {
        node = path[ depth ]
        //console.log(sys.inspect(node))
        if(!indices[depth]) switch(node.type) {
          case "tag":
            this.sax.emit("element",node.name)
            var attrs = node.attribs
            for(var property in attrs) {
              this.sax.emit("attribute",property,attrs[property])
            }
            break
          case "script":
            this.sax.emit("element","script")
            var attrs = node.attribs
            for(var property in attrs) {
              this.sax.emit("attribute",property,attrs[property])
            }
            if(attrs && !attrs.src) {
              this.sax.emit("text",node.children && node.children.length ? node.children[0].data : "")
            }
            break
          case "style":
            var attrs = node.attribs
            this.sax.emit("element",attrs && attrs.href ? "link":"style")
            for(var property in attrs) {
              this.sax.emit("attribute",property,attrs[property])
            }
            break
          case "text":
            this.sax.emit("text",node.data)
        }
        //iteration
        if ( node.children ) {
          if ( indices[ depth ] < node.children.length ) {
            path.push( node.children[ indices[ depth ] ] )
            indices[ depth ] += 1
            depth++
            indices[ depth ] = 0
            continue
          }
          else {
            path.pop()
            indices.pop()
            depth--
            if(node.type in {"tag":1,"script":1,"style":1}) this.sax.emit("elementEnd")
          }
        }
        else {
          path.pop()
          indices.pop()
          depth--
          if(node.type in {"tag":1,"script":1,"style":1}) this.sax.emit("elementEnd")
        }

        //parse
        if(node.type == "script") {
          if ( node.attribs && node.attribs.src ) {
            this.queueResource( node.attribs.src )
          }
          else {
            this.queueResource( {data:node.children[0].data,url:"*.js"} )
          }
        }
        if(node.type == "style") {
          if ( node.attribs && node.attribs.href ) {
            this.queueResource( node.attribs.href )
          }
          else {
            this.queueResource( {data:node.children[0].data} )
          }
        }
        //console.log(node.data)
      }
    }
  }, { enforceEmptyTags: false } )
module.exports = {
  onCreation : function (req,next) {
    this.sax = new EventEmitter
    next()
  }
  , onResponse : function (res, next) {
    var parser = new htmlparser.Parser( handler )
      , parse = function ( data ) {
        parser.parseChunk( data )
      }
      , end = function ( data ) {
        parser.done()
      }
    this.addListener( "unload", function() {
      res.removeListener( "data", parse )
      res.removeListener( "end", end )
    } )
    parser._handler.queueResource = this.queueResource
    parser._handler.sax = this.sax
    res.addListener( "data", parse )
    res.addListener( "end", end )
    next()
  }
}