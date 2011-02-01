var game_ = require('../lib/game');

exports.testToJSON = function(test) {
    var g = new game_.Game(null, 23);
    g.addPlayer({id: 12, login: "player"});
    test.equal(g.toJSON(), '{"id": 23, "player": "player"}');
    test.done();
};
