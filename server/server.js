var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');
var routes = require('./routes/index');
var jwt = require('jsonwebtoken');
var config = require('./libraries/config');

var app = express();

app.set('supersecret',config.secret);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('base', '/');
// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(express.static(path.join(__dirname, '../', 'node_modules')));

// mongoose.connect(database.url);
// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function() {
//   console.log('connected');
// })


app.use('/', routes);

app.get('/partials/:name', function (req, res) {
  res.render('partials/' + req.params.name);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
