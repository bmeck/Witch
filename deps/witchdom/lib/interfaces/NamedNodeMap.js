var EphemeronTable = require("./util/EphemeronTable")
//EphemeronTable = require("../util/ReadOnly")
module.exports = function NamedNodeMapInterface(closureTable,globals) {
var NamedNodeMapClosures = closureTable.NamedNodeMap = new EphemeronTable()

var NamedNodeMap = closureTable.interfaces.NamedNodeMap = globals.NamedNodeMap = function NamedNodeMap(tag) {
  var context_call = this !== globals && (function(){return this})() !== this
  if(
    context_call
    && (
      (
        this instanceof NamedNodeMap
        && NamedNodeMapClosures.has(this)
      )
      || ! (this instanceof NamedNodeMap)
    )
  ) {
    throw Error("cannot use .call or .apply on Node, nor can you reapply it (be careful if you have attached Node to a value as a property)")
  }
  var $this = context_call ? this : Object.create(NamedNodeMap.prototype)
  closureTable.NamedNodeMap.set($this,{
  	items_arr:[]
  	,items_map:{}
  	,length:0
  })
  return $this
}
//Static
var NoModificationCallback = function NO_MODIFICATION_ALLOWED_ERR( value ) { throw closureTable.NO_MODIFICATION_ALLOWED_ERR }

Object.defineProperty(NamedNodeMap.prototype,"length",{
	get: function length() {
		return NamedNodeMapClosures.get(this).length
	}
	set: NoModificationCallback
})

Object.defineProperty(NamedNodeMap.prototype,"item",{
	get: function item(i) {
		return NamedNodeMapClosures.get(this).items_arr[i]
	}
	set: NoModificationCallback
})

Object.defineProperty(NamedNodeMap.prototype,"getNamedItem",{
	get: function getNamedItem(nodeName) {
		return NamedNodeMapClosures.get(this).items_map[nodeName]
	}
	set: NoModificationCallback
})

Object.defineProperty(NamedNodeMap.prototype,"setNamedItem",{
	get: function getNamedItem(node) {
		var nodeClosure = closureTable.Node.get(node)
		if(nodeClodure.parentNode) {
			throw closureTable.INUSE_ATTRIBUTE_ERR
		}
		nodeClosure = closureTable.Node.get(this)
		if(nodeClosure.readOnly) {
			NoModificationCallback()
		}
		return NamedNodeMapClosures.get(this).items_map[node.nodeName] = node.nodeValue
	}
	set: NoModificationCallback
})

interface NamedNodeMap {
  Node               getNamedItem(in DOMString name);
  Node               setNamedItem(in Node arg)
                                        raises(DOMException);
  Node               removeNamedItem(in DOMString name)
                                        raises(DOMException);
  // Introduced in DOM Level 2:
  Node               getNamedItemNS(in DOMString namespaceURI,
                                    in DOMString localName);
  // Introduced in DOM Level 2:
  Node               setNamedItemNS(in Node arg)
                                        raises(DOMException);
  // Introduced in DOM Level 2:
  Node               removeNamedItemNS(in DOMString namespaceURI,
                                       in DOMString localName)
                                        raises(DOMException);
};

}