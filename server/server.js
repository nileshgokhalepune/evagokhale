var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var indexRoute = require('./routes/index');

var app = express();
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
app.use('/', indexRoute);
app.use(express.static(path.join(__dirname, 'public')));
// app.listen(3010, function () {
//     console.log('Server listening on ', 3010);
// });

app.use(function (req, res, next) {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

module.exports = app;