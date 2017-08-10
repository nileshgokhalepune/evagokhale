controllers.member = (function() {
  function member(config, userId, userData) {
    this.userId = userId;
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
    return new Promise((resolve, reject) => {
      var action;
      if (!this.userData) {
        action = this.http.get('/user/' + this.userId);
      } else {
        action = Promise.resolve(this.userData);
      }
      action.then(data => {
        this.userData = data;
        this.http.get('/partials/member').then(data => {
          this.myHtml = utils.bind(this.userData, data);
          this.render()
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
    this.currentLocation = 'center';
    utils.render('center', this.myHtml, true);
  }

  member.prototype.position = function(where) {}

  return member;
}(config));
