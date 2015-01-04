
/**
 * @class Logging Middleware
 * @description provides logging capability on requests
 */
var Logging = function (req, res, next) {
    console.log("[mw]/[logging]/" + req.url);

    next();
};

module.exports.Middleware = Logging;