//Allows better dns resolution
var dns = require("dns")
function normalizeUrl(url) {
  url.port = url.port || 80
  url.hostname = url.hostname || "localhost"
  url.pathname = url.pathname || "/"
  url.protocol = url.protocol || "http:"
  return url
}

module.exports = { onCreation : function( req, next ) {
  req.headers = req.headers || {}
  req.headers.host = this.url.hostname || this.url.pathname
  if(/^(?:\d{1,3}[.]){3}\d{1,3}$/.test(this.url.hostname)) {
    this.url = normalizeUrl(this.url)
    next()
  }
  else {
    var $this = this
    dns.resolve( this.url.hostname || this.url.href, function (err, addresses) {
      if (err) {
        console.log( "DNS ERROR : " + err )
      }
      else {
        $this.url.hostname = addresses[ 0 ]
        $this.url = normalizeUrl($this.url)
        next()
      }
    } )
  }
} }