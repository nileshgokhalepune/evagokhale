var controllers = {};

window.onload = function() {
  //fireup app on load.
  console.log(config);
  if (controllers.container) {
    controllers.container.init();
  }
}