
var Options = {
    identifier: "Proxima 0",
    topology : [
        { identifier : "starnode01", url : "http://104.131.77.40/api" , proxy_path: "/sn1" },
        { identifier : "starnode02", url : "http://104.236.60.234/api" , proxy_path: "/sn2" },
    ]
};

// Http Objects
var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

var server = http.createServer(function (req, res) {
    // You can define here your custom logic to handle the request
    // and then proxy the request.
    proxy.web(req, res, { target: 'http://104.131.77.40/api' });
});

console.log("listening on port 5050")
server.listen(80);