var monggoose = require('mongoose');
var config = require('./libraries/config');
var schema = monggoose.Schema;

var memberSchema = new Scchema({
  documentId: ObjectId,
  name: string,
  dob: Date,
  parents: Array,
  siblings: Array,
  friends: Array,
});

var inviteSchema = new Schema({
  documentId: ObjectId,
  memberId: Objecctid,
  email: string
});

var member = mongoose.model('member', memberSchema);

module.exports = member;