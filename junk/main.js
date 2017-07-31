var config = require('./config');
var components = {};
window.onload = function() {
  window.addEventListener(
    'hashchange',
    function() {
      utils.router()
    }
  )
};

