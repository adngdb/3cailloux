function Engine() {

    this.config = null;

    this.socket = null;
    this.events = null;
    this.mp = null;
    this.displayer = new Displayer(this);

    this.games = [];
    this.currentGame = null;

    this.player = null;

    this.mp = new MessageParser(this);
};

Engine.prototype = {

    loadConfig: function() {
        this.config = new Config(this).load();
        return this;
    },

    /**
     * Launches the game: connects to the server and waits for data.
     */
    launch: function() {
        log("Game: launch");
        this.displayer.changeState(STATE_CONNECTING);
        this.mp = new MessageParser(this);

        this.events = new Events(this);
        this.events.bindAll();

        this.socket = new Socket(this, this.mp);
        this.socket.init();

        return this;
    },

    /**
     * Sets a callback function when the game is ready.
     * @param callback Function to call.
     */
    ready: function(callback) {
        this.onReady = callback;
    },

    authenticate: function() {
        var login = prompt("Please enter your username", '');
        this.socket.send(this.mp.getLogin(login));
        return this;
    },

    confirmAuthentication: function(data) {
        log('Engine.confirmAuthentication: ' + data.login);
        this.player = data;

        $("#whoami").text(this.player.login);

        this.getGamesList();
    },

    getGamesList: function() {
        this.socket.send(this.mp.getGamesList());
    },

    setGamesList: function(data) {
        this.games = data;
        this.displayer.displayGamesList();
    },

    createGame: function() {
        log('Engine.createGame');
        this.socket.send(this.mp.getCreateGame());
    },

    joinGame: function(gameId) {
        log('Engine.joinGame');
        this.socket.send(this.mp.getJoinGame(gameId));
    },

    onJoinGame: function(gameData) {
        log('Engine.onJoinGame');
        this.currentGame = gameData;
        this.displayer.displayGame();
    },

    setGame: function(game) {
        log('Engine.setGame');
        this.currentGame = game;
        this.displayer.displayGame();
    },

};

function log(msg) {
    $('#log').append('<li>' + msg + '</li>');
}
