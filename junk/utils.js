var utils = (function() {
  return {
    router: function() {
        
    },
    render: function(elementId, content) {
      var element = document.getElementById(elementId);
      element.innerHTML = content;
    }
  }
}());