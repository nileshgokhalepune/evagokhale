Object.defineProperty(exports, '__esModule', { value: true });
var element = require('../app/element').element;
var family = require('../app/family').family;
var http = require('../app/services/baseservice').http;

var container = (function () {
    var client = new http();
    function container() {
        this.element = new element('container');
        this.containerElement = {};
    }

    container.prototype.create = function () {
        this.element.removeByTag('app');
        this.containerElement = this.element.create().style({
            position: 'absolute',
            'background-color': 'white',
            width: '100%',
            height: '100vh',
            overflow: 'scroll'
        });
        var mainUserFamily = new family("eva");
        mainUserFamily.create();

        var userTopLeft = new family("evaphototopleft");
        userTopLeft.create({
            top: "45px",
            left: "150px",
            height: "200px",
            width: "200px",
            position: 'absolute',
            transform: 'rotate(45deg)',
            'background-color': 'pink'
        });

        var userTopRight = new family('evaphototopright');
        userTopRight.create({
            top: "45px",
            right: "150px",
            height: "200px",
            width: "200px",
            position: 'absolute',
            transform: 'rotate(45deg)',
            'background-color': 'pink'
        });
        
    }
    return container;
}());

exports.container = container;