//Fake leaky Ephemeron Table for testing
//In production use node-overload
module.exports = function EphemeronTable() {
  var key_table = []
  var value_table = []
  this["get"] = function( item ) {
    return value_table[ key_table.indexOf(item) ]
  }
  this["has"] = function( item ) {
    return key_table.indexOf( item ) !== -1
  }
  this["set"] = function( key, value ) {
    var index = key_table.indexOf( key )
    if( index !== -1 ) {
      value_table[ index ] = value
    }
    else {
      key_table.push( key )
      value_table.push( value )
    }
    return value
  }
  return this
}