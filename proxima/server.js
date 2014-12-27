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
    // You can define here your custom logic to handle the request
    // and then proxy the request.
    console.log(req.url);
    proxy.web(req, res, { target: 'http://104.131.77.40/api' });
});

console.log("listening on port 80")
server.listen(80);