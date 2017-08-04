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
    });
  }
  home.prototype.render = function() {
    this.utils.render('routes', this.myHtml);
    this.renderUser();
  }

  home.prototype.renderUser = function() {
    this.http.get('/user',)
    var mainMember = new controllers.member(config, 1);
    this.userCollection.push(mainMember);
    //get other family members of this user and render them.    
    this.http.get('/family/' + 1).then(data => {
      if (data) {
        for (var member in data) {
          var m = new controllers.member(config);
          this.userCollection.push(m);
        }
      }
    }).catch(error => {
      console.log(error)
    });
  }

  return home;
}(config));