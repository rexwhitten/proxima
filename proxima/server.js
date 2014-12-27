
var Options = {
    identifier: "Proxima 0",
    topology : [
        { identifier : "starnode01", url : "http://104.131.77.40/api" , proxy_path: "/sn1" },
        { identifier : "starnode02", url : "http://104.236.60.234/api" , proxy_path: "/sn2" },
    ]
};


var http = require('http'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});

proxy.on('proxyReq', function (proxyReq, req, res, options) {
    console.log(req.path);
    proxyReq.setHeader('X-PROXIMA', "path");
});

var server = http.createServer(function (req, res) {
    // You can define here your custom logic to handle the request
    // and then proxy the request.
    var target = "";

    proxy.web(req, res, {
        target: 'http://104.131.77.40/api/'
    });
});
