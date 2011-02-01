function Engine() {

    this.initialized = false;

    this.config = null;

    this.socket = null;
    this.events = null;
    this.mp = null;

    this.games = [];
    this.currentGame = null;

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
        $('#loading-state').text("Connecting to server...");
        this.mp = new MessageParser(this);

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

    /**
     * Initializes the Game object
     */
    init: function(data) {
        log("Game: init");
        if (this.initialized == false)
        {
            this.events = new Events(this);
            this.events.bindAll();

            this.map = new Map(this, data);

            this.onReady.call();

            this.initialized = true;
        }
        return this;
    },

    authenticate: function() {
        var login = prompt("Please enter your username", '');
        this.socket.send(this.mp.getLogin(login));
        return this;
    },

};
