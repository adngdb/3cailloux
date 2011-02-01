var sys = require('sys');

exports.Player = function(client) {
    this.game = null;
    this.client = client;

    this.id = this.client.id;
    this.login = 'player';
    this.score = 3;
    this.currentNumber = null;
    this.currentTotal = null;
    this.ready = false;
};

exports.Player.prototype = {
};
