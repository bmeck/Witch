var DOM = require("../lib/DOM")
var assert = require("assert")
var dom = DOM(DOM.level1)
var Node = dom.Node

var FakeError = new Error()
try {
  Node.call({})
  throw FakeError
}
catch (e) {
  assert.ok(e != FakeError,"invalid construction")
}

var a=new Node()
assert.ok( a, "construction" )
//cant use dom.Node, it will set "this"
var b=Node()
var c=dom.Node()
a.appendChild( b )

assert.ok( b, "construction" )
assert.ok( a.lastChild == b, "lastChild set" )
assert.ok( a.firstChild == b, "firstChild set" )
assert.ok( a.childNodes.length == 1, "firstChild set" )
assert.ok( !b.previousSibling, "previousSibling set" )
assert.ok( !b.nextSibling, "nextSibling set" )

a.appendChild( c )
assert.ok( a.lastChild == c, "lastChild set" )
assert.ok( a.firstChild == b, "firstChild set" )
assert.ok( a.childNodes.length == 2, "firstChild set" )
assert.ok( !b.previousSibling, "previousSibling set" )
assert.ok( b.nextSibling == c, "nextSibling set" )
assert.ok( c.previousSibling == b, "previousSibling set" )
assert.ok( !c.nextSibling, "nextSibling set" )

var b2=Node()
a.insertBefore(b2,c)
assert.ok( a.lastChild == c, "lastChild set" )
assert.ok( a.firstChild == b, "firstChild set" )
assert.ok( a.childNodes.length == 3, "firstChild set" )
assert.ok( !b.previousSibling, "previousSibling set" )
assert.ok( b.nextSibling == b2, "nextSibling set" )
assert.ok( !b2.previousSibling, "previousSibling set" )
assert.ok( b2.nextSibling == c, "nextSibling set" )
assert.ok( c.previousSibling == b2, "previousSibling set" )
assert.ok( !c.nextSibling, "nextSibling set" )