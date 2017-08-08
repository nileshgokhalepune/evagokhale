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
  var user = users.find((e, i) => e.id == req.params.userId);
  if (user) {
    var family = [];
    for (var r of user.relations) {
      var member = users.find((e, i) => e.id == r.relId);
      if (member) {
        family.push({
          member: member,
          type: r.type,
          relation: r.relation
        });
      }
    }
    res.json(family);
  } else {
    res.sendStatus(404);
  }
});

router.post('/login', function(req, res, next) {});

module.exports = router;

var users = [{
  userName: 'Nilesh',
  id: '1',
  imgUrl: '/assets/missin.gif',
  type: 'self',
  relations: [{
    id: 1,
    relId: 2,
    relation: 'wife',
    type: 'spouse'
  },
    {
      id: 1,
      relId: 3,
      relation: 'daughter',
      type: 'child'
    },
    {
      id: 1,
      relId: 4,
      relation: 'son',
      type: 'child'
    }, {
      id: 1,
      relId: 5,
      relation: 'sister',
    }]
},
  {
    userName: 'Priti',
    id: '2',
    imgUrl: '/assets/missin.gif',
    type: 'self',
    relations: [{
      id: 2,
      relId: 1,
      relation: 'husband',
      type: 'spouse'
    },
      {
        id: 2,
        relId: 3,
        relation: 'daughter',
        type: 'child'
      },
      {
        id: 2,
        relId: 4,
        relation: 'son',
        type: 'child'
      }]
  },
  {
    userName: 'Eva',
    id: '3',
    imgUrl: '/assets/missin.gif',
    type: 'self',
    relations: [{
      id: 3,
      relId: 1,
      relation: 'father',
      type: 'parent'
    },
      {
        id: 3,
        relId: 2,
        relation: 'mother',
        type: 'parent'
      },
      {
        id: 3,
        relId: 4,
        relation: 'brother',
        type: 'sibling'
      }]
  },
  {
    userName: 'Rishabh',
    id: '4',
    imgUrl: '/assets/missin.gif',
    relations: [{
      id: 4,
      relId: 1,
      relation: 'father',
      type: 'parent'
    }, {
      id: 4,
      relId: 2,
      relation: 'mother',
      type: 'parent'
    }, {
      id: 4,
      relId: 3,
      relation: 'sister',
      type: 'sibling'
    }]
  },
  {
    userName: 'Saima',
    id: '5',
    imgUrl: '/assets/missin.gif',
    relations: [
      {
        id: 5,
        relId: 1,
        relation: 'brother',
        type: 'sibling'
      }]
  }
];

var relations = []