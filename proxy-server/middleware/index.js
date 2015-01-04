/**
 * @class Middleware Package
 * @description packages middleware 
 */
var Package = {};

/**
 * Logging Package Registration
 * @description this adds the logging package
 */
Package.Logging = require('./log/log.js').Middleware;

/**
* @module Package
*/
module.exports.Package = Package;