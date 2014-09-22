/**
 *  Space View
 *
 *  View for a current space in the grid.
 */

var SpaceView = Backbone.View.extend({
  tagName: 'div',
  className: 'space',
  initialize: function() {
    this.model.on('change', this.render, this);
  },
  events: {
    'click': function() {
      this.model.activated();  
    }
  },
  render: function() {
    var state = this.model.get('state');
    var html = $('<div class="state">' + state + '</div>');

    state === 'x' && html.addClass('x');
    state === 'o' && html.addClass('o');

    return this.$el.html(html);
  }
});
