var connect = require("./client_connect")
  , dns = require("./util/dns")
  , sandbox = require("./util/sandbox")
  , resource = require("./util/resource")
  , cookies = require("./modules/http/cookies")
  , location = require("./util/location")
  , closure = require("./util/closure")
  , debug = require("./util/debug")
  , repl = require("./util/repl")
  , script = require("./util/resource/script")
  , html = require("./parser/html")
  , jsdom = require("./modules/dom/jsdom")
var client = connect.createClient(
  dns,
  cookies( ),
  closure,
  sandbox,
  location,
  resource( script ),
  html,
  jsdom,
  //css,
  debug,
  repl
)
var sandbox = client("GET","localhost/~bradleymeck/alert.html")
sandbox.client = client