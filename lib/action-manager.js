var sys = require('sys');

exports.ActionManager = function(engine) {
    this.engine = engine;
};

exports.ActionManager.prototype = {

    getMessage: function(method, data) {
        var msg = {
            type: method,
            data: data
        };

        return JSON.stringify(msg);
    },

    getQuery: function(responseMethod, responseData) {
        var data = responseData;
        data.method = responseMethod;
        return this.getMessage("query", data);
    },

    getAction: function() {
        return null;
    },

    getPlayerLogin: function(player) {
        return this.getQuery("login", {});
    },

};
