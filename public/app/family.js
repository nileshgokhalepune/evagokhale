Object.defineProperty(exports, '__esModule', { value: true });

var element = require('../app/element').element;

var family = (function () {
    var userId;
    function family(id) {
        this.element = new element('family');
        this.id = id;
    }

    family.prototype.create = function (style) {
        if (!style) {
            style = {
                position: 'absolute',
                top: "15%",
                left: "35%",
                height: '600px',
                width: '600px',
                'background-color': 'red'
            }
        }
        this.element.create().style(style).attributes({
            id: this.id
        });
    }
    return family;
}());


exports.family = family;