/**
 * @author Rex Whitten
 * 
 */

var http = require('http'),
    url = require('url'),
    httpProxy = require('http-proxy'),
    connect = require('connect');

var options = {}; // or load from file
options.port = 80;

// Target Server Configuration
options.targets = {};
options.targets.resource_server = "http://104.131.77.40:3000/api";
options.targets.user_server = "http://104.131.77.40:3001/api";
options.targets.auth_server = "";

/** Session Cookies */
options.session = {};
options.session.keys = ['proxima-0', 'proxima-1'];



/** Load Proxima */
var proxima = {};
/** Middleware Namespace */
proxima.middleware = require('./middleware/index.js').Package;
/** Component Namespace */
proxima.components = require('./components/index.js').Package;

/** connect application */
var app = connect();
app.use(proxima.middleware.Logging);

/** connect middleare for resource compression */
var compression = require('compression')
app.use(compression());

/** connect middleware for session support */
var cookieSession = require('cookie-session')
app.use(cookieSession({
        keys: options.session.keys
}));


/** proxy server object */
var proxy = httpProxy.createProxyServer({ target: "/api" });

/**  resource path handler */
app.use("/resource", function (req, res) {
    console.log("[proxima/resource]");
    proxy.web(req, res, { target: options.targets.resource_server });    
});

/** user path handler */
app.use("/user", function (req, res) {
    console.log("[proxima/user]");
    proxy.web(req, res, { target: options.targets.resource_server });    
});


/** start the server */
console.log("proxima is alive listening at port 3000")
http.createServer(app).listen(options.port);