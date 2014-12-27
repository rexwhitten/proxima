
var Options = {
    identifier: "Proxima 0",
    topology : [
        { identifier : "starnode01", url : "http://104.131.77.40/api" , proxy_path: "/sn1" },
        { identifier : "starnode02", url : "http://104.236.60.234/api" , proxy_path: "/sn2" },
    ]
};

var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxy();

var options = {
    '104.236.87.110/api/test': 'http://104.131.77.40/api',
    '104.236.87.110/api/dev': 'http://104.236.60.234/api'
}

require('http').createServer(function (req, res) {
    proxy.web(req, res, {
        target: options[req.headers.host]
    });
}).listen(80);