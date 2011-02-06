function MessageParser(engine) {
    this.engine = engine;
}

MessageParser.prototype = {

    parse: function(msg) {
        var data = JSON.parse(msg);
        log(data.type);

        if (data.type == "query") {
            if (data.data.method == "login") {
                log('Query Login');
                this.engine.authenticate();
            }
        }
        else if (data.type == "data") {
            var method = data.data.method,
                object = data.data.object,
                object_data = data.data.object_data;

            if (method == "confirm") {
                if (object == "authentication") {
                    this.engine.confirmAuthentication(object_data);
                }
            }
            else if (method == "new") {
                if (object == "Game") {
                    log('new game');
                    this.engine.onJoinGame(object_data);
                }
            }
            else if (method == "update") {
                switch (object) {
                    case "games":
                        this.engine.setGamesList(object_data);
                        break;
                    case "Game":
                        this.engine.setGame(object_data);
                        break;
                }
            }
        }
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

    getLogin: function(login) {
        var data = {};
        data.username = login;
        return this.getMessage("login", data);
    },

    getAction: function(name, data) {
        var actionData = {};
        actionData.name = name;
        actionData.data = data;
        return this.getMessage("action", actionData);
    },

    getGamesList: function() {
        return this.getQuery("data", {object: "games"});
    },

    getCreateGame: function() {
        return this.getAction("createGame", {});
    },

    getJoinGame: function(gameId) {
        var data = {};
        data.game_id = gameId;
        return this.getAction("joinGame", data);
    },

}
