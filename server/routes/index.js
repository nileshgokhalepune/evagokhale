var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Family Tree'
  });
});

router.get('/users/:id', function(req, res, next) {
  res.json({
    name: 'Eva',
    id: 1,
    relation: 'self',
    type: 'self',
    imageUrl:'/assets/missin.gif',
    family: [{
      name: 'Priti',
      id: 2,
      relation: 'Mother',
      type: 'Parent',
    imageUrl:'/assets/missin.gif'
    }, {
      name: 'Nilesh',
      id: 3,
      relation: 'Father',
      type: 'Parent',
    imageUrl:'/assets/missin.gif'
    }]
  });
})

module.exports = router;