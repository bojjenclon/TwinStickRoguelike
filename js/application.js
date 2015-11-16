var Class = require('js-class');
var hitagi = require('hitagi.js');

var EntityFactory = require('./entityFactory');

Application = Class({
  constructor: function(options) {
    this.virtualWidth = options.virtualWidth;
    this.virtualHeight = options.virtualHeight;

    this.lastTime = Date.now();
  },

  start: function() {
    this.world = new hitagi.World();

    this.renderSystem = new hitagi.systems.PixiRenderSystem({
      width: this.virtualWidth,
      height: this.virtualHeight
    });
    this.world.register(this.renderSystem);

    document.body.appendChild(this.renderSystem.view);
    this.renderSystem.view.id = 'gameCanvas';
    this.renderSystem.view.style.width = window.innerWidth + 'px';
    this.renderSystem.view.style.height = window.innerHeight + 'px';

    this.controlsSystem = this.world.register(new hitagi.systems.ControlsSystem());

    this.controlsSystem.bind(37, 'left');
    this.controlsSystem.bind(39, 'right');

    this.player = EntityFactory.makePlayer({
      x: this.virtualWidth / 2,
      y: this.virtualHeight / 2
    });
    this.world.add(this.player);

    this.attachListeners();
    this.run();
  },

  attachListeners: function() {
    window.addEventListener('resize', function(e) {
      this.renderSystem.view.style.width = window.innerWidth + 'px';
      this.renderSystem.view.style.height = window.innerHeight + 'px';
    }.bind(this));

    window.addEventListener('keyup', function(e) {
      if (e.keyCode === 13) {
        var elem = this.renderSystem.view;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        }
        else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
        else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        }
        else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        }
      }
    }.bind(this));
  },

  run: function() {
    var now = Date.now();
    var dt = now - this.lastTime;
    this.lastTime = now;

    // Update the world.
    this.world.tick(dt);

    // Render.
    this.renderSystem.render();

    requestAnimationFrame(this.run.bind(this));
  }
});

if (module) {
  module.exports = Application;
}
else {
  global.Application = Application; // for browser
}

