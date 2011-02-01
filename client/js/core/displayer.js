// Constants for current state
const   STATE_LOADING_CONFIG = "Loading configuration...",
        STATE_CONNECTING = "Connecting to server...",
        STATE_RECEIVING_DATA = "Connected. Receiving data...";

function Displayer(engine) {
    this.engine = engine;

    this.loadingStateElt = $('#loading-state');
    this.contentElt = $('#content');
    this.statsElt = $('#stats');

    this.gamesListTpl = $('#gamesListTemplate');
};

Displayer.prototype = {

    getTemplate: function(tpl) {
    },

    displayGamesList: function() {
        this.resetContent();
        var games = {games: this.engine.games};
        this.gamesListTpl.tmpl(games).appendTo(this.contentElt);
    },

    changeState: function(state) {
        this.loadingStateElt.text(state);
    },

    resetContent: function() {
        this.contentElt.empty();
    },

    resetStats: function() {
        this.statsElt.empty();
    },

};
