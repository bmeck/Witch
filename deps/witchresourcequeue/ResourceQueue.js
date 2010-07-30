module.exports = function ResourceQueue() {
  var _loaders = []
  for(var i = 0; i < arguments.length; i++) {
    _loaders[i]=arguments[i]
  }
  var _queue = []
  var _handlers = {}
  var $this
  this.clean = function() {
    for(var prop in _blocks) {
      if(!_blocks[prop]) delete _blocks[prop]
    }
  }
  function flush() {
    var blocking = {}
    _queue.forEach(function(blocked_executor){
      if(!blocking[blocked_executor.tag]) {
        blocked_executor.callback()
      }
      if(blocked_executor.blocks) Object.keys(blocked_executor.blocks).forEach(function(tag){
        blocking[tag]=true
      })
    })
  }
  //returns true if a loader picked this up and a handler is being sent the stream
  //only fires the handler's callback if there are no blockers
  this.queue = function(tag,address,blocks_tags,headers,content) {
    var stream
    //Loop to find a loader that can deal w/ this address/headers/content
    for(var i = 0; i < _loaders.length; i++) {
      var loader = _loaders[ i ]
      console.log(address)
      stream = loader(address,headers,content)
      if(stream) break
    }
    //No loaders, return false
    if(!stream) return false
    var handler_list = _handlers[tag]
    var handled = false
    //find a handler
    if(handler_list) for(var i = 0; i < handler_list; i++) {
      //handler returns a callback to be fired later
      var ready = false
      var callback
      var resource = {tag:tag,blocks:blocks_tags}
      resource.callback = function(){
        if(ready) {
          _queue.splice(_queue.indexOf(resource))
          resource.blocks=false
          callback()
        }
      }
      _queue.push(resource)
      var callback = handler_list[i](stream,function ready(executor) {
        ready = true
        callback = executor
        flush()
      } )
      handled = true
    }
    //returns true if a handler is going to deal w/ it
    return handled
  }
  this.on = function(tag,callback) {
    var handler = _handlers[tag]
    if( !handler ) {
      handler = _handlers[tag] = []
    }
    handler.push(callback)
    return this
  }
}