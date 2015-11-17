var Class = require('js-class');
var PIXI = require('pixi.js');

var C = {};
C.Drawable = require('./../components/Drawable');
C.Velocity = require('./../components/Velocity');

var MovementSystem = Class({
  constructor: function(entities) {
    this.entities = entities;
  },

  update: function(dt) {
    var moveables = this.entities.queryComponents([C.Drawable, C.Velocity]);

    moveables.forEach(function(entity) {
      entity.drawable.sprite.position.x += entity.velocity.x * dt;
      entity.drawable.sprite.position.y += entity.velocity.y * dt;
    });
  }
});

if (module) {
  module.exports = MovementSystem;
}
else {
  global.MovementSystem = MovementSystem; // for browser
}
