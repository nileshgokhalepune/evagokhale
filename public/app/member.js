"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});

var Member = (function() {
  function Member(member) {
    this.id = member.id;
    this.name = member.name;
    this.relation = member.relation;
    this.type = member.type;
    this.family = member.family;
    this.imageUrl = member.imageUrl;
  }
  return Member;
}());
exports.Member = Member;

