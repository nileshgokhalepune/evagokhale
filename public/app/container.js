Object.defineProperty(exports, "__esModule", {
  value: true
});

var http = require('./services/http').http;
var factory = require('./component').componentFactory;
var component = require('./component').component;
var login = require('./login').login;
var parser = require('./parser').parser;

var container = (function() {
  //This should hold all the families that are loaded.
  function container() {
    this.component = component({
      selector: 'app',
      template: `
      <div>
        <div class="header">Family</div>
        <route></route>
      </div>`
    });
    document.body.appendChild(this.component.element);

    this.route = this.component.children.find(data => {
      return data.key.indexOf('route') !== -1;
    });
    this.routElement = document.getElementById(this.route.key);
    var _this = this;
    http.get('/valid').then(data => {
      if (!data.success) {
        var loginComponent = new login();
        this.routElement.appendChild(loginComponent.component.element);
      }
    })
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