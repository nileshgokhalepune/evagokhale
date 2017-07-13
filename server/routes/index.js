var express = require('express');
var google = require('../libraries/google');
var googleApi = new google.googleApi();
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Family Tree'
  });
});

router.get('/google', function(req, res, next) {
  googleApi.invoke(function(url) {
    res.redirect(url);
  })
//res.sendfile(path.join(path.resolve('server/html') + '/google4e87ca70bfd7b2fc.html'));
});

router.get('/authenticate', function(req, res, next) {
  googleApi.invoke(function(oauthClient) {
    debugger;
  });
});

router.get('/users/:id', function(req, res, next) {
  res.json({
    name: 'Eva',
    id: 1,
    relation: 'self',
    type: 'self',
    imageUrl: '/assets/missin.gif',
    family: [{
      name: 'Priti',
      id: 2,
      relation: 'mother',
      type: 'Parent',
      imageUrl: '/assets/missin.gif'
    }, {
      name: 'Nilesh',
      id: 3,
      relation: 'father',
      type: 'Parent',
      imageUrl: '/assets/missin.gif'
    }, {
      name: 'Rishabh',
      id: 4,
      relation: 'brother',
      type: 'Sibling',
      imageUrl: '/assets/missin.gif'
    }]
  });
});

router.get('/oauthcallback', function(req, res, next) {
  var code = req.query.code;
  googleApi.getToken(code, function(oauthClient) {});
  res.render(res);
});

module.exports = router;