var utils = (function() {
  return {
    router: function(route, data) {
      route = route || location.hash.split(1) || 'home';
      var temp = route.split('?');
      var controllerToInvoke = temp[0];
      location.hash = route;
      controllers[controllerToInvoke].init();
    },
    render: function(elementId, content) {
      var element = document.getElementById(elementId);
      if (element)
        element.innerHTML = content;
    },
    field: function(id) {
      return document.getElementById(id);
    }
  }
}());