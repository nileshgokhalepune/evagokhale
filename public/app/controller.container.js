controllers.container = (function() {

  function container(config) {
    this.utils = config.utils;
    this.http = config.http;
  }
  container.prototype.init = function() {
    if (!this.utils.isvalid()) {
      this.http.get('/valid').then(data => {
        if (!data.valid) {
          this.utils.set(data);
          utils.router('login', {});
        }
      })
    }
    this.render();
    utils.router('home', {});
  },
  container.prototype.render = function() {
    this.utils.render('page-content',
      `
                <div class="container-fluid">
                    <div class="header">
                      <div class="menu">Invite</div>
                    </div>
                    
                    <div id="routes"></div>
                </div>
            `
    )
  }
  return new container(config);
}(config));
