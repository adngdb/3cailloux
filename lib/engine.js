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

        player.client.send( this.am.getNewGameData( newGame.getData() ) );

        this.refreshGamesList();

        return this;
    },

    joinGame: function(player, gameId) {
        sys.log('Engine.joinGame: ' + gameId);
        var game = this.getGame(gameId);
        game.addPlayer(player).send( this.am.getUpdateGameData( game.getData() ) );

        if (game.isRunning()) {
            game.onStart();
        }

        return this;
    },

    addPlayer: function(client) {
        sys.log('Engine.addPlayer: ' + client.id);
        var player = new player_.Player(client);
        this.players.push(player);
        player.client.send(this.am.getPlayerLogin());

        return this;
    },

    getPlayer: function(id) {
        sys.log('Engine.getPlayer: ' + id);
        var i = 0,
            nb = this.players.length;

        for (; i < nb; i++) {
            var p = this.players[i];
            if (p.id == id) {
                return p;
            }
        }

        return null;
    },

    getGame: function(id) {
        sys.log('Engine.getGame: ' + id);
        var i = 0,
            nb = this.games.length;

        for (; i < nb; i++) {
            var g = this.games[i];
            if (g.id == id) {
                return g;
            }
        }

        return null;
    },

    getGamesList: function() {
        //~ var json = '{"games": [';

        var gamesList = [];

        var i = 0,
            nb = this.games.length;

        for (; i < nb; i++) {
            if (!this.games[i].isRunning()) {
                //~ json += this.games[i].toJSON() + ', ';
                gamesList.push( this.games[i].getSimpleData() );
            }
        }
        //~ json += ']}';

        sys.log('Engine.getGamesList');

        return gamesList;
    },

    authenticate: function(player, username) {
        sys.log('Engine.authenticate: ' + username);
        player.login = username;
        this.confirmAuthentication(player);

        return this;
    },

    confirmAuthentication: function(player) {
        player.client.send(this.am.getAuthenticationConfirm(player));

        return this;
    },

    refreshGamesList: function() {
        var i = 0,
            nb = this.players.length,
            gamesList = this.getGamesList();

        for (; i < nb; i++) {
            var p = this.players[i];
            if (p.state == player_.PLAYER_STATE.WATCHING_LIST) {
                p.client.send(this.am.getGamesList(gamesList));
            }
        }

        return this;
    },

};
