var sys = require('sys');

exports.PLAYER_STATE = {
    PLAYING: 0,
    WAITING_FOR_OPPONENT: 1,
    WATCHING_LIST: 2,
};

exports.Player = function(client) {
    this.game = null;
    this.client = client;

    this.state = exports.PLAYER_STATE.WATCHING_LIST;

    this.id = this.client.id;
    this.login = 'player';
    this.score = 3;
    this.currentNumber = null;
    this.currentTotal = null;
    this.ready = false;
};

exports.Player.prototype = {

    joinGame: function(game) {
        sys.log('Player.joinGame');
        this.game = game;
        this.state = exports.PLAYER_STATE.WAITING_FOR_OPPONENT;
    },

    getData: function() {
        return {
            id: this.id,
            login: this.login,
            score: this.score,
            ready: this.ready,
        };
    },
};
