module.exports = function(core) {
	var client = this.client
	if(!this.events) this.events = {
		defaults : {
			click: function( evt ) {
				switch(this.tagName) {
					case "a":
						var href = this.getAttribute( "href" )
						if( !href || href.charAt( 0 ) == "#" ) {
							break
						}
						var urlobj = url.parse(href)
						var aturl = url.parse(String(this.ownerDocument.location))
						var goalUrl = urlobj.host
							? href
							: (href && action.charAt(0) == "/")
								? aturl.hostname+href
								: aturl.hostname+path.join(aturl.pathname,href)
						client("GET",goalUrl)
						break
					case "input":
						switch(this.getAttribute("type")) {
							case "radio":
								var inputs = this.form.getElementsByTagName("input")
								for(var i=0;i<inputs.length;i++) {
									inputs[i].setAttribute("checked",null)
								}
							case "checkbox":
								this.setAttribute("checked",this.getAttribute("checked") ? "" : "checked")
								break
							case "text":
							case "password":
							default:
								this.ownerDocument.activeElement = this
								break
							case "submit":
						}
					case "button":
						var evt = document.createEvent()
						evt.initEvent("submit",true,true)
						this.form.dispatchEvent( evt )
				}
			}
			, submit: function( evt ) {
				if(this.tagName == "form") this.submit()
			}
		}
	}
	var defaults = this.events.defaults
	core.Document.createEvent = function createEvent() {
		return {
			_bubbles: null
			,_preventable: null
			,_stopped: false
			,_prevented: false
			,initEvent: function initEvent(type,bubbles,preventable) {
				this._bubbles = bubbles
				this._preventable = preventable
				this.type = type
				return this
			}
			,type: type
			,stopPropagation: function() {this._stopped = true}
			,preventDefault: function() {this._prevented = true}
		}
	}
	core.Element.prototype.addEventListener = core.Element.prototype.addEvent = function( type, handler, captures ) {
		type=type.replace(/^on/i,"")
		if(!this._events) this._events = {}
		var events = this._events
		if(! events[ type ] ) events[ type ] = {capture:[],bubble:[]}
		var handlers = events[ type ]
		if(captures) handlers.capture.push(handler)
		else handlers.bubble.push(handler)
	}
	core.Element.prototype.dispatchEvent = function( evt ) {
		var type = evt.type
		var handlers = this._events[ type ]

		var dispatchers = handlers.capture
		for(var i=0;i<dispatchers.length;i++) {
			var dispatcher = dispatchers[i]
			if( dispatcher( evt ) == false) evt._prevented = true
			if( evt._stopped ) {
				break
			}
		}
		if( evt._bubbles && ! evt._stopped ) {
			var dispatchers = handlers.bubble
			for(var i=0;i<dispatchers.length;i++) {
				var dispatcher = dispatchers[i]
				if( dispatcher( evt ) == false) evt._prevented = true
				if( evt._stopped ) {
					break
				}
			}
		}
		if( evt._preventable && evt._prevented ) {
			return
		}
		if( type in defaults )defaults[ type ].call( this, evt )
	}
	return core
}