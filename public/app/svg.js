var svg = (function() {
  function svg() {
    this.id = 'base';
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute('height', '100%');
    this.svg.setAttribute('width', '100%');
    this.svg.setAttribute('id', 'base');
    document.body.appendChild(this.svg);
  }

  svg.prototype.append = function(who) {
    var foreignObject = document.createElement('foreignObject');
    foreignObject.setAttribute('x', 0);
    foreignObject.setAttribute('y', 0);
    foreignObject.setAttribute('width', '90vw');
    foreignObject.setAttribute('height', '90vh');
    var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'body');
    body.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    var element = document.getElementById(who);
    body.appendChild(element);
    foreignObject.appendChild(body);
    this.svg.appendChild(foreignObject);
  }
  svg.prototype.drawLine = function(source, target) {
    // if (source && target) {
    //   if (!(typeof (source) === 'object') && !(typeof (target) === 'object')) {
    //     source = document.getElementById(source);
    //     target = document.getElementById(target);
    //   }
    //   var rect1 = source.getBoundingClientRect();
    //   var rect2 = target.getBoundingClientRect();
    //   var line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    //   var line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    //   line1.setAttribute('x1', rect1.top);
    //   line1.setAttribute('y1', rect1.left);
    //   line1.setAttribute('x2', rect2.bottom);
    //   line1.setAttribute('y2', rect2.right);
    //   line1.setAttribute('stroke', "black");
    //   this.svg.appendChild(line1);
    //   this.svg.appendChild(line2);
    // }
  }

  return svg;
}())