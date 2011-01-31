$(document).ready(function() {
    var game = new Game().loadConfig();
    game.ready(function() {
        var cellSize = game.map.cellSize,
            height = game.map.height * cellSize,
            width  = game.map.width * cellSize;

        $('#map').width(width).height(height);
        $('#players').width(width);

        for (var i = 0; i < game.config.players.number; i++) {
            $('#p'+(i+1)).css('color', game.config.players.colors[i]);
        }
    });
});
