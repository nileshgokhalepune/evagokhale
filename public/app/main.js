var container = require('./container').container;
var myParser = require('./parser').parser;

const app = new container();

myParser.parse("<div><span></span><input type='text' /><button class='btn btn-primary'><i class='fa fa-circle'></i></button></div>");
