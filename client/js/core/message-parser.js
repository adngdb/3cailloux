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
        else if (data.method == "update") {
            if (data.object == "map") {
                this.engine.updateMap(data.data);
            }
            else if (data.object == "playersInfo") {
                this.engine.updatePlayersInfo(data.data);
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

    getLogin: function(login) {
        var data = {};
        data.username = login;
        return this.getMessage("login", data);
    },

    getAction: function() {
        return null;
    },

}
