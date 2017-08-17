var domElement = function(selector, withNs, svgOrXhtml) {
  this.selector = selector || null;
  this.element = null;
  this.withNs = withNs || false;
  this.svgOrXhtml = svgOrXhtml;
  this.ns = this.svgOrXhtml === 'svg' ? 'http://www.w3.org/2000/svg' : 'http://www.w3.org/1999/xhtml';
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

domElement.prototype.appendTo = function(uiInstanceOrElement) {
  var parent;
  if (typeof uiInstanceOrElement === 'object') {
    if (uiInstanceOrElement.hasOwnProperty('element')) {
      parent = uiInstanceOrElement;
    }
  } else if (typeof uiInstanceOrElement === 'string') {
    parent = ui(uiInstanceOrElement);
  }
  parent.element.appendChild(this.element);
  return this;
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
      if (this.withNs) {
        this.element = document.createElementNS(this.ns, nodeName);
        this.attr('xmlns:p', this.ns);
      } else
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
  return this;
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
  return this;
}

domElement.prototype.bounds = function() {
  return this.element.getBoundingClientRect();
}

domElement.prototype.id = function(id) {
  if (id) {
    this.element.setAttribute('id', id);
    return this;
  } else {
    return this.element.getAttribute('id');
  }
}

domElement.prototype.text = function(val) {
  if (val) {
    var existing = this.element.innerText || '';
    this.element.innerText = existing + val;
  }
  return this.element.innerText;
}

domElement.prototype.attr = function(name, value) {
  var retVal;
  if (this.withNs) {
    if (value) {
      this.element.removeAttribute(name);
      this.element.setAttributeNS('http://www.w3.org/2000/xmlns/', name, value);
    }
    retval = this.element.getAttributeNS(this.ns, name);

  }
  if (value) {
    this.element.setAttribute(name, value);
    retval = this.element.getAttribute(name);
  }
  if (value)
    return this;
  else
    return retval;
}

domElement.prototype.offset = function(parms) {
  var offsets = this.element.getBoundingClientRect();
  return {
    top: offsets.top + window.pageYOffset,
    left: offsets.left + window.pageXOffset
  }
}

domElement.prototype.outerWidth = function() {
  return this.element.offsetWidth;
}

domElement.prototype.outerHeight = function() {
  return this.element.offsetHeight;
}

ui = function(selector, withNs, svgOrXhtml) {
  var el
  if (selector instanceof domElement) {
    el = selector;
  } else {
    el = new domElement(selector, withNs, svgOrXhtml);
    el.init();
  }
  return el;
}

