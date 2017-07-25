Object.defineProperty(exports, '__esModule', {
  value: true
})
var http = (function() {
  function http() {
  }

  http.prototype.get = function(url, data, options) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        mehtod: 'GET',
        success: function(data) {
          resolve(data);
        },
        error: function(err) {
          return reject(err);
        }
      });
    });

  }
  return http;
}());

exports.http = new http();