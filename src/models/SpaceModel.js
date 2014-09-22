/**
 *  Space Model
 *
 *  Model for single space on the board.
 */

var SpaceModel = Backbone.Model.extend({
  initialize: function() {
    this.resetSpace();
  },
  setX: function() {
    this.set('state', 'x');
  },
  setO: function() {
    this.set('state', 'o');
  },
  isSet: function() {
    return this.get('state') === '' ? false : true;
  },
  activated: function() {
    this.trigger('activated', this);
  },
  resetSpace: function() {
    this.set('state', '');
  }
});
