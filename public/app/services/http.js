Object.defineProperty(exports, '__esModule', {
  value: true
})
var http = (function() {
  function http() {
  }

  http.prototype.get = function(url, options) {
    return new Promise((resolve, reject) => {
      $.ajax({
        async: options && options.async ? options.async : false,
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