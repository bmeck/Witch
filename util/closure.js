module.exports = {
  onStreaming : function ( request, next ) {
    this.request = request
    request.end()
    next()
  }
  , onResponse : function ( res, next ) {
    this.response = res
    next()
  }
}