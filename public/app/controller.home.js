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
    var mainMember = new controllers.member(config, 1, null);

    //get other family members of this user and render them.    
    this.http.get('/family/' + 1).then(data => {
      if (data) {
        for (var member of data) {
          var m = new controllers.member(config, member.id, member);
          mainMember.relations.push(m);
        }
      }
    }).catch(error => {
      console.log(error)
    });
  }

  home.prototype.arrange = function() {
    for (var m in member.relations) {
      var strategy = placementStrategy(m);
      strategy.move();
    }
  }

  return home;
}(config));

var placementStrategy = function(member) {
  switch (member.type) {
    case "spouse": {
      break;
    }
    case "child": {
      return new bottomStrategy(member);
    }
    case "sibling": {
      return new leftStrategy(member);
    }
    case "parent": {
      return new topStrategy(member);
    }
    case "friend": {
      return new rightStrategy(member);
    }
  }
}

var topStrategy = (function() {
  function topStrategy(member) {
    this.member = member;
  }

  topStrategy.prototype.move = function() {
    var parents = member.relations.filter((m, i) => m.relation === 'parent');
    utils.move('top', 'center', parents);
  }

  return topStrategy
}(member));

var leftStrategy = (function(member) {
  function leftStrategy(member) {
    this.member = member;
  }
  leftStrategy.prototype.move = function() {
    var siblings = member.relations.filter((m, i) => m.relation === 'sibling');
    utils.move('left', 'center', siblings);
  }

}(member))

var rightStrategy = (function() {
  function rightStrategy(member) {
    this.member = member;
  }
  rightStrategy.prototype.move = function() {
    var friends = member.relations.filter((m, i) => m.relation === 'friend');
    utils.move('right', 'center', friends);
  }
  return rightStrategy;
}(member))

var bottomStrategy = (function() {
  function bottomStrategy(member) {
    this.member = member;
  }

  bottomStrategy.prototype.move = function() {
    var children = member.relations.filter((m, i) => m.relation === 'child');
    utils.move('right', 'center', children);
  }

  return bottomStrategy;
}(member))