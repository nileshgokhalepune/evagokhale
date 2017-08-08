controllers.home = (function() {
  function home(config) {
    this.myHtml;

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
    var mainMember = new controllers.member(config, 1);
    //get other family members of this user and render them.    
    this.http.get('/family/' + 1).then(data => {
      if (data) {
        for (var member of data) {
          var m = new controllers.member(config, member.id);
          mainMember.relations.push(m);
        }
      }
    }).catch(error => {
      console.log(error)
    });
  }

  home.prototype.arrange = function() {
    for (var m in member.relations) {

    }
  }

  return home;
}(config));

var placementStrategy = function(member) {}

var topStrategy = function(member) {
  var parents = member.relations.filter((m, i) => m.relation === 'parent');
  utils.move('top', 'center', parents);
}

var leftStrategy = function(member) {
  var siblings = member.relations.filter((m, i) => m.relation === 'sibling');
  utils.move('left', 'center', siblings);
}

var rightStrategy = function(member) {
  var friends = member.relations.filter((m, i) => m.relation === 'friend');
  utils.move('right', 'center', friends);
}

var bottomStrategy = function(member) {
  var children = member.relations.filter((m, i) => m.relation === 'child');
  utils.move('right', 'center', children);
}