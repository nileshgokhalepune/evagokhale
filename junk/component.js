Object.defineProperty(exports, '__esModule', {
  value: true
});
var http = require('./services/http').http;

var component = function(key,parms) {
  return function(t, n, descriptor) {
    var element = document.createElement(parms.selector);
    if (parms.templateUrl) {
      http.get(parms.templateUrl).then(data => {
        element.innerHTML = data;
      });
    }
    if (parms.template) {
      element.innerHTML = parms.template;
    }
    if(t) t.element = element;
  }
}

exports.component = component;

var componentFactory = function(type) {
  var instance = new type();
  instace.init();
}

exports.componentFactory = componentFactory;