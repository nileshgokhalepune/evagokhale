Object.defineProperty(exports, "__esModule", {
  value: true
});
var elementFactory = require('../app/element').element;
var MemberComponent = (function() {
  var memberElement;
  var relativeComponents;
  var id;

  function MemberComponent(member, relatives) {
    this.member = member;
    this.relativeComponents = relatives;
    this.memberElement = this.create(member);
  }

  MemberComponent.prototype.joinMembers = function() {
    if (this.relativeComponents) {
      var myCoords = this.memberElement.get().getBoundingClientRect();
      //draw lines to each relative component.
      for (var i = 0; i < this.relativeComponents.length; i++) {
        //var relativeCoords = this.relativeComponents[i].memberElement.getBoundingClientRect();
        this.drawLine(this.relativeComponents[i]);
      }
    }
  }

  MemberComponent.prototype.drawLine = function(relative) {
    var sourceElement = this.memberElement.get();
    var destElement = relative.memberElement.get();
    var sourceCoords = sourceElement.getBoundingClientRect();
    var destCoords = destElement.getBoundingClientRect();
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
      var sourceLine = new elementFactory('div').create()
        .style({
          'overflow': 'visible',
          'border': '1px solid blue',
          'position': absolute,
          'height': sourceLineHeightWidth + 'px',
          'width': "1px",
          'top': y1 + 'px',
          'left': x1 + 'px'
        });

      destLineHeightWidth = x2 - x1;
      var destLine = new elementFactory('div').create().style({
        'position': 'absolute',
        'border': '1px solid blue',
        'width': destLineHeightWidth + 'px',
        'height': '1px',
        'top': y1 + 'px',
        'left': x1 + 'px'
      });

    } else {
      y1 = destConnector.top;
      x1 = destConnector.left - 50;
      //var divConnector = getConnectorDiv(y1, x1);
      y2 = sourceConnector.top + 50;
      x2 = sourceConnector.left;
      sourceLineHeightWidth = x2 - x1;
      var sourceLine = new elementFactory('div').create();
      sourceLine.style({
        'overflow': 'visible',
        'border': '1px solid blue',
        'position': 'absolute',
        'height': '1px',
        'width': sourceLineHeightWidth + 'px',
        'top': y2 + 'px',
        'left': x1 + 'px'
      });
      sourceLine.text(this.member.relation);

      destLineHeightWidth = y2 - y1;
      var destLine = new elementFactory('div').create().style({
        'position': 'absolute',
        'border': '1px solid blue',
        'width': '1px',
        'height': destLineHeightWidth + 'px',
        'top': y1 + 'px',
        'left': x1 + 'px'
      });
      destLine.text(relative.member.relation);
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
    } else { //if you are here that means all components are in line. We need to work with the lefts here.
      if ((source.left - dest.left) < 0) {
        return {
          top: source.top,
          left: source.left + 100,
          isnegative: false
        }
      } else if (source.left - dest.left > 0) {
        return {
          top: source.top,
          left: source.left
        }
      }
    }
  }

  MemberComponent.prototype.create = function(member) {
    var _this = this;
    var memberElement = new elementFactory('div')
      .create()
      .style({
        height: '100px',
        width: '100px',
        'background-color': '#5DADE2',
        cursor: 'pointer',
        'border': '1px solid cyan'
      })
      .attributes({
        'relation': member.relation,
        'type': member.type
      }).addChild(new elementFactory('img').create().style({
      height: '50px',
      width: '50px'
    }).attributes({
      src: member.imageUrl
    })).addChild(
      new elementFactory('div').create().text(member.name)
    ).on('mouseenter', function(event) {
      _this.memberElement.addClass(' memberHover');
    }).on('mouseleave', function(event) {
      _this.memberElement.removeClass('memberHover');
    });
    return memberElement;
  }

  MemberComponent.prototype.id = function() {
    return this.member.id;
  }

  return MemberComponent;
}());

exports.MemberComponent = MemberComponent;