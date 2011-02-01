var sys = require('sys');

exports.ActionManager = function(engine) {
    this.engine = engine;
};

exports.ActionManager.prototype = {

    parse: function(client, message) {
        var data = JSON.parse(message);

        if (data.type == "login") {
            this.engine.authenticate(this.engine.getPlayer(client.id), data.data.username);
        }
        else if (data.type == "query") {
            switch (data.data.object) {
                case "games":
                    client.send( this.getGamesList() );
                    break;
            }
        }
        else if (data.type == "action") {
            switch (data.data.name) {
                case "createGame":
                    this.engine.createGame(this.engine.getPlayer(client.id));
                    break;
            }
        }

        return this;
    },

    getMessage: function(method, data) {
        var msg = {
            type: method,
            data: data
        };

        return JSON.stringify(msg);
    },

    getQuery: function(responseMethod, responseData) {
        var data = responseData;
        data.method = responseMethod;
        return this.getMessage("query", data);
    },

    getAction: function() {
        return null;
    },

    getData: function(method, object, object_data) {
        var data = {};
        data.method = method;
        data.object = object;
        data.object_data = object_data;
        return this.getMessage("data", data);
    },

    getPlayerLogin: function(player) {
        return this.getQuery("login", {});
    },

    getAuthenticationConfirm: function(player) {
        return this.getData("confirm", "authentication", {login: player.login});
    },

    getGamesList: function(gamesList) {
        if (gamesList == null) {
            gamesList = this.engine.getGamesList();
        }
        return this.getData( "update", "games", gamesList );
    },

};
