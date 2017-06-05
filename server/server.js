var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var indexRoute = require('./routes/index');

var app = express();
app.use(bodyParser.json());
app.use('view engine', 'jade');
app.use('/', indexRoute);

app.listen(3010, function () {
    console.log('Server listening on ', 3010);
});


app.use(function (req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

module.exports = app;