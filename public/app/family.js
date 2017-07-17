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
                left: "25%",
                height: '50%',
                width: '50%',
                'background-color': 'silver'
            }
        }
        this.element.create().style(style).attributes({
            id: this.id
        });
    }
    return family;
}());


exports.family = family;