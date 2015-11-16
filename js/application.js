var Class = require('js-class');
var hitagi = require('hitagi.js');
var Stats = require('stats.js');

var EntityFactory = require('./EntityFactory');

var PlayerInputSystem = require('./systems/PlayerInputSystem');

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

    this.renderSystem.view.id = 'gameCanvas';
    this.renderSystem.view.style.width = window.innerWidth + 'px';
    this.renderSystem.view.style.height = window.innerHeight + 'px';
    document.body.appendChild(this.renderSystem.view);

    this.stats = new Stats();

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';
    document.body.appendChild(this.stats.domElement);

    this.controlsSystem = this.world.register(new hitagi.systems.ControlsSystem());

    // arrow keys
    /*this.controlsSystem.bind(37, 'left');
    this.controlsSystem.bind(39, 'right');
    this.controlsSystem.bind(38, 'up');
    this.controlsSystem.bind(40, 'down');*/

    // WASD
    this.controlsSystem.bind(65, 'left');
    this.controlsSystem.bind(68, 'right');
    this.controlsSystem.bind(87, 'up');
    this.controlsSystem.bind(83, 'down');


    this.world.register(new PlayerInputSystem(this.controlsSystem));
    this.world.register(new hitagi.systems.VelocitySystem());

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

    this.stats.begin();

    // Update the world
    this.world.tick(dt);

    // Render
    this.renderSystem.render();

    this.stats.end();

    requestAnimationFrame(this.run.bind(this));
  }
});

if (module) {
  module.exports = Application;
}
else {
  global.Application = Application; // for browser
}

