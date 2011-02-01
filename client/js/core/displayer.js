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
    this.gamesListStatsTpl = $('#gamesListStatsTemplate');
};

Displayer.prototype = {

    displayGamesList: function() {
        this.resetContent();
        this.resetStats();
        var games = {games: this.engine.games};
        this.gamesListTpl.tmpl(games).appendTo(this.contentElt);
        this.gamesListStatsTpl.tmpl().appendTo(this.statsElt);

        this.engine.events.bindAll();
        return this;
    },

    changeState: function(state) {
        this.loadingStateElt.text(state);
        return this;
    },

    resetContent: function() {
        this.contentElt.empty();
        return this;
    },

    resetStats: function() {
        this.statsElt.empty();
        return this;
    },

};
