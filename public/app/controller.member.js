controllers.member = (function() {
  function member(config, userId, userData, familyContainer) {
    this.host = null;
    this.userId = userId;
    this.familyContainer = familyContainer;
    if (userData) {
      this.userData = userData;
    }
    this.imageUrl = null;
    this.currentLocation = '';
    this.myHtml = null;
    this.utils = config.utils;
    this.http = config.http;
    this.relations = [];
  }

  member.prototype.init = function() {
    var _this = this;
    return new Promise((resolve, reject) => {
      var action;
      if (!_this.userData) {
        action = _this.http.get('/user/' + _this.userId);
      } else {
        action = Promise.resolve(_this.userData);
      }
      action.then(data => {
        _this.userData = data;
        _this.http.get('/partials/member').then(data => {
          _this.myHtml = utils.modelbind(_this, _this.userData, data);
          _this.render();
          resolve(true);
        }).catch(error => {
          console.log(error);
          reject(error);
        });
      }).catch(error => {
        reject(error);
        console.log(error);
      });
    });
  }

  member.prototype.hop = function(target) {
    utils.move(this.userData.id, target);
  }

  member.prototype.render = function() {
    this.currentLocation = 'center' + this.userData.id;
    utils.render('center' + this.familyContainer.id, this.myHtml, true);
  }

  member.prototype.position = function(where) {}

  return member;
}(config));
