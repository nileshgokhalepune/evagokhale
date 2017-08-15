var domElement = function(selector) {
  this.selector = selector || null;
  this.element = null;
}

domElement.prototype.eventHandler = {
  events: [],
  bindEvent: function(event, callback, target) {
    this.unbindEvent(evetm, target);
    target.addEventListner(event, callback, false);
    this.event.push({
      type: 'event',
      event: callback,
      target: target
    });
  },
  findEvent: function(event) {
    return this.events.filter(function(evt) {
      return (evt.type === event);
    }, event)[0];
  },
  unbindEvent: function(event, target) {
    var foundEvent = this.findEvent(event);
    if (foundEvent !== undefined) {
      target.removeEventListner(event, foundEvent.event, false);
    }
    this.events = this.event.filter(evt => {
      return (evt.type !== event);
    }, event);
  }
}

domElement.prototype.on = function(event, callback) {
  this.eventHandler.bindEvent(event, callback, this.element);
}

domElement.prototype.off = function(event) {
  this.eventHandler.unbindEvent(event, this.element);
}

domElement.prototype.val = function(newVal) {
  return (newVal !== undefined ? this.element.value = newVal : this.element.value);
}

domElement.prototype.init = function() {
  switch (this.selector[0]) {
    case '<': {
      var matches = this.selector.match(/<([\w-]*)>/);
      if (matches === null || matches === undefined) {
        throw 'Invalid selector';
        return false;
      }
      var nodeName = matches[0].replace('<', '').replace('>', '');
      this.element = document.createElement(nodeName);
      break;
    }
    case '#': {
      this.element = document.getElementById(this.selector.substr(1));
      break;
    }
    default:
      this.element = document.querySelector(this.selector);
  }
}

domElement.prototype.addClass = function(classNames) {
  var existing = this.element.getAttribute('class');
  if (existing) {
    classNames = classNames + existing;
  }
  this.element.setAttribute('class', classNames);
}

domElement.prototype.style = function(instyle) {
  var styleString = '';
  if (typeof instyle === 'string') {
    styleString = instyle;
  } else {
    for (var style in instyle) {
      styleString += style + ':' + instyle[style] + ';';
    }
  }
  this.element.setAttribute('style', styleString);
}


ui = function(selector) {
  var el = new domElement(selector);
  el.init();
  return el;
}

