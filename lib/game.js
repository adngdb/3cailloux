var sys = require('sys');

exports.Game = function(engine, id) {
    this.engine = engine;

    this.nbMaxPlayers = 2;

    this.id = id;
    this.players = [];
    this.first = null;

    this.state = "waiting";
};

exports.Game.prototype = {

    isRunning: function() {
        return ( this.players.length == this.nbMaxPlayers );
    },

    addPlayer: function(player) {
        sys.log('Game.addPlayer');
        this.players.push(player);
        player.joinGame(this);

        //player.client.send(this.engine.am.get)

        if (this.isRunning()) {
            this.state = "playing";
        }

        return this;
    },

    send: function(msg) {
        sys.log('Game.send: '+msg);
        var i = 0,
            l = this.players.length;

        for (; i < l; i++) {
            sys.log(i);
            this.players[i].client.send(msg);
        }

        return this;
    },

    toJSON: function() {
        return {"id": this.id, "player": this.players[0].login};
    },

    getPlayersData: function() {
        var i = 0,
            l = this.players.length,
            res = [];

        for (; i < l; i++) {
            res.push(this.players[i].getData());
        }

        return res;
    },

    getSimpleData: function() {
        return {
            id: this.id,
            player: this.players[0].login,
        };
    },

    getData: function() {
        return {
            id: this.id,
            state: this.state,
            players: this.getPlayersData(),
        };
    },

    choseFirstPlayer: function() {
        this.first = 0;
    },

    onStart: function() {
        this.choseFirstPlayer();
    },

};
