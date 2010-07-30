//exposes
//  - globals.Node
//
//  - closureTable.interfaces.Node
//
//  - closureTable.Node - private Node data ( ephemeron table mapping to attributes )
//
//  - closureTable.DOCUMENT_POSITION_DISCONNECTED
//  - closureTable.DOCUMENT_POSITION_PRECEDING
//  - closureTable.DOCUMENT_POSITION_FOLLOWING
//  - closureTable.DOCUMENT_POSITION_CONTAINS
//  - closureTable.DOCUMENT_POSITION_CONTAINED_BY
//
//  - closureTable.ELEMENT_NODE
//  - closureTable.ATTRIBUTE_NODE
//  - closureTable.TEXT_NODE
//  - closureTable.CDATA_SECTION_NODE
//  - closureTable.ENTITY_REFERENCE_NODE
//  - closureTable.ENTITY_NODE
//  - closureTable.PROCESSING_INSTRUCTION_NODE
//  - closureTable.COMMENT_NODE
//  - closureTable.DOCUMENT_NODE
//  - closureTable.DOCUMENT_TYPE_NODE
//  - closureTable.DOCUMENT_FRAGMENT_NODE
//  - closureTable.NOTATION_NODE

var EphemeronTable = require("./util/EphemeronTable")
//EphemeronTable = require("../util/ReadOnly")
module.exports = function NodeInterface(closureTable,globals) {
var NodeClosures = closureTable.Node = new EphemeronTable()

var DOCUMENT_POSITION_DISCONNECTED = closureTable.DOCUMENT_POSITION_DISCONNECTED = 0x01
var DOCUMENT_POSITION_PRECEDING = closureTable.DOCUMENT_POSITION_PRECEDING = 0x02
var DOCUMENT_POSITION_FOLLOWING = closureTable.DOCUMENT_POSITION_FOLLOWING = 0x04
var DOCUMENT_POSITION_CONTAINS = closureTable.DOCUMENT_POSITION_CONTAINS = 0x08
var DOCUMENT_POSITION_CONTAINED_BY = closureTable.DOCUMENT_POSITION_CONTAINED_BY = 0x10
var id = 0
var Node = closureTable.interfaces.Node = globals.Node = function Node() {
  var context_call = this !== globals && (function(){return this})() !== this
  if(
    context_call
    && (
      (
        this instanceof Node
        && NodeClosures.has(this)
      )
      || ! (this instanceof Node)
    )
  ) {
    throw Error("cannot use .call or .apply on Node, nor can you reapply it (be careful if you have attached Node to a value as a property)")
  }
  var $this = context_call ? this : Object.create(Node.prototype)
  var EventListener = closureTable.interfaces.EventListener
  if( EventListener ) {
    EventListener.call( $this )
  }
  var closure = {
  //_x means not relevant to spec
    _id : id++
    , _this : $this

    , nodeType : 0
    , nodeValue : 0
    , nodeName : 0

    , ownerDocument : null
    , parentNode : null

    , childNodes : []

    , nextSibling : null
    , previousSibling : null

    , attributes : null
  }
  NodeClosures.set($this,closure)
  return $this
}
//Static
var NoModificationCallback = function NO_MODIFICATION_ALLOWED_ERR( value ) { throw closureTable.NO_MODIFICATION_ALLOWED_ERR }

closureTable.ELEMENT_NODE = 1
var descriptor = {
  get: function() { return closureTable.Node.get(this).nodeType }
  , set: NoModificationCallback
}
Object.defineProperty( Node, "ELEMENT_NODE", descriptor )
Object.defineProperty( Node.prototype, "ELEMENT_NODE", descriptor )

closureTable.ATTRIBUTE_NODE = 2
var descriptor = {
  get: function() { return closureTable.Node.get(this).nodeType }
  , set: NoModificationCallback
}
Object.defineProperty( Node, "ATTRIBUTE_NODE", descriptor )
Object.defineProperty( Node.prototype, "ATTRIBUTE_NODE", descriptor )

closureTable.TEXT_NODE = 3
var descriptor = {
  get: function() { return closureTable.Node.get(this).nodeType }
  , set: NoModificationCallback
}
Object.defineProperty( Node, "TEXT_NODE", descriptor )
Object.defineProperty( Node.prototype, "TEXT_NODE", descriptor )

closureTable.CDATA_SECTION_NODE = 4
var descriptor = {
  get: function() { return closureTable.Node.get(this).nodeType }
  , set: NoModificationCallback
}
Object.defineProperty( Node, "CDATA_SECTION_NODE", descriptor )
Object.defineProperty( Node.prototype, "CDATA_SECTION_NODE", descriptor )

closureTable.ENTITY_REFERENCE_NODE = 5
var descriptor = {
  get: function() { return closureTable.Node.get(this).nodeType }
  , set: NoModificationCallback
}
Object.defineProperty( Node, "ENTITY_REFERENCE_NODE", descriptor )
Object.defineProperty( Node.prototype, "ENTITY_REFERENCE_NODE", descriptor )

closureTable.ENTITY_NODE = 6
var descriptor = {
  get: function() { return closureTable.Node.get(this).nodeType }
  , set: NoModificationCallback
}
Object.defineProperty( Node, "ENTITY_NODE", descriptor )
Object.defineProperty( Node.prototype, "ENTITY_NODE", descriptor )

closureTable.PROCESSING_INSTRUCTION_NODE = 7
var descriptor = {
  get: function() { return closureTable.Node.get(this).nodeType }
  , set: NoModificationCallback
}
Object.defineProperty( Node, "PROCESSING_INSTRUCTION_NODE", descriptor )
Object.defineProperty( Node.prototype, "PROCESSING_INSTRUCTION_NODE", descriptor )

closureTable.COMMENT_NODE = 8
var descriptor = {
  get: function() { return closureTable.Node.get(this).nodeType }
  , set: NoModificationCallback
}
Object.defineProperty( Node, "COMMENT_NODE", descriptor )
Object.defineProperty( Node.prototype, "COMMENT_NODE", descriptor )

closureTable.DOCUMENT_NODE = 9
var descriptor = {
  get: function() { return closureTable.Node.get(this).nodeType }
  , set: NoModificationCallback
}
Object.defineProperty( Node, "DOCUMENT_NODE", descriptor )
Object.defineProperty( Node.prototype, "DOCUMENT_NODE", descriptor )

closureTable.DOCUMENT_TYPE_NODE = 10
var descriptor = {
  get: function() { return closureTable.Node.get(this).nodeType }
  , set: NoModificationCallback
}
Object.defineProperty( Node, "DOCUMENT_TYPE_NODE", descriptor )
Object.defineProperty( Node.prototype, "DOCUMENT_TYPE_NODE", descriptor )

closureTable.DOCUMENT_FRAGMENT_NODE = 11
var descriptor = {
  get: function() { return closureTable.Node.get(this).nodeType }
  , set: NoModificationCallback
}
Object.defineProperty( Node, "DOCUMENT_FRAGMENT_NODE", descriptor )
Object.defineProperty( Node.prototype, "DOCUMENT_FRAGMENT_NODE", descriptor )

closureTable.NOTATION_NODE = 12
var descriptor = {
  get: function() { return closureTable.Node.get(this).nodeType }
  , set: NoModificationCallback
}
Object.defineProperty( Node, "NOTATION_NODE", descriptor )
Object.defineProperty( Node.prototype, "NOTATION_NODE", descriptor )


//Instance
Object.defineProperty( Node.prototype, "nodeType", {
  get: function() { return closureTable.Node.get(this).nodeType }
  , set: NoModificationCallback
} )
Object.defineProperty( Node.prototype, "nodeValue", {
  get: function() { return closureTable.Node.get(this).nodeValue }
  , set: NoModificationCallback
} )
Object.defineProperty( Node.prototype, "nodeName", {
  get: function() { return closureTable.Node.get(this).nodeName }
  , set: NoModificationCallback
} )


Object.defineProperty( Node.prototype, "ownerDocument", {
  get: function() { return closureTable.Node.get(this).ownerDocument }
  , set: NoModificationCallback
} )
Object.defineProperty( Node.prototype, "parentNode", {
  get: function() { return closureTable.Node.get(this).parentNode }
  , set: NoModificationCallback
} )


Object.defineProperty( Node.prototype, "childNodes", {
  get: function() { return closureTable.Node.get(this).childNodes }
  , set: NoModificationCallback
} )
Object.defineProperty( Node.prototype, "firstChild", {
  get: function() { return closureTable.Node.get(this).childNodes[0] }
  , set: NoModificationCallback
} )
Object.defineProperty( Node.prototype, "lastChild", {
  get: function() {
  var childNodes = closureTable.Node.get(this).childNodes; return childNodes[ childNodes.length - 1 ] }
  , set: NoModificationCallback
} )
Object.defineProperty( Node.prototype, "nextSibling", {
  get: function() { return closureTable.Node.get(this).nextSibling }
  , set: NoModificationCallback
} )
Object.defineProperty( Node.prototype, "previousSibling", {
  get: function() { return closureTable.Node.get(this).previousSibling }
  , set: NoModificationCallback
} )


Object.defineProperty( Node.prototype, "attributes", {
  get: function() { return closureTable.Node.get(this).attributes }
  , set: NoModificationCallback
} )

var compareDocumentPosition = Node.prototype.compareDocumentPosition = function compareDocumentPosition( otherNode ) {
  var closure = closureTable.Node.get( this )
  var reference_closure = closureTable.Node.get( otherNode )
  if( !closure || !reference_closure ) {
    throw Error("Comparing position against non-Node values is not allowed")
  }
  if( this === otherNode ) return 0
  if( closure.ownerDocument !== otherNode.ownerDocument ) {
    return DOCUMENT_POSITION_DISCONNECTED
  }
  var point = closure
  var parents = [ ]
  while( point ) {
    if( point == otherNode ) return DOCUMENT_POSITION_CONTAINS
    parents.push( point._this )
    point = closureTable.Node.get( point.parentNode )
  }
  point = reference_closure
  while( point ) {
    if( point == otherNode ) return DOCUMENT_POSITION_CONTAINED_BY
    var location_index = parents.indexOf( point._this )
    if( location_index !== -1) {
		 var smallest_common_ancestor = closureTable.Node.get( parents[ location_index ] )
		 var this_index = smallest_common_ancestor.childNodes.indexOf( this )
		 var other_index = smallest_common_ancestor.childNodes.indexOf( otherNode )
		 if( this_index > other_index ) {
           return DOCUMENT_POSITION_PRECEDING
		 }
		 else {
		   return DOCUMENT_POSITION_FOLLOWING
		 }
    }
    point = closureTable.Node.get( point.parentNode )
  }
  return DOCUMENT_POSITION_DISCONNECTED
}
var insertBefore = Node.prototype.insertBefore = function insertBefore( newChild, refChild ) {
  var closure = NodeClosures.get( this )
  if( closure.readOnly ) {
  	throw Error(closureTable.NO_MODIFICATION_ALLOWED_ERR)
  }
  var children = closure.childNodes
  var index = children.indexOf( refChild )
  if( index !== -1 ) {
    var newChildClosure = NodeClosures.get( newChild )
    if( newChildClosure.parentNode ) removeChild.call( newChildClosure.parentNode, newChild )

  	if( compareDocumentPosition.call( refChild, newChild ) == DOCUMENT_POSITION_CONTAINS ) throw Error(closureTable.HIERARCHY_REQUEST_ERR)

    var refChildClosure = NodeClosures.get( refChild )

    refChildClosure.previousSibling = newChild
    newChildClosure.nextSibling = refChild
    newChildClosure.parentNode = this
    if( index !== 0 ) {
      var preChild = children[ index - 1 ]
      var preChildClosure = NodeClosures.get( preChild )
      preChildClosure.nextSibling = newChild
      newChildClosure.previousibling = preChild
    }
    children.splice( index, 0, newChild )
  }
  //If refChild is not in Node append
  else {
    throw Error( closureTable.DOMException.NOT_FOUND_ERR )
  }
  return newChild
}
Node.prototype.replaceChild = function( newChild, oldChild ) {
  var closure = NodeClosures.get( this )
  if( closure.readOnly ) {
  	throw Error(closureTable.NO_MODIFICATION_ALLOWED_ERR)
  }
  var children = closure.childNodes
  var index = children.indexOf( oldChild )
  if( index !== -1 ) {
    var newChildClosure = NodeClosures.get( newChild )
    if( newChildClosure.parentNode ) removeChild.call( newChildClosure.parentNode, newChild )

  	if( compareDocumentPosition.call( refChild, newChild ) == DOCUMENT_POSITION_CONTAINS ) throw Error(closureTable.HIERARCHY_REQUEST_ERR)

    var oldChildClosure = NodeClosures.get( oldChild )

    NodeClosures.get( oldChildClosure.previousSibling ).nextSibling = newChild
    newChildClosure.previousSibling = oldChildClosure.previousSibling
    newChildClosure.parentNode = this
    newChildClosure.nextSibling = oldChildClosure.nextSibling
    NodeClosures.get( oldChildClosure.nextSibling ).previousSibling = newChild

    oldChildClosure.previousSibling = null
    oldChildClosure.parentNode = null
    oldChildClosure.nextSibling = null
    children.splice( index, 1, newChild )
  }
  //If refChild is not in Node append
  else {
    throw Error( closureTable.DOMException.NOT_FOUND_ERR )
  }
  return newChild
}
Node.prototype.removeChild = function removeChild(oldChild) {
  var closure = NodeClosures.get( this )
  if( closure.readOnly ) {
  	throw Error(closureTable.NO_MODIFICATION_ALLOWED_ERR)
  }
  var children = closure.childNodes
  var index = children.indexOf( oldChild )
  if( index !== -1 ) {
    var oldChildClosure = NodeClosures.get( oldChild )
    oldChildClosure.parentNode = null
    oldChildClosure.previousSibling = null
    oldChildClosure.nextSibling = null
    children.splice( index, 1 )
  }
  else {
    throw Error( closureTable.DOMException.NOT_FOUND_ERR )
  }
  return newChild
}
Node.prototype.appendChild = function appendChild(newChild) {
  var closure = NodeClosures.get( this )
  if( closure.readOnly ) {
  	throw Error(closureTable.NO_MODIFICATION_ALLOWED_ERR)
  }
  var children = closure.childNodes
  var newChildClosure = NodeClosures.get( newChild )
  if( newChildClosure.parentNode ) removeChild.call( newChildClosure.parentNode, newChild )
  var lastChild = this.lastChild
  if( lastChild ) {
    NodeClosures.get( lastChild ).nextSibling = newChild
    newChildClosure.previousSibling = lastChild
  }
  children.push( newChild )
  newChildClosure.parentNode = this
  return newChild
}
Node.prototype.hasChildren = function appendChild(newChild) {
  return !!(NodeClosures.get( this ).childNodes.length)
}
//  Node Node.prototype.cloneNode(in boolean deep)
//                                        raises(DOMException);

return Node
}