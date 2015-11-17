function Velocity() {
  this.x = 0;
  this.y = 0;
}

if (module) {
  module.exports = Velocity;
}
else {
  global.Velocity = Velocity; // for browser
}
