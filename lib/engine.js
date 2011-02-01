var sys = require('sys'),
    comManager_ = require('./com-manager'),
    game_ = require('./game'),
    player_ = require('./player'),
    actionManager_ = require('./action-manager');


exports.Engine = function() {
    this.server = new comManager_.ComManager(this);
    this.am = new actionManager_.ActionManager(this);

    this.players = [];
    this.games = [];

    this.gameId = 0;
};

exports.Engine.prototype = {

    start: function() {
        this.server.listen();
        return this;
    },

    createGame: function(player) {
        var newGame = new game_.Game(this, this.gameId).addPlayer(player);
        this.games.push(newGame);
        this.gameId++;
        return this;
    },

    addPlayer: function(client) {
        var player = new player_.Player(client);
        this.players.push(player);
        player.client.send(this.am.getPlayerLogin());
        return this;
    },

    getGamesList: function() {
        var json = '{"games": [';

        var i = 0,
            nb = this.games.length;

        for (; i < nb; i++) {
            if (!this.games[i].isRunning()) {
                json += this.games[i].toJSON() + ', ';
            }
        }
        json += ']}';

        sys.log('Engine.getGamesList: ' + json);

        return json;
    },
};
