var sys = require('sys');

exports.Game = function(engine, id) {
    this.engine = engine;

    this.id = id;
    this.players = [];
    this.first = null;
};

exports.Game.prototype = {

    isRunning: function() {
        return ( this.players.length > 1 );
    },

    addPlayer: function(player) {
        this.players.push(player);
        return this;
    },

    toJSON: function() {
        return '{"id": '+this.id+', "player": "'+this.players[0].login+'"}';
    },

    getSimpleData: function() {
        return {
            id: this.id,
            player: this.players[0].login,
        };
    },

};
