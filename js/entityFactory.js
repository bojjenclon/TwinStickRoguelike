var EntityManager = require('tiny-ecs').EntityManager;

var C = {};
C.Drawable = require('./components/Drawable');
C.Velocity = require('./components/Velocity');

var EntityFactory = {};

EntityFactory.entities = new EntityManager();

EntityFactory.makePlayer = function(options) {
  var player = EntityFactory.entities.createEntity();

  player.addTag('player');

  player.addComponent(C.Drawable);
  player.addComponent(C.Velocity);

  player.drawable.texture = PIXI.Texture.fromImage(options.imgPath);
  player.drawable.sprite = new PIXI.Sprite(player.drawable.texture);

  player.drawable.sprite.anchor.x = 0.5;
  player.drawable.sprite.anchor.y = 0.5;

  player.drawable.sprite.position.x = options.x || 0;
  player.drawable.sprite.position.y = options.y || 0;

  if (options.stage) {
    options.stage.addChild(player.drawable.sprite);
  }

  return player;
};

if (module) {
  module.exports = EntityFactory;
}
else {
  global.EntityFactory = EntityFactory; // for browser
}

