var express = require('express');
var path = require('path');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/:id', function(req, res, next) {
  //TODO: Get tree based on the id.
  res.json("");
});

router.post('/invite', function(eq, res, next) {
  //TODO: THis route should get all the invites based on emailIds which should connect the current users to the potential users.
  
});

module.exports = router;