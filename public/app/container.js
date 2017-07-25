Object.defineProperty(exports, "__esModule", {
  value: true
});

var http = require('./services/http').http;
var factory = require('./component').componentFactory;
var component = require('./component').component;
var login = require('./login').login;
var container = (function() {
    //This should hold all the families that are loaded.
  function container() {
    this.component = component({ selector:'app', template:`<div></div>`});
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

  container.prototype.session = function() {
    http.get('/valid').then(data => {
      if (!data.success) {
        var loginElement = factory.call(login);
      }
    })
  }

  return container;
}()); 

exports.container = container;