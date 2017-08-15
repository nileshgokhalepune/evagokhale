var ui = function (selector) {
  this.elements = [];
  function ui() {
    this.elementId = selector;
  }

  return {
    element: function (what) {
      var ele = [];
      ele.push(document.getElementById(selector));
      ele.push(document.getElementsByClassName(selector));
      ele.push(document.getElementsByName(selector));
      ele.push(document.getElementsByTagName(selector));
      this.elements = ele;
      return this;
    },
    on: function (event, callback) {
      if (!this.elements) this.elements(element(this.elementId));
      this.elements.forEach(e => e.addEventListener(event, callback));
      return this;
    },
    addClass: function (className) {
      if (!this.elements) this.elements(element(this.elementId));
      return this;
    }
  }
}