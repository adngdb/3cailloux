var sys = require('sys');

exports.Player = function(game, client) {
    this.game = game;
    this.client = client;

    this.login = 'player';
    this.score = 3;
    this.currentNumber = null;
    this.currentTotal = null;
    this.ready = false;
};

exports.Player.prototype = {
};
