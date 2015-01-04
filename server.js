// Proxima - Proxy Server
// -------------------------------------------------------------------

// Load thrid party dependencies
// -------------------------------------------------------------------
var http = require('http'),
    url = require('url'),
    httpProxy = require('http-proxy'),
    connect = require('connect');

// Load Proxima
// -------------------------------------------------------------------
var proxima = {};

proxima.middleware = require('./middleware/index.js').Package;

proxima.components = require('./components/index.js').Package;


// Build Connect Application
var app = connect();
app.use(proxima.middleware.Logging);

// gzip/deflate outgoing responses
var compression = require('compression')
app.use(compression());

// store session state in browser cookie
var cookieSession = require('cookie-session')
app.use(cookieSession({
        keys: ['proxima-0', 'proxima-1']
}));


// Proxy Server
var proxy = httpProxy.createProxyServer({ target: "/api" });

app.use("/api", function (req, res) {
    console.log("[proxima] [sending to startnode01]");
    proxy.web(req, res, { target: 'http://104.131.77.40/api' });    
});

app.use("/user", function (req, res) {
    console.log("[proxima] [sending to startnode02]");
    proxy.web(req, res, { target: 'http://104.236.60.234/api' });    
});


// Server Init
http.createServer(app).listen(3080);