var Class = require('js-class');

var C = {};
C.Shoot = require('./../components/Shoot');

var EntityFactory = require('./../EntityFactory');

var ShootSystem = Class({
  constructor: function(entities) {
    this.entities = entities;
  },

  update: function(dt) {
    var shooters = this.entities.queryComponents([C.Shoot]);

    shooters.forEach(function(entity) {
      if (entity.shoot.isShooting) {
        var direction = new PIXI.Point();
        direction.copy(entity.drawable.sprite.position);

        direction.x -= entity.shoot.targetPos.x;
        direction.y -= entity.shoot.targetPos.y;

        var magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);

        direction.x /= magnitude;
        direction.y /= magnitude;

        var velocity = new PIXI.Point(-120 * direction.x, -120 * direction.y);

        EntityFactory.makeBullet({
          x: entity.drawable.sprite.position.x,
          y: entity.drawable.sprite.position.y,
          velocity: velocity,
          imgPath: "gfx/battleMage.gif",
          stage: Application.currentStage
        });

        entity.shoot.isShooting = false;
      }
      else if (entity.shoot.canShoot === false) {
        if (entity.shoot.shootDelay < entity.shoot.delayCap) {
          entity.shoot.shootDelay += dt;
        }
        else {
          entity.shoot.canShoot = true;
          entity.shoot.shootDelay = 0;
        }
      }

    });
  }
});

if (module) {
  module.exports = ShootSystem;
}
else {
  global.ShootSystem = ShootSystem; // for browser
}