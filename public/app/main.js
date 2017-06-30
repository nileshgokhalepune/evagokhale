var family = require('../app/family').family;
var http = require('../services/baseservice.js').http;
var pageHandler = require('../core/pagehandler.js').pagehandler;

(function() {
  'use strict';

  function auth() {
    if (localStorage && localStorage.getItem('user')) {
      return true;
    }
  }

  function loadMembers() {
    if (auth) {
      new family(new pageHandler(), new http($)).create();
    }
  }

  loadMembers();
}());