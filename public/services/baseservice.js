Object.defineProperty(exports, "__esModule", {
  value: true
});

var http = (function() {
  var jquery = $;
  function http($) {
    this.jquery = $;
  }

  http.prototype.get = function(url, options, data) {
    return new Promise((resolve, reject) => {
      jquery.get(url, resolve);
    });
  }

  return http;
})();

exports.http = http;