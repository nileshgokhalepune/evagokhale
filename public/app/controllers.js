controllers.container = (function() {

  function container(config) {
    this.utils = config.utils;
    this.http = config.http;
  }
  container.prototype.init = function() {
    this.http.get('/valid').then(data => {
      if (!data.valid) {
        utils.router('login', {});
      }
    })
    this.render();
  },
  container.prototype.render = function() {
    this.utils.render('page-content',
      `
                <div class="container-fluid">
                    <div class="header">Main</div>
                    <div id="routes"></div>
                </div>
            `
    )
  }
  return new container(config);
}(config));

controllers.home = (function() {
  function home(config) {
    this.utils = config.utils;
    this.http = config.http;
    this.init();
  }
  home.prototype.init = function() {
    this.render();
  }
  home.prototype.render = function() {
    this.http.get('/partials/home').then(data => {
      this.utils.render('routes', data);
    })
  }
  return new home(config);
}(config));

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
    })
  }
  
  return new login(config);
}(config));