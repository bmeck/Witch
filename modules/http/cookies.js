var cookie = require("../../deps/node-cookiejar/cookiejar")
  , CookieJar = cookie.CookieJar
  , CookieAccessInfo = cookie.CookieAccessInfo
module.exports = function() {
  var cookiejar = new CookieJar
  return {
    onCreation : function(req,next) {
      req.headers.cookie = String(
        cookiejar.getCookies(
          CookieAccessInfo(this.url.hostname,this.url.pathname,this.url.protocol.toLowerCase() == "http:")
        ).map(function(item){
          return item.toValueString()
        }).join(';')
      )
      next()
    }
    , onResponse : function(res,next) {
      if('set-cookie' in res.headers) cookiejar.setCookies(
        res.headers['set-cookie']
      )
      next()
    }
  }
}