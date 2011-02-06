var sys = require('sys'),
    ws = require('websocket-server'),
    client_ = require('./client');

exports.ComManager = function(engine) {
    this.engine = engine;
    this.port = 3400;

    this._server = ws.createServer();
    //actionManager.ActionManager.server = this.server;

    this._server.addListener("connection", function(connectionData) {
        this.onConnect(connectionData);
    }.bind(this));
};

exports.ComManager.prototype = {

    listen : function(){
        this._server.listen(this.port);
        sys.log("Server created. Listening on port " + this.port + ".");
    },

    onConnect : function(connectionData) {
        sys.log("New connection: " + connectionData.id);
        this.engine.addPlayer(new client_.Client(connectionData, this, this.engine.am));
    },

    send: function(client, message) {
        sys.log("ComManager.send: " + client.id +', '+ message);
        this._server.send(client.id, message);
    },

};

