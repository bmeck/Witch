var path=require("path")
var url=require("url")
module.exports = function(core) {
	var client = this.client
	core.Element.prototype.submit = function() {
		var fields = {}
		if(this.tagName.toLowerCase() === "form") {
			var inputs = this.getElementsByTagName("input")
			//lol NodeList
			for(var i = 0;i < inputs.length;i++) {
				var element = inputs[i]
				fields[element.id] = fields[element.name] = element.value
			}
			var body = Object.keys(fields).map(function(name){
				return encodeURIComponent(name)+"="+encodeURIComponent(fields[name])
			}).join("&")
			var action = this.getAttribute("action")
			var urlobj = url.parse(action)
			var aturl = url.parse(String(this.ownerDocument.location))
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