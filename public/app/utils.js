var utils = (function() {
  return {
    router: function(route, data) {
      route = route || location.hash.split(1) || 'home';
      var temp = route.split('?');
      var controllerToInvoke = temp[0];
      location.hash = route;
      controllers.newup(controllerToInvoke);
    },
    render: function(elementId, content, append) {
      var element = document.getElementById(elementId);
      if (element) {
        if (append) {
          element.innerHTML = element.innerHTML + content;
        } else {
          element.innerHTML = content;
        }
      }
    },
    renderNs: function(elementId, content, append) {
      var element = document.getElementById(elementId);
      if (element) {

      }
    },
    field: function(id) {
      return document.getElementById(id);
    },
    modelbind: function(obj, model, html) {
      if (typeof model === "object") {
        for (var key in model) {
          var index = html.indexOf('{{' + key + '}}')
          if (index !== -1) {
            html = html.replace(new RegExp('{{' + key + '}}', 'g'), model[key]);
          }
        }
      }
      var reg = new RegExp(/\[[a-zA-Z0-9]*\]="[a-zA-Z0-9]*\([a-zA-Z0-9]*\)"/, 'g');
      var matches = html.match(reg);
      for (var match of matches) {

      }
      return html;
    },
    on: function(who, event, callback) {
      if (who === 'array') {
        for (var element of who) {
          element.addEventListener('on' + event, callback);
        }
      } else {
        who.addEventListener(event, function() {
          callback();
        });
      }
    },
    getHost: function(name, returnall = false) {
      var element = document.getElementById(name);
      if (!element)
        element = document.getElementsByTagName(name)
      if (!element)
        element = document.getElementsByClassName(name);
      if (!element)
        element = document.getElementsByTagNameNS(name);
      if (typeof (element) === 'array' && !returnall) {
        element = element[0];
      }
      return element;
    },
    isvalid: function() {
      if (localStorage.getItem('token')) {
        return true;
      } else {
        return false;
      }
    },
    set: function() {
      localStorage.setItem('token', 'randomtoken');
    },
    move: function(who, target) {
      if (who && target) {
        var element = document.getElementById(who);
        var targetElement = document.getElementById(target);
        if (element && targetElement)
          targetElement.appendChild(element);
      }
    }
  } 
}());