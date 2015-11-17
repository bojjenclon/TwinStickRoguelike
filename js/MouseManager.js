var Class = require('js-class');
var Hammer = require('hammerjs');

var MouseManager = Class({
  constructor: function(domElement, interactionManager) {
    this.hammer = new Hammer(domElement);
    this.interactionManager = interactionManager;

    this.isDown = false;
    this.wasPressed = false;

    this.pointer = new PIXI.Point(0, 0);

    this.hammer.get('press').set({
      time: 1
    });

    this.hammer.on('press', function(e) {
      this.isDown = true;

      this.interactionManager.mapPositionToPoint(this.pointer, e.center.x, e.center.y);
    }.bind(this));

    this.hammer.on('panmove', function(e) {
      this.interactionManager.mapPositionToPoint(this.pointer, e.center.x, e.center.y);
    }.bind(this));

    this.hammer.on('pressup', function(e) {
      this.isDown = false;
      this.wasPressed = true;
    }.bind(this));

    this.hammer.on('panend', function(e) {
      this.isDown = false;
      this.wasPressed = true;
    }.bind(this));

    this.hammer.on('tap', function(e) {
      this.isDown = false;
      this.wasPressed = true;
    }.bind(this));
  },

  update: function(dt) {
    this.wasPressed = false;
  }
});

if (module) {
  module.exports = MouseManager;
}
else {
  global.MouseManager = MouseManager; // for browser
}