/**
 *  App View
 *
 *  Render game board.
 */

var AppView = Backbone.View.extend({
  className: 'app-container',
  initialize: function() {
    this.gridView = new GridView({
      collection: this.model.get('grid')
    });
  },
  render: function() {
    if (window.innerHeight > (this.model.get('gridSize') * 101)) {    // Don't try and vertical align if board dimensions are too big.
      this.$el.addClass('v-align');
    }
    return this.$el.html(this.gridView.render());
  }

});
