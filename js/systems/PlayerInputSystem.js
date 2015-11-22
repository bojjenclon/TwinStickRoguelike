var Class = require('js-class');
var PIXI = require('pixi.js');

var C = {};
C.Drawable = require('./../components/Drawable');
C.Velocity = require('./../components/Velocity');
C.Shoot = require('./../components/Shoot');

var PlayerInputSystem = Class({
  constructor: function(entities, inputListener, mouseManager) {
    this.entities = entities;
    this.inputListener = inputListener;
    this.mouseManager = mouseManager;

    this.actionMapping = {
      'left': 'a',
      'right': 'd',
      'up': 'w',
      'down': 's'
    };

    this.actionDown = {
      'left': false,
      'right': false,
      'up': false,
      'down': false
    };

    this.actionPressed = {
      'left': false,
      'right': false,
      'up': false,
      'down': false
    };

    this.setupWASD();
    //this.setupArrows();
  },

  update: function(dt) {
    var players = this.entities.queryTag('player');

    players.forEach(function(entity) {
      if (this.actionDown['left']) {
        entity.velocity.x = -60;
      }
      else if (this.actionDown['right']) {
        entity.velocity.x = 60;
      }
      else {
        entity.velocity.x = 0;
      }

      if (this.actionDown['up']) {
        entity.velocity.y = -60;
      }
      else if (this.actionDown['down']) {
        entity.velocity.y = 60;
      }
      else {
        entity.velocity.y = 0;
      }

      if (this.mouseManager.isDown.left && entity.shoot.canShoot) {
        entity.shoot.canShoot = false;
        entity.shoot.isShooting = true;

        entity.shoot.targetPos.copy(this.mouseManager.pointer);
      }
    }.bind(this));

    for (var key in this.actionPressed) {
      if (this.actionPressed.hasOwnProperty(key)) {
        this.actionPressed[key] = false;
      }
    }
  },

  bindAction: function(key, action) {
    if (this.actionMapping[action] !== key) {
      this.inputListener.unregister_combo(this.actionMapping[action]);
    }

    this.actionMapping[action] = key;

    this.inputListener.register_combo({
      keys: key,
      on_keydown: function() {
        this.actionDown[action] = true;
      },
      on_keyup: function() {
        this.actionDown[action] = false;
        this.actionPressed[action] = true;
      },
      this: this,
      prevent_repeat: true
    });
  },

  setupWASD: function() {
    this.bindAction('a', 'left');
    this.bindAction('d', 'right');
    this.bindAction('w', 'up');
    this.bindAction('s', 'down');
  },

  setupArrows: function() {
    this.bindAction('left', 'left');
    this.bindAction('right', 'right');
    this.bindAction('up', 'up');
    this.bindAction('down', 'down');
  }
});

if (module) {
  module.exports = PlayerInputSystem;
}
else {
  global.PlayerInputSystem = PlayerInputSystem; // for browser
}


