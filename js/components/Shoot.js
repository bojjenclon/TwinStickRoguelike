var PIXI = require('pixi.js');

function Shoot() {
  this.canShoot = true;
  this.isShooting = false;
  this.shootDelay = 0;
  this.delayCap = 1;
  this.targetPos = new PIXI.Point(0, 0);
}

if (module) {
  module.exports = Shoot;
}
else {
  global.Shoot = Shoot; // for browser
}
