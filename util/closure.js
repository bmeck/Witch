module.exports = {
  onStreaming : function ( request, next ) {
    this.request = request
    next()
  }
  , onResponse : function ( res, next ) {
    this.response = res
    next()
  }
}