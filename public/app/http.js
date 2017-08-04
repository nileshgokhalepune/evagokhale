var http = (function() {
  function http() {

  }

  http.prototype.get = function(url) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        success: function(data) {
          resolve(data)
        },
        error: function(error) {
          reject(error);
        }
      })
    })
  }

  http.prototype.post = function(url, data) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: url,
        data: data,
        method: 'POST',
        dataType: 'json',
        success:function(data){
            resolve(data);
        },
        error: function(error){
            reject(error);
        }
      })
    })
  }
  return new http();
}());