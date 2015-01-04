// ---------------------------------------------------------------
// API STATION - LevelDb
// ---------------------------------------------------------------

// ---------------------------------------------------------------
// Dependencies 
// ---------------------------------------------------------------
var express = require('express'),
    bodyParser = require('body-parser'),
    level = require('level');




// ---------------------------------------------------------------
// Databases 
// ---------------------------------------------------------------
var use_disk = false;

var db = {};

var db = level('./apidb');

// ---------------------------------------------------------------
// Middleware 
// ---------------------------------------------------------------
// CORS Middleware Object 
var CORS_Middleware = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}



// ---------------------------------------------------------------
// Express Application
// ---------------------------------------------------------------
var app = express();
app.use(bodyParser.json());
app.use(CORS_Middleware);
var security = {}; // --make this a new module 





// ---------------------------------------------------------------
// Routes
// ---------------------------------------------------------------
app.get('/api/*', function(req, res) {
	db.get(req.path, function (err, value) {
		var model = {};

		// Handle Error
		if (err) {
			model.err = err;
			console.log('leveldb:' + new Date() + err);
		}

		// Value
		model.value = value;

		console.log("[GET] " + req.path + " == " + model.value);
	  	// Build the response
		res.type('application/json');
		res.json(model);
	});
});

app.post('/api/*', function (req, res) {
	db.put(req.path,req.body, function (err) {
		var model = {};
		model.input = req.body;

		console.log('[POST] ' + req.path + ' = req.body = ' + JSON.stringify(req.body));

		// Handle Error
  		if (err) {
  			model.err = err;
  			console.log('leveldb:' + new Date() + err);
  		}

		console.log("[POST] " + req.path + " == " + req.body);
		// Build the response
		model.message = req.path + " saved.";
		res.type('application/json');
		res.json(model);
	});
});


app.listen(3000);
