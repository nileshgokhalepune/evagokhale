controllers.member = (function() {
  function member(config, userId) {
    this.userName = null;
    this.imageUrl = null;
    this.myHtml = null;
    this.utils = config.utils;
    this.http = config.http;
    this.init();
  }
  member.prototype.init = function() {
    this.http.get('/user').then(data => {
      this.http.get('/partials/member').then(data => {
        this.myHtml = data;
      }).catch(error => error);
    }).catch(error => {
      console.log(error);
    })
  }

  member.prototype.render = function() {}

  return member;
}(config));
