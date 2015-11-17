var Class = require('js-class');

var C = {};
C.Drawable = require('./../components/Drawable');
C.Expirable = require('./../components/Expirable');

var ExpirableSystem = Class({
  constructor: function(entities) {
    this.entities = entities;
  },

  update: function(dt) {
    var expirables = this.entities.queryComponents([C.Drawable, C.Expirable]);

    expirables.forEach(function(entity) {
      if (entity.expirable.age < entity.expirable.maxAge) {
        entity.expirable.age += dt;
      }
      else {
        entity.drawable.stage.removeChild(entity.drawable.sprite);

        this.entities.removeEntity(entity);
      }
    }.bind(this));
  }
});

if (module) {
  module.exports = ExpirableSystem;
}
else {
  global.ExpirableSystem = ExpirableSystem; // for browser
}