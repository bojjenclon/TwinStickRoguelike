var ResourceManager = {};

ResourceManager.textures = {};

ResourceManager.getTexture = function(path) {
  if (!(path in this.textures)) {
    this.textures[path] = PIXI.Texture.fromImage(path);
  }

  return this.textures[path];
};

if (module) {
  module.exports = ResourceManager;
}
else {
  global.ResourceManager = ResourceManager; // for browser
}

