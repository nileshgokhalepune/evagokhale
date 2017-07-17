var container = require('../app/container').container;
var httpService = require('../app/services/baseservice').http;

(function() {
  var http = new httpService();
  var base = new container();
  http.get('/authenticate').then(function(res) {
    if(!res.success){

    }
  })
    .catch(function(error) {
      debugger;
    });
  base.create();
})(); //This file bootstraps the app. 
