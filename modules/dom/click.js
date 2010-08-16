var path=require("path")
var url=require("url")
module.exports = function(core) {
	var client = this.client
	core.Element.prototype.click = function() {
		var fields = {}
		var aturl = String(this.ownerDocument.location)
		if(this.tagName.toLowerCase() === "input") {
			var inputs = this.getElementsByTagName("input")
			//lol NodeList
			for(var i = 0;i < inputs.length;i++) {
				var element = inputs[i]
				switch(element.getAttribute("type")) {
					case "radio":
						if(element.getAttribute("checked")) {
							fields[element.id] = fields[element.name] = element.value
						}
						break
					case "checkbox":
						if(element.getAttribute("checked")) {
							fields[element.id] = fields[element.name] = element.value
						}
						break
					case "text":
					case "password":
					default: fields[element.id] = fields[element.name] = element.value
				}
			}
			var body = Object.keys(fields).map(function(name){
				return encodeURIComponent(name)+"="+encodeURIComponent(fields[name])
			}).join("&")
			var action = this.getAttribute("action")
			var urlobj = url.parse(action)
			var aturl = url.parse(aturl)
			var goalUrl = urlobj.host
				? action
				: (action && action.charAt(0) == "/")
					? aturl.hostname+action
					: aturl.hostname+path.join(aturl.pathname,action)
			var sandbox = client(String(this.method||"POST").toUpperCase(),goalUrl,{
				host: url.parse(goalUrl).host
				,"content-length":body.length
				,"content-type":"form-urlencoded"
			},body)
			sandbox.client = client
		}
	}
	return core
}