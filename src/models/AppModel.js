/**
 *  App Model
 *
 *  Initialize game board.
 */

var AppModel = Backbone.Model.extend({
  initialize: function(gridSize) {
    this.set('gridSize', gridSize);
    if (gridSize < 3) {
      gridSize = 3;
    }

    var spaces = [];
    for (var i = 0; i < (gridSize * gridSize); i++) {
      spaces.push(new SpaceModel());
    }

    this.set('grid', new Grid(spaces, gridSize));
  },
});
