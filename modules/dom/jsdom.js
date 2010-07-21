var jsdom = require("../../deps/jsdom/lib/jsdom")
  , browserAugmentation = jsdom.browserAugmentation
  , dom = jsdom.dom.level1.core

module.exports = {
  onCreation:function(res,next) {
    var browser = browserAugmentation(dom)
    var document = this.document = new browser.Document()
    //console.log("DOCUMENT::"+document)
    var selected = null
    //console.log("SAX::"+this.sax)
    if (this.sax) {
      //TODO: res.sax.onDirective =
      this.sax.addListener("element", function(elemName) {
      //console.log(elemName)
        var node = document.createElement(elemName)
        //console.log("JSDOM ADDING "+elemName)
        ;(selected || document).appendChild(node)
        selected = node
      } )
      this.sax.addListener("attribute", function(name,value) {
        selected.setAttribute(name,value)
      } )
      this.sax.addListener("text", function(text) {
        if(selected) selected.appendChild(document.createTextNode(text))
      } )
      this.sax.addListener("elementEnd", function() {
        selected = selected.parentNode
      } )
      if( this.sandbox ) this.sandbox.document = document
    }
    next()
  }
}