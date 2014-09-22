/**
 *  Grid (Collection)
 *
 *  Collection of all the spaces on the game board.
 *  Holds all the internal game logic.
 */

var Grid = Backbone.Collection.extend({
  model: SpaceModel,
  count: 0,       // Store the number of elapsed turns.
  gridSize: 0,    // Store the size of the board.
  initialize: function(models, gridSize){
    this.gridSize = gridSize;

    this.on('activated', function(model) {    // Fires whenever a space is clicked.
      if (model.isSet()) {
        // Add an animation?
      } else {
        this.count++;
        
        // Set the current space appropriately.
        var currentTurn = this.checkTurnState() ? 'x' : 'o';
        currentTurn === 'x' ? model.setX() : model.setO();

        // Check for an end game condition.
        if (this.checkForEndCondition()) {
          alert('Winner: ' + currentTurn.toUpperCase());
          this.resetBoard();
        } else if (this.count === (gridSize * gridSize)) {    // Check if current board is filled.
          alert('Cat\'s game.');
          this.resetBoard();
        }

      }
    });
  },
  checkTurnState: function() {
    return (this.count % 2);    // Turn state: 0 = 'x', 1 = 'o'
  },
  checkForEndCondition: function() {
    if (this.count >= ((this.gridSize * 2) - 1)) {    // Don't check for a win if enough turns haven't passed.
      return this.checkTurnState() ? this.checkForWin('x') : this.checkForWin('o');
    }
    return false;
  },
  checkForWin: function(currentTurn) {
    return (this.checkRows(currentTurn) || this.checkColumns(currentTurn) || this.checkDiagonals(currentTurn)) ? true : false;
  },
  // Check for row win conditions
  checkRows: function(currentTurn) {
    var size = this.gridSize;
    var grid = this.models;

    for (var i = 0; i < size; i++) {
      var currentCount = 0;
      for (var j = (i * size); j < ((i * size) + size); j++) {
        if (grid[j].get('state') === currentTurn) { currentCount++; }
      }
      if (currentCount === size) { return true; }
    }
    return false;
  },
  // Check for column win conditions
  checkColumns: function(currentTurn) {
    var size = this.gridSize;
    var grid = this.models;

    for (var i = 0; i < size; i++) {
      var currentCount = 0;
      for (var j = i; j <= (((size * size) - size) + i) ; j = j + size) {
        if (grid[j].get('state') === currentTurn) { currentCount++; }
      }
      if (currentCount === size) { return true; }
    }
    return false;
  },
  // Check diagonals for a win
  checkDiagonals: function(currentTurn) {
    var size = this.gridSize;
    var grid = this.models;

    // Check top left --> bottom right diagonal
    var currentCount = 0;
    for (var i = 0, j = 0; j < size; i = (i + (size + 1)), j++) {
      if (grid[i].get('state') === currentTurn) { currentCount++; }
    }
    if (currentCount === size) { return true; }

    // Check top right --> bottom left diagonal
    currentCount = 0;
    for (var i = (size - 1), j = 0; j < size; i = (i + (size - 1)), j++) {
      if (grid[i].get('state') === currentTurn) { currentCount++; }
    }
    if (currentCount === size) { return true; }

    return false;
  },
  resetBoard: function() {
    this.count = 0;
    this.models.map(function(space) {
      space.resetSpace();
    });
  }
});
