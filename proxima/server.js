
var Options = {
    identifier: "Proxima 0",
    proxies: [
        { identifier : "starnode01", url : "http://104.131.77.40/api" , proxy_path: "/sn1" },
        { identifier : "starnode02", url : "http://104.236.60.234/api" , proxy_path: "/sn2" },
    ]
};


var http = require('http');
var port = process.env.port || 80;

var httpProxy = require('http-proxy');
var proxima = httpProxy.createProxyServer(options);


// Proxy Setup 
for (var proxy_index in Options.proxies) {
    var proxy = Options.proxies[proxy_index];
    
    var proxy_path = 
    http.createServer(function (req, res) {
        proxima.web(req, res, { target: 'http://' })
    }).listen(port);
}

