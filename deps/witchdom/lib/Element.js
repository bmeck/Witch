
var EphemeronTable = require("./util/EphemeronTable")
//EphemeronTable = require("../util/ReadOnly")
module.exports = function ElementInterface(closureTable,globals) {
var ElementClosures = closureTable.Element = new EphemeronTable()

var Element = closureTable.interfaces.Element = globals.Element = function Element(tag) {
  var context_call = this !== globals && (function(){return this})() !== this
  if(
    context_call
    && (
      (
        this instanceof Element
        && ElementClosures.has(this)
      )
      || ! (this instanceof Element)
    )
  ) {
    throw Error("cannot use .call or .apply on Node, nor can you reapply it (be careful if you have attached Node to a value as a property)")
  }
  var $this = context_call ? this : Object.create(Element.prototype)
  closureTable.interfaces.Node.call($this)
  var NodeClosures = closureTable.Node
  var closures = NodeClosures.get($this)
  closures.nodeType = closureTable.ELEMENT_NODE
  closures.nodeName = tag.toUpperCase()
  closures.attributes = closureTable.interfaces.NamedNodeMap()
  var elemClosures.set($this,{
  	tagName:tag
  })
  return $this
}
Element.prototype = Object.create(closureTable.interfaces.Node.prototype)
Element.prototype.splitText = function splitText(offset) {
	if(offset < 0) {
		throw closureTable.INDEX_SIZE_ERR
	}
	var v = this.nodeValue
	if(offset >= v.length) {
		throw closureTable.INDEX_SIZE_ERR
	}
	var closures = closureTable.Node.get(this)
	if(closures.readOnly) {
		throw closureTable.NO_MODIFICATION_ALLOWED_ERR
	}
	var v1 = v.slice(0,offset)
	  , v2 = v.slice(offset)
	closures.nodeValue = v1
	var newChild = new Element(v2)
	if(closures.parentNode.lastChild == this) {
		closures.parentNode.appendChild(newChild)
	}
	else {
		closures.parentNode.insertBefore(newChild,this.nextSibling)
	}
}

}