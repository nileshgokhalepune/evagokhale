controllers.login = (function() {
  function login(config) {
    this.utils = config.utils;
    this.http = config.http;
    this.init();
  }

  login.prototype.init = function() {
    this.render();
  }

  login.prototype.render = function() {
    this.http.get('/partials/login').then(data => {
      this.utils.render('routes', data);
    });
  }

  login.prototype.authenticate = function() {
    var userId = utils.field('userName').value;
    var password = utils.field('password').value;
    var authData = {
      userId: userId,
      password: password
    }
    this.http.post('/authenticate', authData).then(data => {
      utils.router('home', {
        valid: true
      });
    }).catch(error => error);
  }

  return login;
}(config));