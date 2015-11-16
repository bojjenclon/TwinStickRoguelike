var hitagi = require('hitagi.js');

EntityFactory = function() {};

EntityFactory.makePlayer = function(options) {
  var player = new hitagi.Entity();

  player.attach({
    $id: 'player'
  });

  player.attach(new hitagi.components.Position({
    x: options.x || 0,
    y: options.y || 0
  }));

  player.attach(new hitagi.components.graphics.Graphic());
  player.attach(new hitagi.components.graphics.StaticSprite({
    path: 'gfx/battlemage.gif'
  }));

  player.attach(new hitagi.components.Velocity({
    xspeed: 0,
    yspeed: 0
  }));

  return player;
};

if (module) {
  module.exports = EntityFactory;
}
else {
  global.EntityFactory = EntityFactory; // for browser
}

