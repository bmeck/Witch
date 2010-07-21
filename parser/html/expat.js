var expat = require( "../../deps/node-expat/build/default/expat" )
module.exports = function (res, next) {
  var parser = new expat.Parser("UTF-8");
  parser.addListener('startElement', function(name, attrs) {
    console.log("FOUND : "+name)
  });
  res.addListener( "data", function (data) {
    console.log( "DATA : \n" + data )
    if( ! parser.parse( data, false ) ) {
      console.log( "PARSE FAIL" )
    }
  } )
}