var Application = require('./Application');

function init() {
  var app = new Application({
    virtualWidth: 1920,
    virtualHeight: 1080,
    domContainer: document.getElementById('applicationContainer')
  });

  app.start();
}

document.onload = init();

