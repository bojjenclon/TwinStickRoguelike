var Application = require('./Application');

function init() {
  var app = new Application({
    virtualWidth: 1920,
    virtualHeight: 1080
  });

  app.start();
}

document.onload = init();

