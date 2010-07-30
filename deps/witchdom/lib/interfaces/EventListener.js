var EventException = exports.EventException = function ( code ) {
  var error = new Error( )
  error.code = code
  return error
}
EventException.UNSPECIFIED_EVENT_TYPE_ERR = EventException.prototype.UNSPECIFIED_EVENT_TYPE_ERR = 0
EventException.DISPATCH_REQUEST_ERR = EventException.prototype.DISPATCH_REQUEST_ERR = 1

//defaults = {event:actions[]}
exports.EventListener = function EventListener( defaults ) {
  var listeners = {}
  this.dispatchEvent = function dispatchEvent( /*Event*/ evt ) {
    if ( ! ( "type" in evt ) ) {
      throw EventException( UNSPECIFIED_EVENT_TYPE_ERR )
    }
    var type = evt.type
    if( type in listeners ) {
      eventListeners = listeners[ type ]
      //TODO: Should we try..catch these? spec doesnt say
      //back up for bubbling phase
      var node = this
        , nodes = [ node ]
      while( node.parentNode ) {
        node = node.parentNode
        nodes.push( node )
      }
      for( var i = nodes.length - 1; i >= 0; i-- ) {
        var node = nodes[ i ]
        var eventListeners = node.eventListeners.capture forEach( function( listener ) {
          listener( evt )
          if( evt.isStopped() ) {

          }
        } );
      }
    }
  }
  this.addEventListener = function addEventListener(
    /*String*/ type
    , /*EventListener*/ listener
    , /*bool*/ useCapture
  ) {
    type = String( type )
    listener = listener instanceof Function ? listener : listener.handleEvent
    if ( useCapture ) {
      var eventListeners = listeners[ type ]
      eventListeners.capture.push( listener )
    }
    else {
      var eventListeners = listeners[ type ]
      eventListeners.bubble.push( listener )
    }
  }
}