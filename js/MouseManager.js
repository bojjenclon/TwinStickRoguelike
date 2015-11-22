var Class = require('js-class');

var MouseManager = Class({
  constructor: function(canvasElement, interactionManager) {
    this.canvasElement = canvasElement;
    this.interactionManager = interactionManager;

    this.isDown = {
      left: false,
      right: false
    };
    this.wasPressed = {
      left: false,
      right: false
    };

    this.pointer = new PIXI.Point(0, 0);

    this.canvasElement.addEventListener('mousedown', function(e) {
      if (e.button === MouseManager.MOUSE_LEFT) {
        this.isDown.left = true;
      }
      else if (e.button === MouseManager.MOUSE_RIGHT) {
        this.isDown.right = true;
      }

      this.interactionManager.mapPositionToPoint(this.pointer, e.x, e.y);
    }.bind(this));

    this.canvasElement.addEventListener('mousemove', function(e) {
      this.interactionManager.mapPositionToPoint(this.pointer, e.x, e.y);
    }.bind(this));

    this.canvasElement.addEventListener('mouseup', function(e) {
      if (e.button === MouseManager.MOUSE_LEFT) {
        this.isDown.left = false;
        this.wasPressed.left = true;
      }
      else if (e.button === MouseManager.MOUSE_RIGHT) {
        this.isDown.right = false;
        this.wasPressed.right = true;
      }
    }.bind(this));
  },

  update: function(dt) {
    this.wasPressed = false;
  }
}, {
  statics: {
    MOUSE_LEFT: 0,
    MOUSE_RIGHT: 2
  }
});

if (module) {
  module.exports = MouseManager;
}
else {
  global.MouseManager = MouseManager; // for browser
}