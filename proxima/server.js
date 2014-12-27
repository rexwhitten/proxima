// -------------------------------------------------------------------
// Proxima - Proxy Server
// -------------------------------------------------------------------

var http = require('http'),
    url = require('url'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({ target: "/api" });


//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function (req, res) {
    console.log(req.url);
    
    if (req.propertyIsEnumerable.startswith("/api")) {
        proxy.web(req, res, { target: 'http://104.131.77.40/api' });    
    }
    else {
        proxy.web(req, res, { target: 'http://104.236.60.234/api' });
    }
    
});

console.log("listening on port 80")
server.listen(80);