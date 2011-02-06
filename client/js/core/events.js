function Events(engine) {
    this.engine = engine;
    this.bound = $.browser == 'msie' ? '#map' : window;

    this.createGameBtn = 'button#create-game';
    this.joinGameBtn = 'a.join-game';
}

Events.prototype = {
    bindAll: function() {
        log('Events.bindAll');
        this.bindKeys();
        this.bindCreateGame();
        this.bindJoinGame();
        return this;
    },

    bindKeys: function() {
        var instance = this;
        $(this.bound).keypress(function(e) {
            switch(e.charCode || e.keyCode) {
                case 74: case 106: instance.engine.moveLeft(); break; // J
                case 76: case 108: instance.engine.moveRight(); break; // L
                case 73: case 105: instance.engine.changeShape(); break; // I
            }
            return false;
        });
        return this;
    },

    bindCreateGame: function() {
        $(this.createGameBtn).click(function(e) {
            e.preventDefault();
            this.engine.createGame();
        }.bind(this));
        return this;
    },

    bindJoinGame: function() {
        var instance = this;
        $(this.joinGameBtn).click(function(e) {
            e.preventDefault();
            var gameId = $(this).attr('id').split('-')[1];
            instance.engine.joinGame(gameId);
        });
        return this;
    },
}
