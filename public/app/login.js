Object.defineProperty(exports, "__esModule", {
  value: true
});

var __decorator = require('./decorator').__decorator;
var component = require('./component').component;
var parser = require('./parser').parser;
var http = require('./services/http').http;

var login = (function() {
  function login() {
    this.component = component({
      selector: 'login',
      templateUrl: `/partials/login`
    });
  }

  function component(parms) {
    var element = document.createElement(parms.selector);
    if (parms.template) {
      element.innerHTML = parms.template;
    }
    if (parms.templateUrl) {
      Promise.all(http.get(parms.templateUrl).then(data => {
        element.innerHTML = data;
      }));
    }
    var parsed = parser.parse(element.innerHTML, parms.selector);
    var div = document.createElement('div');
    div.id = 'container';
    div.innerHTML = parsed.html;

    return {
      element: div,
      elementHtml: parsed.html,
      children: parsed.children,
      moduleId: Math.random()
    };
  }

  login.prototype.authenticate = function() {}

  return login;
}());

exports.login = login;