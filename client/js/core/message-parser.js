function MessageParser(game) {
    this.game = game;
}

MessageParser.prototype = {

    parse: function(msg) {
        var data = JSON.parse(msg);
        log(data.method);

        if (data.method == "get") {
            if (data.object == "map") {
                this.game.init(data.data);
            }
        }
        else if (data.method == "update") {
            if (data.object == "map") {
                this.game.updateMap(data.data);
            }
            else if (data.object == "playersInfo") {
                this.game.updatePlayersInfo(data.data);
            }
        }
    },

    getChangeBrick: function(action) {
        return JSON.stringify({
            method: "do",
            object: "brick",
            data: {
                action: action
            },
        });
    },

    getMoveLeft: function() {
        return this.getChangeBrick("moveLeft");
    },

    getMoveRight: function() {
        return this.getChangeBrick("moveRight");
    },

    getChangeShape: function() {
        return this.getChangeBrick("changeShape");
    },
}
