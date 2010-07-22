var Node = module.exports = function Node() {}

//Static

Node.ELEMENT_NODE = Node.prototype.ELEMENT_NODE = 1
Node.ATTRIBUTE_NODE = Node.prototype.ATTRIBUTE_NODE = 2
Node.TEXT_NODE = Node.prototype.TEXT_NODE = 3
Node.CDATA_SECTION_NODE = Node.prototype.CDATA_SECTION_NODE = 4
Node.ENTITY_REFERENCE_NODE = Node.prototype.ENTITY_REFERENCE_NODE = 5
Node.ENTITY_NODE = Node.prototype.ENTITY_NODE = 6
Node.PROCESSING_INSTRUCTION_NODE = Node.prototype.PROCESSING_INSTRUCTION_NODE = 7
Node.COMMENT_NODE = Node.prototype.COMMENT_NODE = 8
Node.DOCUMENT_NODE = Node.prototype.DOCUMENT_NODE = 9
Node.DOCUMENT_TYPE_NODE = Node.prototype.DOCUMENT_TYPE_NODE = 10
Node.DOCUMENT_FRAGMENT_NODE = Node.prototype.DOCUMENT_FRAGMENT_NODE = 11
Node.NOTATION_NODE = Node.prototype.NOTATION_NODE = 12

//Instance

Node.prototype.nodeType = 0
Node.prototype.nodeValue = 0
Node.prototype.nodeName = 0

Node.prototype.ownerDocument = null
Node.prototype.parentNode = null

Node.prototype.childNodes = null
Node.prototype.firstChild = null
Node.prototype.lastChild = null

Node.prototype.nextSibling = null
Node.prototype.previousSibling = null

Node.prototype.attributes = null

//Method