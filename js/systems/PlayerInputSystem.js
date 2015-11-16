var hitagi = require('hitagi.js');
var Class = require('js-class');

/*var PlayerInputSystem = Class({
  constructor: function(controlsSystem) {
    this.controlsSystem = controlsSystem;

    this.update = {
      player: function(entity, dt) {
        if (this.controlsSystem.check('left')) {
          entity.c.velocity.xspeed = -60;
        }
        else if (this.controlsSystem.check('right')) {
          entity.c.velocity.xspeed = 60;
        }
        else {
          entity.c.velocity.xspeed = 0;
        }
      }.bind(this)
    }
  }
});*/

var PlayerInputSystem = function(controlsSystem) {
  this.controlsSystem = controlsSystem;

  this.update = {
    player: function(entity, dt) {
      if (this.controlsSystem.check('left')) {
        entity.c.velocity.xspeed = -60;
      }
      else if (this.controlsSystem.check('right')) {
        entity.c.velocity.xspeed = 60;
      }
      else {
        entity.c.velocity.xspeed = 0;
      }

      if (this.controlsSystem.check('up')) {
        entity.c.velocity.yspeed = -60;
      }
      else if (this.controlsSystem.check('down')) {
        entity.c.velocity.yspeed = 60;
      }
      else {
        entity.c.velocity.yspeed = 0;
      }
    }.bind(this)
  }
};

if (module) {
  module.exports = PlayerInputSystem;
}
else {
  global.PlayerInputSystem = PlayerInputSystem; // for browser
}


