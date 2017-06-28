'use strict';

var family = require('../app/family').family;
var http = require('../services/baseservice.js').http;

pagehandler.createContainer();
function auth() {
  if (localStorage && localStorage.getItem('user')) {
    return true;
  }
}

function loadMembers() {
  if (auth) {
    new family(pagehandler, new http($)).create();
  }

}
loadMembers();