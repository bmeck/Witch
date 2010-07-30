var DOM = module.exports = function DOM() {
  var closureTable = {
    interfaces : {}
  }
  var globals = {}
  function integrate( arr ) {
    for(var i = 0; i < arr.length; i++) {
      var feature = arr[ i ]
      if(typeof feature === "string") {
        //NOTE: only goes 1 level deep! (prevents loops)
        feature = DOM[ feature ]
      }
      if( Array.isArray( feature ) ) {
        integrate( feature )
      }
      else if(feature instanceof Function) {
        feature( closureTable, globals )
      }
      else {
        throw Error( "WTF DID YOU GIVE ME!" )
      }
    }
  }
  integrate( arguments )
  return globals
}
DOM.level1 = [ require("./interfaces/EventListener"), require("./Node") ]
//DOM.level2
//DOM.level3