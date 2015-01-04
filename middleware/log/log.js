
var Logging = function (req, res, next) {
    console.log("[mw]/[logging]/" + req.url);

    next();
};

module.exports.Middleware = Logging;