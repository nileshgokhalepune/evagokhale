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
        var relativeCoords = this.relativeComponents[i].memberElement.getBoundingClientRect();
        drawLine(myCoords, relativeCoords);
      }
    }
  }

  function drawLine(source, dest) {
    var divRelation = document.createElement('div');
    divRelation.setAttribute('style', 'height:1px;border:1px solid black;position:absolute;');
    divRelation.style.top = source.top + 'px';
    divRelation.style.left= dest.top + 'px';
    divRelation.style.width = (source.top - dest.top) + 'px' ;
    divRelation.style.transform = "rotate()"
    document.body.appendChild(divRelation);
  }

  MemberComponent.prototype.template = function() {
    return this.memberElement.outerHTML;
  }

  MemberComponent.prototype.element = function() {
    return this.memberElement;
  }

  function create(member) {
    var memberElement = document.createElement('div');
    memberElement.setAttribute('style', 'height:100px;width:100px;position:absolute;');
    memberElement.setAttribute('relation', member.relation);
    memberElement.setAttribute('type', member.type);
    var divForImag = document.createElement('div');
    var image = document.createElement('img');
    image.setAttribute('style', 'height:100px;width:100px');
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