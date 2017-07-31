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
