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
    this.myhtml = this.utils.modelbind(this, {}, `
        <nav class="navbar navbar-default">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Family</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li><button class="btn" [click]="controllers.container.showInviteDialog()">Invite</button></li>
          </ul>
        </div>
        </nav>
        <div id="routes"></div>
        <div id="modal" class="hide">
        </div>
      `);
    this.utils.render('page-content', this.myhtml);
  },
  container.prototype.showInviteDialog = function() {
    this.http.get('/partials/invite').then(data => {
      utils.render('modal', data);
      ui('#modal').show();
    //var modal = utils.getHost('modal');
    });
  }
  return new container(config);
}(config));
