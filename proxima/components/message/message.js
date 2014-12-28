// Topology Component
var topology = [];
topology.push({ path: "/api", target: "http://104.131.77.40/api" , name: "starnode0" , type: "node" });
topology.push({ path: "/user", target: "http://104.236.60.234/api", name: "starnode0" , type: "node" });

module.exports.Topology = topology;

var Component = function (options) {
    var self = {};
    
    self.options = options;
    

    return self;
};

module.exports.Component = Component;