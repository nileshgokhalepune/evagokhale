var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var debug = require('debug');
var bodyParser = require('body-parser');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(path.join(__dirname, 'client')));

mongoose.connect(config.dbUrl);

var db = mongoose.connection;

db.on('error', console.error('connection error'));

db.once('open', function() {
  console.log('connected');
});

app.get('/partials/:name', function(req, res) {
  res.render('partials/' + req.params.name);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;