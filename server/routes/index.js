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
    res.header('token', "randomstring");
    res.json("youareonyourway");
  } else {
    res.send(500, "Not happening");
  }
})

router.get('/user', function(req, res, next) {
  res.json({
    userName: 'Nilesh',
    id: '1',
    imgUrl: '/assets/missin.gif',
    relation:'self'
  });
});

router.get('/family', function(req, res, next) {
  var familymembers = [{
    userName: 'Priti',
    id: '2',
    imgUrl: '/assets/missin.gif',
    relation: 'spouse'
  },
    {
      userName: 'Eva',
      id: '2',
      imgUrl: '/assets/missin.gif',
      relation: 'daughter',
      type: 'child'
    }];
  res.json(familymembers);
});

router.post('/login', function(req, res, next) {});

module.exports = router;