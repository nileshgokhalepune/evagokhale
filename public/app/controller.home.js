controllers.home = (function() {
  function home(config) {
    this.myHtml;
    this.userCollection = [];

    this.utils = config.utils;
    this.http = config.http;
    this.init();
  }
  home.prototype.init = function() {
    this.http.get('/partials/home').then(data => {
      this.myHtml = data;
      this.render();
      this.renderUser();
    });
  }
  home.prototype.render = function() {
    this.utils.render('routes', this.myHtml);
  }

  home.prototype.renderUser = function() {
    var mainMember = new controllers.member(config);
    this.userCollection.push(mainMember);
    this.utils.render('userData', mainMember.myHtml);
  }

  return home;
}(config));