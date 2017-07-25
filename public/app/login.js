Object.defineProperty(exports, "__esModule", {
  value: true
});
var __decorator = require('./decorator').__decorator;
var component = require('./component').component;
var parser = require('./parser').parser;

var login = (function() {
  function login() {
    this.component = component({ selector:'app', templateUrl:`/partials/login`});
  }

  function component(parms) {
    var element = document.createElement(parms.selector);
    if (parms.templateUrl) {
      http.get(parms.templateUrl).then(data => {
        element.innerHTML = data;
      });
    }
    if (parms.template) {
      element.innerHTML = parms.template;
    }
    return {
      element: element,
      moduleId: Math.random()
    };
  }

  return login;
}()); 

exports.login = login;