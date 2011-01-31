var sys = require('sys'),
    ws = require('websocket-server'),
    client_ = require('./client');

exports.ComManager = function(engine) {
    this.engine = engine;

    this._server = ws.createServer();
    //actionManager.ActionManager.server = this.server;

    this.server.addListener("connection", function(connectionData) {
        this.onConnect(connectionData);
    }.bind(this));
};

exports.ComManager.prototype = {

    listen : function(port){
        this._server.listen(port);
        sys.log("Server created. Listening on port " + port + ".");
    },

    onConnect : function(connectionData) {
        sys.log("New connection: " + connectionData.id);
        this.engine.addPlayer(new client_.Client(connectionData, this));
    },

    send: function(client, message) {
        this._server.send(client.id, message);
    },

};

