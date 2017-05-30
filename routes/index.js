var express = require('express');
var path = require('path');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;