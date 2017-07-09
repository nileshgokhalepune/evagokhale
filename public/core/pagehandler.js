Object.defineProperty(exports, "__esModule", {
  value: true
});

var element = require('../app/element').element;

var pagehandler = (function() {
  var container;
  function pagehandler() {

    this.container = new element('div').create().style('height:100%;width:100%;background-color:silver')
  }

  pagehandler.prototype.addToContainer = function(element) {
    if (typeof (element) === "string") {
      this.container.innerHTML = container.innerHTML + element;
    } else if (typeof (element) === "object") {
      this.container.get().appendChild(element);
    }
  }
  return pagehandler;
})();

exports.pagehandler = pagehandler;