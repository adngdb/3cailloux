var sys = require("sys");

exports.Client = function(connectionData, serverNode) {

    this.server = serverNode;

    this.conn = connectionData;
    this.id = this.conn.id;

    this.conn.addListener("message", function(msg) {
        this.onMessage(msg);
    }.bind(this));

    this.conn.addListener("close", function() {
        sys.log("Connection " + this.id + "has closed");
    }.bind(this));
};

exports.Client.prototype = {

    send: function(msg) {
        this.server.send(this, msg);
    },

    onMessage: function(msg) {
        sys.log("Message received: " + msg);
        //actionManager_.ActionManager.manageMessage(this.conn, msg);
    },

};

