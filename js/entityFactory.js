var EntityManager = require('tiny-ecs').EntityManager;

var C = {};
C.Drawable = require('./components/Drawable');
C.Velocity = require('./components/Velocity');
C.Shoot = require('./components/Shoot');

var EntityFactory = {};

EntityFactory.entities = new EntityManager();

EntityFactory.makePlayer = function(options) {
  var player = EntityFactory.entities.createEntity();

  player.addTag('player');

  player.addComponent(C.Drawable);
  player.addComponent(C.Velocity);
  player.addComponent(C.Shoot);

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

EntityFactory.makeBullet = function(options) {
  var bullet = EntityFactory.entities.createEntity();

  bullet.addTag('bullet');

  bullet.addComponent(C.Drawable);
  bullet.addComponent(C.Velocity);

  bullet.drawable.texture = PIXI.Texture.fromImage(options.imgPath);
  bullet.drawable.sprite = new PIXI.Sprite(bullet.drawable.texture);

  bullet.drawable.sprite.anchor.x = 0.5;
  bullet.drawable.sprite.anchor.y = 0.5;

  bullet.drawable.sprite.position.x = options.x || 0;
  bullet.drawable.sprite.position.y = options.y || 0;

  bullet.velocity.x = options.velocity.x;
  bullet.velocity.y = options.velocity.y;

  if (options.stage) {
    options.stage.addChild(bullet.drawable.sprite);
  }

  return bullet;
};

if (module) {
  module.exports = EntityFactory;
}
else {
  global.EntityFactory = EntityFactory; // for browser
}

