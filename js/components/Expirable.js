function Expirable() {
  this.age = 0;
  this.maxAge = 5;
}

if (module) {
  module.exports = Expirable;
}
else {
  global.Expirable = Expirable; // for browser
}
