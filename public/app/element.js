Object.defineProperty(exports, "__esModule", {
    value: true
});
var element = (function () {
    var thisElement;
    function element(tagName) {
        this.tagName = tagName;
    }

    element.prototype.create = function () {
        this.thisElement = document.createElement(this.tagName);
        document.body.appendChild(this.thisElement);
        return this;
    }

    element.prototype.createNs = function (ns) {
        this.thisElement = document.createElementNS(ns, tagName);
        document.body.appendChild(this.thisElement);
        return this;
    }

    element.prototype.style = function (styleObject) {
        if (!this.thisElement)
            throw "Cannot set style before creating an element";
        if (typeof (styleObject) === 'string')
            this.thisElement.style = styleObject;
        else if (typeof (styleObject) === 'object') {
            var existingStyle = this.getAttribute('style');
            var newStyles = existingStyle ? ";" : "";
            for (var stl in styleObject) {
                if (existingStyle && existingStyle.indexOf(stl) !== -1) { //this means the style is already there. we need to change the value.
                    var startPos = existingStyle.indexOf(stl);
                    var semiColonPos = existingStyle.indexOf(';', startPos);
                    var currentStl = existingStyle.slice(startPos, semiColonPos);
                    existingStyle = existingStyle.replace(currentStl, "");
                }
                newStyles += stl + ":" + styleObject[stl] + ';';
            }
            this.thisElement.style = newStyles;
        }
        return this;
    }

    element.prototype.attributes = function (attribute) {
        if (!this.thisElement)
            throw 'Cannot set attributes before creating an element';
        if (typeof (attribute) === 'object') {
            for (var key in attribute) {
                this.thisElement.setAttribute(key, attribute[key]);
            }
        } else {

        }
        return this;
    }
    element.prototype.addChild = function (child) {
        if (!this.thisElement)
            throw 'Cannot add a child before creating an element';
        if (child instanceof element) {
            this.thisElement.appendChild(child.thisElement);
        } else if (typeof (child) === 'object') {
            this.thisElement.appendChild(child);
        } else {
            throw 'Unknow child type';
        }
        return this;
    }

    element.prototype.text = function (text) {
        if (!text) {
            return this.thisElement.innerText;
        } else {
            this.thisElement.innerText = text;
        }
        return this;
    }

    element.prototype.html = function (html) {
        if (!html) {
            return this.thisElement.innerHTML;
        } else {
            this.thisElement.innerHTML = html;
        }

        return this;
    }

    element.prototype.get = function () {
        if (!this.thisElement)
            throw 'No element created';
        return this.thisElement;
    }

    element.prototype.on = function (eventName, callBack) {
        if (!this.thisElement)
            throw new 'Cannot attach event before creating an element';
        this.thisElement.addEventListener(eventName, function (event) {
            callBack(event);
        });
        return this;
    }

    element.prototype.getAttribute = function (name) {
        return this.thisElement.getAttribute(name);
    }

    element.prototype.addClass = function (classNames) {
        var classess = this.thisElement.getAttribute('class');
        if (!classess)
            classess = '';

        this.thisElement.setAttribute('class', classess + classNames);

        return this;
    }

    element.prototype.removeClass = function (className) {
        var classess = this.thisElement.getAttribute('class');
        if (classess) {
            classess = classess.replace(className, '');
            this.thisElement.setAttribute('class', classess);
        }
        return this;
    }
    element.prototype.removeByTag = function (tagName) {
        var elements = document.getElementsByTagName(tagName);
        for (var ele = 0; ele < elements.length; ele++) {
            document.body.removeChild(elements[ele]);
        }
    }
    element.prototype.removeById = function (id) {
        var ele = document.getElementById(id);
        document.removeChild(ele);
    }
    return element;
}());

exports.element = element;