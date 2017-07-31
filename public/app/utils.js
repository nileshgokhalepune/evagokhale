var utils = (function() {
  return {
    router: function(route, data) {
      route = route || location.hash.split(1) || 'home';
      var temp = route.split('?');
      var controllerToInvoke = temp[0];
      location.hash = route;
      controllers[controllerToInvoke].newup().init();
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
        if (obj.hasOwnProperties()) {

        }
      }
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
    }
  }
}());