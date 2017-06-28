Object.defineProperty(exports, '__esModule', {
  value: true
});
var membercomponent = require('../app/membercomponent').MemberComponent;
var memberType = require('../app/member').Member;

var family = (function() {
  var myElement;
  var myMembers = [];
  var mainMember;
  function family(pageHandler, http) {
    this.pageHandler = pagehandler;
    this.http = http;
  }

  family.prototype.create = function() {
    this.myElement = getTemplate();
    this.pageHandler.addToContainer(this.myElement);
    this.fetchMembers(this.http);
  }

  family.prototype.fetchMembers = function() {
    var _this = this;
    this.http.get('/users/1').then((data) => {
      _this.addMemberComponent(data);
    }).catch((error) => {

    })
  }

  family.prototype.addMemberComponent = function(member) {
    var _this = this;
    //First add all relatives to the dom
    for (var m = 0; m < member.family.length; m++) {
      var memberRelative = new membercomponent(member.family[m]);
      myMembers.push(memberRelative);
      _this.myElement.appendChild(memberRelative.element());
    }
    //After relatives are added pass the component collecton to the self component.
    //this will allow the self component to position lines between relatives and itself.
     this.mainMember = new membercomponent(member, myMembers);
    this.myElement.appendChild(this.mainMember.element());
    this.positionMembers();
    this.mainMember.joinMembers();
  }

  family.prototype.positionMembers = function() {
    var element = this.mainMember.element();
    element.style.top = "50%";
    element.style.left = "50%";
  }

  family.prototype.moveElements = function() {
    var self = myMembers.find(data => {
      return data.relation === 'self';
    });
    if (self) {
      self.setAttribute('style',)
    }
  }

  function getTemplate() {
    myElement = document.createElement('div');
    myElement.setAttribute('style', 'width:500px;height:600px;border:1px solid gray;margin:10px; padding:20px;position:relative;');
    return myElement;
  }
  return family;
}());

exports.family = family