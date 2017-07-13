var container = require('../app/container').container;
var http = require('./services/baseservice').http;
(function() {
  var base = new container();

  base.create();
})(); //This file bootstraps the app. 
