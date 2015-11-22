var Class = require('js-class');

var MouseManager = Class({
  constructor: function(canvasElement, interactionManager) {
    this.canvasElement = canvasElement;
    this.interactionManager = interactionManager;

    this.isDown = false;
    this.wasPressed = false;

    this.pointer = new PIXI.Point(0, 0);

    this.canvasElement.addEventListener('mousedown', function(e) {
      this.isDown = true;

      this.interactionManager.mapPositionToPoint(this.pointer, e.x, e.y);
    }.bind(this));

    this.canvasElement.addEventListener('mousemove', function(e) {
      this.interactionManager.mapPositionToPoint(this.pointer, e.x, e.y);
    }.bind(this));

    this.canvasElement.addEventListener('mouseup', function(e) {
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