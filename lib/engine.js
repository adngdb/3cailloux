var sys = require('sys'),
    comManager_ = require('./com-manager'),
    game_ = require('./game');


exports.Engine = function() {
    this.server = new comManager_.ComManager(this);

    this.players = [];
    this.games = [];

    this.gameId = 0;
};

exports.Engine.prototype = {

    createGame: function(player) {
        var newGame = new game_.Game(this).addPlayer(player);
        this.games.push(newGame);
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
