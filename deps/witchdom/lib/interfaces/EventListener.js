var EventException = exports.EventException = function ( code ) {
  var error = new Error( )
  error.code = code
  return error
}
EventException.UNSPECIFIED_EVENT_TYPE_ERR = EventException.prototype.UNSPECIFIED_EVENT_TYPE_ERR = 0
EventException.DISPATCH_REQUEST_ERR = EventException.prototype.DISPATCH_REQUEST_ERR = 1
