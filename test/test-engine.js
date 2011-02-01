var engine_ = require('../lib/engine')
    player_ = require('../lib/player');

exports.testCreateGame = function(test) {
    var e = new engine_.Engine();
    var p = {
        id: 23,
        login: "player",
    };
    e.createGame(p);
    test.equal(e.games.length, 1);
    test.done();
};

exports.testMultipleCreateGame = function(test) {
    var e = new engine_.Engine();
    var p = {
        id: 23,
        login: "player",
    };
    e.createGame(p);
    e.createGame(p);
    e.createGame(p);
    test.equal(e.games.length, 3);
    test.equal(e.games[0].id, 0);
    test.equal(e.games[1].id, 1);
    test.equal(e.games[2].id, 2);
    test.done();
};

exports.testGetGamesList = function(test) {
    var e = new engine_.Engine();
    var p = {
        id: 23,
        login: "player",
    };
    e.createGame(p);
    test.equal(e.getGamesList(), '{"games": [{"id": 0, "player": "player"}, ]}');
    test.done();
};
