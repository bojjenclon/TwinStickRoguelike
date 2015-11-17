function Drawable() {
  this.texture = null;
  this.sprite = null;
}

if (module) {
  module.exports = Drawable;
}
else {
  global.Drawable = Drawable; // for browser
}
