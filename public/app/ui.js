var ui = (function(selector) {
  function element(what) {
    var ele = [];
    ele.push(document.getElementById(selector));
    ele.push(document.getElementsByClassName(selector));
    ele.push(document.getElementsByName(selector));
    ele.push(document.getElementsByTagName(selector));
    ele.push(document.getElementsByTagNameNS(selector));
    return ele;
  }
  return {
    on: function(event, callback) {
      var elem = element(selector);
      elem.forEach(e => e.addEventListener(event, callback));
    },
    addClass: function(className) {}
  }
}())