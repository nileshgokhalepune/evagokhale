var express = require('express');
var google = require('../libraries/google');
var googleApi = new google.googleApi();
var router = express.Router();
var path = require('path');
var moment = require('moment');
var fs = require('fs');
var mailer = require('nodemailer');

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
    for (var r of user.relations.sort(s => s.order)) {
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

router.post('/invite/:userId', function(req, res, next) {
  //First pull the current user data;
  var user = users.find(f => f.id == req.params.userId);
  if (user) {
    var transporter = mailer.createTransport({
      service: 'gmail',
      auth: {
      }
    });
    var mailOptons = {
      from: 'nileshgokhale45@gmail.com',
      to: req.body.emailId,
      subject: 'Invitation to join the Family',
      text: 'Hi ' + req.body.name + '\r\n' +
        'This is an email Invitation from ' + user.firstName + ' ' + user.lastName + ' to join his family.' +
        'This member claims you to be their ' + req.body.relation + '. If that is true please accept their request and join the Family.'
    }

    transporter.sendMail(mailOptons, function(error, info) {
      if (error) {
        console.log(error);
        res.json('Unable to send invite. Try again or contact me for any issues');
      } else {
        res.json('Invite was send successfully');
      }
    })
  }
});

router.post('/login', function(req, res, next) {});

module.exports = router;

var users = [{
  userName: 'Nilesh',
  firstName: 'Nilesh',
  mi: 'Shripad',
  lastName: 'Gokhale',
  id: '1',
  imgUrl: '/image/1/1.jpg',
  type: 'self',
  relations: []
}];

var relations = []