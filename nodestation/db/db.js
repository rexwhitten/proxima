
// Abstraction of our database operations model over leveldb 
// Rex Whitten 


var Db = function (options) {
	var self = Object.prototype;

	// Storage : Disk 
	var levelup = require('levelup');
	var db = levelup(options.db_path);

	// Storage : Memory
	var redis = require('redis');





	/// Last
	return self;
};

// Build the Database Tree 

var _tree = {};
_tree.log = new Db({ db_path : "/app.log.db" });
_tree.users = new Db({ db_path : "/app.user.db" });
_tree.links = new Db({ db_path : "/app.links.db" });