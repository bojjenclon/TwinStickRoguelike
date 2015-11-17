var Class = require('js-class');
var PIXI = require('pixi.js');
var Stats = require('stats.js');
var Input = require('keypress.js');

var EntityFactory = require('./EntityFactory');

var PlayerInputSystem = require('./systems/PlayerInputSystem');
var MovementSystem = require('./systems/MovementSystem');

Application = Class({
  constructor: function(options) {
    this.virtualWidth = options.virtualWidth;
    this.virtualHeight = options.virtualHeight;

    this.lastTime = Date.now();

    this.inputListener = null;

    this.systems = [];
  },

  start: function() {
    this.container = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(this.virtualWidth, this.virtualHeight);

    this.renderer.view.id = 'gameCanvas';
    this.renderer.view.style.width = window.innerWidth + 'px';
    this.renderer.view.style.height = window.innerHeight + 'px';
    document.body.appendChild(this.renderer.view);

    this.stats = new Stats();

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';
    document.body.appendChild(this.stats.domElement);

    this.inputListener = new Input.keypress.Listener();

    this.systems.push(new PlayerInputSystem(EntityFactory.entities, this.inputListener));
    this.systems.push(new MovementSystem(EntityFactory.entities));

    this.player = EntityFactory.makePlayer({
      imgPath: 'gfx/battleMage.gif',
      x: this.virtualWidth / 2,
      y: this.virtualHeight / 2,
      container: this.container
    });

    this.attachListeners();
    this.run();
  },

  attachListeners: function() {
    window.addEventListener('resize', function(e) {
      this.renderer.view.style.width = window.innerWidth + 'px';
      this.renderer.view.style.height = window.innerHeight + 'px';
    }.bind(this));

    window.addEventListener('keyup', function(e) {
      if (e.keyCode === 13) {
        var elem = this.renderer.view;
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
    var dt = (now - this.lastTime) / 1000;
    this.lastTime = now;

    this.stats.begin();

    this.systems.forEach(function(system) {
      system.update(dt);
    });

    this.renderer.render(this.container);

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

