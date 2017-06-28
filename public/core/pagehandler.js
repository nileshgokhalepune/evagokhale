var pagehandler = (function() {
  var container;
  return {
    createContainer: function() {
      // This will be the base component which will hold all othe components;
      container = document.createElement('div');
      container.setAttribute('width', '100%');
      container.setAttribute('height', '100%');
      container.setAttribute('style', 'background-color:silver');
      document.body.appendChild(container);
    },
    addToContainer: function(element) {
      if (typeof (element) === "string") {
        container.innerHTML = container.innerHTML + element;
      } else if (typeof (element) === "object") {
        container.appendChild(element);
      }
    }
  }
})();