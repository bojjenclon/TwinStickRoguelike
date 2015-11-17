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
        EntityFactory.makeBullet({
          x: entity.shoot.targetPos.x,
          y: entity.shoot.targetPos.y,
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