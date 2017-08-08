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

router.get('/user/:id', function(req, res, next) {
  var user = users.find(f => f.id === req.params.id);
  res.json(user);
});

router.get('/family/:userId', function(req, res, next) {
  var relatives = relations.filter((element, index) => element.id == req.params.userId);
  var familymembers = [];
  for (var rel of relatives) {
    var user = users.find((element, index) => element.id == rel.relId);
    if (user) {
      familymembers.push(user);
      user = null;
    }
  }
  res.json(familymembers);
});

router.post('/login', function(req, res, next) {});

module.exports = router;

var users = [{
  userName: 'Nilesh',
  id: '1',
  imgUrl: '/assets/missin.gif',
  relation: 'self'
}, {
  userName: 'Priti',
  id: '2',
  imgUrl: '/assets/missin.gif',
  relation: 'spouse'
}, {
  userName: 'Eva',
  id: '3',
  imgUrl: '/assets/missin.gif',
  relation: 'daughter',
  type: 'child'
}];

var relations = [
  {
    id: 1,
    relId: 2
  },
  {
    id: 1,
    relId: 3
  },
  {
    id: 2,
    relId: 1
  },
  {
    id: 2,
    relId: 3
  },
  {
    id: 3,
    relId: 1
  },
  {
    id: 3,
    relId: 2
  }]