var Class = require('js-class');
var PIXI = require('pixi.js');

var C = {};
C.Drawable = require('./../components/Drawable');
C.Velocity = require('./../components/Velocity');

var PlayerInputSystem = Class({
  constructor: function(entities, inputListener) {
    this.entities = entities;
    this.inputListener = inputListener;

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
    }.bind(this));

    for (var key in this.actionPressed) {
      this.actionPressed[key] = false;
    }
  },

  setupWASD: function() {
    this.inputListener.register_combo({
      keys: 'a',
      on_keydown: function() {
        this.actionDown['left'] = true;
      },
      on_keyup: function() {
        this.actionDown['left'] = false;
        this.actionPressed['left'] = true;
      },
      this: this,
      prevent_repeat: true
    });

    this.inputListener.register_combo({
      keys: 'd',
      on_keydown: function() {
        this.actionDown['right'] = true;
      },
      on_keyup: function() {
        this.actionDown['right'] = false;
        this.actionPressed['right'] = true;
      },
      this: this,
      prevent_repeat: true
    });

    this.inputListener.register_combo({
      keys: 'w',
      on_keydown: function() {
        this.actionDown['up'] = true;
      },
      on_keyup: function() {
        this.actionDown['up'] = false;
        this.actionPressed['up'] = true;
      },
      this: this,
      prevent_repeat: true
    });

    this.inputListener.register_combo({
      keys: 's',
      on_keydown: function() {
        this.actionDown['down'] = true;
      },
      on_keyup: function() {
        this.actionDown['down'] = false;
        this.actionPressed['down'] = true;
      },
      this: this,
      prevent_repeat: true
    });
  },

  setupArrows: function() {
    this.inputListener.register_combo({
      keys: 'left',
      on_keydown: function() {
        this.actionDown['left'] = true;
      },
      on_keyup: function() {
        this.actionDown['left'] = false;
        this.actionPressed['left'] = true;
      },
      this: this,
      prevent_repeat: true
    });

    this.inputListener.register_combo({
      keys: 'right',
      on_keydown: function() {
        this.actionDown['right'] = true;
      },
      on_keyup: function() {
        this.actionDown['right'] = false;
        this.actionPressed['right'] = true;
      },
      this: this,
      prevent_repeat: true
    });

    this.inputListener.register_combo({
      keys: 'up',
      on_keydown: function() {
        this.actionDown['up'] = true;
      },
      on_keyup: function() {
        this.actionDown['up'] = false;
        this.actionPressed['up'] = true;
      },
      this: this,
      prevent_repeat: true
    });

    this.inputListener.register_combo({
      keys: 'down',
      on_keydown: function() {
        this.actionDown['down'] = true;
      },
      on_keyup: function() {
        this.actionDown['down'] = false;
        this.actionPressed['down'] = true;
      },
      this: this,
      prevent_repeat: true
    });
  }
});

if (module) {
  module.exports = PlayerInputSystem;
}
else {
  global.PlayerInputSystem = PlayerInputSystem; // for browser
}


