
var EphemeronTable = require("./util/EphemeronTable")
//EphemeronTable = require("../util/ReadOnly")
module.exports = function DocumentNodeInterface(closureTable,globals) {
var DocumentClosures = closureTable.Document = new EphemeronTable()

var Document = closureTable.interfaces.Document = globals.Document = function Document(text) {
  var context_call = this !== globals && (function(){return this})() !== this
  if(
    context_call
    && (
      (
        this instanceof Document
        && DocumentClosures.has(this)
      )
      || ! (this instanceof TextNode)
    )
  ) {
    throw Error("cannot use .call or .apply on Node, nor can you reapply it (be careful if you have attached Node to a value as a property)")
  }
  var $this = context_call ? this : Object.create(Document.prototype)
  closureTable.interfaces.Node.call($this)
  var NodeClosures = closureTable.Node
  var closures = NodeClosures.get($this)
  closures.nodeType = closureTable.DOCUMENT_NODE
  closures.nodeName = "#document"
  return $this
}
Document.prototype = Object.create(closureTable.interfaces.Node.prototype)
Document.prototype.createTextNode = function createTextNode(text) {
	return new closureTable.interfaces.TextNode(text)
}

}