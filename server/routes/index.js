var express = require('express');
var google = require('../libraries/google');
var googleApi = new google.googleApi();
var router = express.Router();
var path = require('path');
var moment = require('moment');

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Family Tree'
  });
});

router.get('/valid', function(req, res, next) {
  var token = req.header('token');
  if (!token) {
    res.json({
      valid: false
    })
  }
});

router.post('/authenticate', function(req, res, next) {
  if (req.body.userId && req.body.password) {
    return "youareonyourway";
  } else {
    throw "Not happening";
  }
})

router.post('/login', function(req, res, next) {});

module.exports = router;