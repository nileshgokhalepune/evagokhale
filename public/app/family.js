Object.defineProperty(exports, '__esModule', {
  value: true
});
var membercomponent = require('../app/membercomponent').MemberComponent;
var memberType = require('../app/member').Member;
var element = require('../app/element').element;
var family = (function() {
  var myElement;
  var myMembers = [];
  var mainMember;
  function family(pageHandler, http) {
    this.pageHandler = pageHandler;
    this.http = http;
    this.myMembers = [];
  }

  family.prototype.create = function() {
    this.myElement = getTemplate();
    this.pageHandler.addToContainer(this.myElement.get());
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
      _this.myMembers.push(memberRelative);
      _this.myElement.addChild(memberRelative.element());
    }
    //After relatives are added pass the component collecton to the self component.
    //this will allow the self component to position lines between relatives and itself.
    _this.mainMember = new membercomponent(member, _this.myMembers);
    _this.myElement.addChild(_this.mainMember.memberElement.get());
    _this.positionMembers();
    _this.mainMember.joinMembers();
  }

  family.prototype.positionMembers = function() {
    // var _this = this;
    // var element = _this.mainMember.memberElement;
    // element.style({
    //   top: "50%",
    //   left: "50%",
    //   position: 'absolute'
    // });
    // var parentsDiff = 0;
    // for (var i = 0; i < _this.myMembers.length; i++) {
    //   if (_this.myMembers[i].member.type === 'Parent') {
    //     var memberElement = _this.myMembers[i].memberElement.get();
    //     memberElement.style.left = (memberElement.style.left.substr(0, memberElement.style.left.length - 3) + parentsDiff) + 'px';
    //     parentsDiff += 50;
    //   }
    //   if (_this.myMembers[i].member.type === 'Sibling') {
    //     var memberElement = _this.myMembers[i].memberElement.get();
    //   }
    // }
  }

  family.prototype.moveElements = function() {
    var self = this.myMembers.find(data => {
      return data.relation === 'self';
    });
    if (self) {
    }
  }

  function getTemplate() {
    myElement = new element('div').create().style('width:700px;height:700px;border:1px solid gray;margin:10px; padding:20px;position:relative;');
    return myElement;
  }
  return family;
}());

exports.family = family