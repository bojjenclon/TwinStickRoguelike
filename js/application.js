var Class = require('js-class');
var PIXI = require('pixi.js');
var Stats = require('stats.js');
var Input = require('keypress.js');
var BigScreen = require('bigscreen');

var EntityFactory = require('./EntityFactory');
var MouseManager = require('./MouseManager');

var PlayerInputSystem = require('./systems/PlayerInputSystem');
var MovementSystem = require('./systems/MovementSystem');
var ShootSystem = require('./systems/ShootSystem');
var ExpirableSystem = require('./systems/ExpirableSystem');

Application = Class({
  constructor: function(options) {
    this.virtualWidth = options.virtualWidth;
    this.virtualHeight = options.virtualHeight;

    this.domContainer = options.domContainer;

    this.lastTime = Date.now();

    this.inputListener = null;
    this.mouseManager = null;

    this.systems = [];
  },

  start: function() {
    Application.currentStage = this.stage = new PIXI.Container();
    this.renderer = PIXI.autoDetectRenderer(this.virtualWidth, this.virtualHeight);

    this.renderer.view.id = 'gameCanvas';
    this.renderer.view.style.width = window.innerWidth + 'px';
    this.renderer.view.style.height = window.innerHeight + 'px';
    this.domContainer.appendChild(this.renderer.view);

    this.stats = new Stats();

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';
    this.domContainer.appendChild(this.stats.domElement);

    this.inputListener = new Input.keypress.Listener();
    //this.mouseManager = new MouseManager(this.renderer.view);
    this.mouseManager = new MouseManager(this.renderer.view, this.renderer.plugins.interaction);

    this.playerInput = new PlayerInputSystem(EntityFactory.entities, this.inputListener, this.mouseManager);

    this.systems.push(this.playerInput);
    this.systems.push(new MovementSystem(EntityFactory.entities));
    this.systems.push(new ShootSystem(EntityFactory.entities));
    this.systems.push(new ExpirableSystem(EntityFactory.entities));

    this.player = EntityFactory.makePlayer({
      imgPath: 'gfx/battleMage.gif',
      x: this.virtualWidth / 2,
      y: this.virtualHeight / 2,
      stage: this.stage
    });

    this.attachListeners();
    this.run();

    // press numpad-0 to switch between WASD and Arrow Key movement
    // used to demonstrate the ability to dynamically rebind/remap keys/actions
    this.iswasd = true;
    this.inputListener.register_combo({
      keys: 'num_0',
      on_keydown: function() {
        this.iswasd = !this.iswasd;

        if (this.iswasd) {
          this.playerInput.setupWASD();
        }
        else {
          this.playerInput.setupArrows();
        }
      },
      this: this,
      prevent_repeat: true
    });
  },

  attachListeners: function() {
    window.addEventListener('resize', function(e) {
      this.renderer.view.style.width = window.innerWidth + 'px';
      this.renderer.view.style.height = window.innerHeight + 'px';
    }.bind(this));

    this.inputListener.register_combo({
      keys: 'alt enter',
      on_keydown: function() {
        var element = this.renderer.view;

        BigScreen.toggle(this.domContainer);
        //BigScreen.toggle(element, onEnter, onExit, onError);
      },
      this: this,
      prevent_repeat: true
    });
  },

  run: function() {
    var now = Date.now();
    var dt = (now - this.lastTime) / 1000;
    this.lastTime = now;

    this.stats.begin();

    this.systems.forEach(function(system) {
      system.update(dt);
    });

    this.mouseManager.update(dt);

    this.renderer.render(this.stage);

    this.stats.end();

    requestAnimationFrame(this.run.bind(this));
  }
}, {
  statics: {
    currentStage: null
  }
});

if (module) {
  module.exports = Application;
}
else {
  global.Application = Application; // for browser
}

