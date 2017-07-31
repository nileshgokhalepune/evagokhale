var controllers = (function() {
  function controllers() {
  }
  controllers.prototype.newup = function(what) {
    return new this[what](config);
  }
  return new controllers();
}());

window.onload = function() {
  //fireup app on load.
  console.log(config);
  if (controllers.container) {
    controllers.container.init();
  }
}