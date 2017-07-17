var express = require('express');
var google = require('../libraries/google');
var googleApi = new google.googleApi();
var router = express.Router();
var path = require('path');
var moment = require('moment');
var authClient;
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Family Tree'
  });
});

router.get('/google', function(req, res, next) {
  googleApi.invoke(function(token, url) {
    if (!token)
      res.redirect(url);
    else
      res.redirect('/');
  })
});

router.get('/images', function(req, res, next) {
  googleApi.listFiles(authClient);
})

router.get('/authenticate', function(req, res, next) {

  googleApi.invoke(function(oauthClient) {
    if (oauthClient) {
      authClient = oauthClient;
      var expirydate = new Date(oauthClient.credentials.expiry_date);
      if (moment().add(5, 'd').isSameOrBefore(moment(expirydate))) {
        googleApi.refresh(function() {
          res.redirect('/');
        })
      }
    } else {
      res.redirect('/google');
    }
    res.json({
      success: true
    });
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