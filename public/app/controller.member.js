controllers.member = (function() {
  function member(config, userId) {
    this.userId = userId;
    this.imageUrl = null;
    this.myHtml = null;
    this.utils = config.utils;
    this.http = config.http;
    this.relations = [];
    this.init();
  }
  member.prototype.init = function() {
    this.http.get('/user/' + this.userId).then(data => {
      this.userData = data;
      this.http.get('/partials/member').then(data => {
        this.myHtml = utils.bind(this.userData, data);
        this.render()
      }).catch(error => error);
    }).catch(error => {
      console.log(error);
    })
  }

  member.prototype.render = function() {
    utils.render('center', this.myHtml, true);
  }

  member.prototype.position = function(where) {}

  return member;
}(config));
