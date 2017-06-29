Object.defineProperty(exports, "__esModule", {
  value: true
});
var MemberComponent = (function() {
  var memberElement;
  var relativeComponents;
  var id;

  function MemberComponent(member, relatives) {
    this.member = member;
    this.relativeComponents = relatives;
    this.memberElement = create(member);
  }

  MemberComponent.prototype.joinMembers = function() {
    if (this.relativeComponents) {
      var myCoords = this.memberElement.getBoundingClientRect();
      //draw lines to each relative component.
      for (var i = 0; i < this.relativeComponents.length - 1; i++) {
        //var relativeCoords = this.relativeComponents[i].memberElement.getBoundingClientRect();
        drawLine(this.memberElement, this.relativeComponents[i].memberElement);
      }
    }
  }

  function drawLine(sourceElemet, destElemet) {
    var sourceCoords = sourceElemet.getBoundingClientRect();
    var destCoords = destElemet.getBoundingClientRect();
    var sourceConnector = getConnector(sourceCoords, destCoords);
    var destConnector = getConnector(destCoords, sourceCoords);
    var x1,
      y1,
      x2,
      y2,
      sourceLineHeightWidth,
      destLineHeightWidth;
    if (sourceConnector.isnegative) {
      y1 = sourceConnector.top + 100;
      x1 = sourceConnector.left + 50;
      x2 = destConnector.top;
      y2 = destCoords.left + 50;
      sourceLineHeightWidth = y2 - y1;
      var sourceLine = document.createElement('div');
      sourceLine.style = "position:absolute;border:1px solid red;";
      sourceLine.style.height = sourceLineHeightWidth + 'px';
      sourceLine.style.width = "1px";
      sourceLine.style.top = y1 + 'px';
      sourceLine.style.left = x1 + 'px';
      document.body.appendChild(sourceLine);
    } else {
      y1 = destConnector.top + 100;
      x1 = destConnector.left + 50;
      var divConnector = getConnectorDiv(y1, x1);
      y2 = sourceConnector.top + 50;
      x2 = sourceConnector.left;
      sourceLineHeightWidth = x2 - x1;
      var sourceLine = document.createElement('div');
      sourceLine.style = "position:absolute;border:1px solid red;";
      sourceLine.style.width = sourceLineHeightWidth + 'px';
      sourceLine.style.height = "1px";
      sourceLine.style.top = y2 + 'px';
      sourceLine.style.left = x1 + 'px';
      document.body.appendChild(sourceLine);
    }
  }

  function getConnectorDiv(top, left) {
    var div = document.createElement('div');
    div.style = "position:absolute;border-radius:50%;background-color:red;width:10px;height:10px"
    div.style.left = left + 'px';
    div.style.top = top + 'px';
    document.body.appendChild(div);
    return div;
  }

  MemberComponent.prototype.template = function() {
    return this.memberElement.outerHTML;
  }

  MemberComponent.prototype.element = function() {
    return this.memberElement;
  }

  function getlength(source, dest) {
    var leg1 = (source.isnegative ? dest.left - source.left : source.left - dest.left);
    var leg2 = (!source.isnegative ? source.top - dest.top : dest.top - source.top);
    var hsquare = (leg1 * leg1) + (leg2 * leg2);
    var hypotenuse = Math.sqrt(hsquare);
    return hypotenuse;
  }

  function getTransformDegree(hypotenuse, sourceCoords, destCoords) {
    var opposite = sourceCoords.isnegative ? destCoords.top - sourceCoords.top : sourceCoords.top - destCoords.top;
    var angle = hypotenuse / opposite;
    var sin = Math.pow(Math.sin(angle), -1);
    return sin * 100;
  // var m = y / x;
  // return Math.tan(m);
  }

  function getConnector(source, dest) {
    if ((source.top - dest.top) < 0) {
      if ((source.left - dest.left) < 0) {
        return {
          top: source.top + 100,
          left: source.left + 100,
          isnegative: true
        }
      } else if ((source.left - dest.left) > 0) {
        return {
          top: source.top + 100,
          left: source.left,
          isnegative: true
        }
      }
    } else if ((source.top - dest.top) > 0) {
      if ((source.left - dest.left) < 0) {
        return {
          top: source.top,
          left: source.left + 100,
          isnegative: false
        }
      } else if ((source.left - dest.left) > 0) {
        return {
          top: source.top,
          left: source.left,
          isnegative: false
        }
      }
    }
  }

  function create(member) {
    var memberElement = document.createElement('div');
    memberElement.setAttribute('style', 'height:100px;width:100px;position:absolute;background-color:green');
    memberElement.setAttribute('relation', member.relation);
    memberElement.setAttribute('type', member.type);
    var divForImag = document.createElement('div');
    var image = document.createElement('img');
    image.setAttribute('style', 'height:50px;width:50px');
    image.setAttribute('src', member.imageUrl);
    divForImag.appendChild(image);
    memberElement.appendChild(divForImag);
    var divForName = document.createElement('div');
    divForName.innerText = member.name;
    memberElement.appendChild(divForName);
    memberElement.addEventListener('mouseover', this.mouseover);
    return memberElement;
  }

  MemberComponent.prototype.mouseover = function() {
    var classess = this.memberElement.getAttribute('class');
    this.memberElement.setAttribute('class', classess + 'memberHover');
  }

  MemberComponent.prototype.id = function() {
    return this.member.id;
  }

  return MemberComponent;
}());

exports.MemberComponent = MemberComponent;