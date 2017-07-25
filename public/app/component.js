Object.defineProperty(exports, '__esModule', {
  value: true
});
var http = require('./services/http').http;

var component = function(value, parent) {
  return function() {
    var finalParent = document.body;
    var element = document.createElement(value.selector);
    if (value.templateUrl) {
      http.get(value.templateUrl).then(data => {
        element.innerHTML = data;
        if (parent) {
          finalParent = document.getElementsByTagName(parent);
        }
      });
    }
    if (value.template) {
      element.innerHTML = value.template;
    }

    finalParent.appendChild(element);
  }
}

exports.component = component;

var componentFactory = function(type) {
    var instance = new type();
    instace.init();
}

exports.componentFactory = componentFactory;