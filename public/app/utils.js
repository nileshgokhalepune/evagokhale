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
    field: function(id) {
      return document.getElementById(id);
    },
    bind: function(obj, html) {
      if (typeof obj === "object") {
        for (var key in obj) {
          var index = html.indexOf('{{' + key + '}}')
          if (index !== -1) {
            html = html.replace('{{' + key + '}}', obj[key]);
          }
        }
      }
      return html;
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
    moveChildren: function(target, source) {

    }
  }
}());