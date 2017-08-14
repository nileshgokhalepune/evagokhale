var express = require('express');
var google = require('../libraries/google');
var googleApi = new google.googleApi();
var router = express.Router();
var path = require('path');
var moment = require('moment');
var fs = require('fs');

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

router.get('/image/:userId/:id', function(req, res, next) {
  if (req.params.userId && req.params.id) {
    var defaultPath = '/assets/missing.gif'
    var finalPath = path.join(__dirname, '../images/', req.params.userId + '/' + req.params.id);
    if (!fs.existsSync(finalPath)) {
      finalPath = path.join(__dirname, '../../public/assets/missin.gif');
    }
    res.sendfile(finalPath);
  } else {
    res.sendStatus(404);
  }
});

router.post('/login', function(req, res, next) {});

module.exports = router;

var users = [{
  userName: 'Nilesh',
  id: '1',
  imgUrl: '/image/1/1.jpg',
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
      type: 'sibling',
      relation: 'sister',
    }, {
      id: 1,
      relId: 6,
      type: 'friend',
      relation: 'friend',
    }, {
      id: 1,
      relId: 7,
      type: 'parent',
      relation: 'father',
    }, {
      id: 1,
      relId: 8,
      type: 'parent',
      relation: 'mother',
    }, {
      id: 1,
      relId: 9,
      relation: 'friend',
      type: 'friend'
    }, {
      id: 1,
      relId: 10,
      relation: 'friend',
      type: 'friend'
    }, {
      id: 1,
      relId: 11,
      relation: 'friend',
      type: 'friend'
    }]
},
  {
    userName: 'Priti',
    id: '2',
    imgUrl: '/image/2/1.jpg',
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
    imgUrl: '/image/3/1.jpg',
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
    imgUrl: '/image/4/1.jpg',
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
    userName: 'Shripad',
    id: '7',
    imgUrl: '/image/7/1.jpg',
    relations: [
      {
        id: 7,
        relId: 1,
        relation: 'son',
        type: 'child'
      },
      {
        id: 7,
        relId: 5,
        relation: 'daughter',
        type: 'child'
      }]
  },
  {
    userName: 'Janhavi',
    id: '8',
    imgUrl: '/image/8/1.jpg',
    relations: [
      {
        id: 8,
        relId: 1,
        relation: 'son',
        type: 'child'
      },
      {
        id: 8,
        relId: 5,
        relation: 'daughter',
        type: 'child'
      },
      {
        id: 8,
        relId: 12,
        relation: 'sister',
        type: 'sibling'
      }]
  },
  {
    userName: 'Saima',
    id: '5',
    imgUrl: '/image/5/1.jpg',
    relations: [
      {
        id: 5,
        relId: 1,
        relation: 'brother',
        type: 'sibling'
      }]
  },
  {
    userName: 'Siraj',
    id: '6',
    imgUrl: '/image/6/1.jpg',
    relations: [
      {
        id: 6,
        relId: 1,
        relation: 'friend',
        type: 'friend'
      }]
  },
  {
    userName: 'Sameer',
    id: '9',
    imgUrl: '/image/6/1.jpg',
    relations: [
      {
        id: 9,
        relId: 1,
        relation: 'friend',
        type: 'friend'
      }]
  },
  {
    userName: 'Vijayan',
    id: '10',
    imgUrl: '/image/6/1.jpg',
    relations: [
      {
        id: 10,
        relId: 1,
        relation: 'friend',
        type: 'friend'
      }]
  },
  {
    userName: 'Prabhakar',
    id: '11',
    imgUrl: '/image/6/1.jpg',
    relations: [
      {
        id: 11,
        relId: 1,
        relation: 'friend',
        type: 'friend'
      }]
  },
  {
    userName: 'Varsha',
    id: '12',
    imgUrl: '/image/6/1.jpg',
    relations: [
      {
        id: 12,
        relId: 8,
        relation: 'sister',
        type: 'sibling'
      }]
  }
];

var relations = []