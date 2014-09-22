/**
 *  Grid View
 *
 *  View of the entire grid. 
 */

var GridView = Backbone.View.extend({
  className: 'grid-container',
  render: function(){
    for (var i = 0; i < this.collection.length; i++) {
      // if (i % this.collection.gridSize === (this.collection.gridSize)) { this.$el.append($('<div class="clear"></div>')); }

      // Make sure correct borders are rendered.
      var tempSpace = new SpaceView({model: this.collection.models[i]}).render();
      if (i % this.collection.gridSize !== (this.collection.gridSize - 1)) {
        tempSpace.addClass('border-right');
      }
      if (i < ((this.collection.gridSize * this.collection.gridSize) - this.collection.gridSize)) {
        tempSpace.addClass('border-bottom');
      }

      this.$el.append(tempSpace);
    }

    // Scale the board width depending on the size of the grid.
    this.$el.css({
      'width': (this.collection.gridSize * 101),
      // 'height': (this.collection.gridSize * 101)
    });

    return this.$el;
  }
});
