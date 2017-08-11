controllers.home = (function() {
  function home(config) {
    this.myHtml;
    this.mainMember = null;
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
    this.renderCanvas();
    this.renderUser();
  }

  home.prototype.renderCanvas = function() {}

  home.prototype.renderUser = function() {
    var _this = this;
    this.mainMember = new controllers.member(config, 1, null);
    this.mainMember.init().then(data => {
      var promises = [];
      _this.http.get('/family/' + 1).then(data => {
        if (data) {
          for (var member of data) {
            var m = new controllers.member(config, member.id, member.member);
            promises.push(m.init());
            this.mainMember.relations.push({
              member: m,
              type: member.type,
              relation: member.relation
            });
          }
          Promise.all(promises).then(d => {
            _this.arrange();
            // svg = new svg();
            // for (var m of this.mainMember.relations) {
            //   svg.drawLine(this.mainMember.userData.id, m.member.userData.id);
            // }
            // svg.append('routes');
          });
        }
      }).catch(error => {
        console.log(error)
      });
    }).catch(error => {
      console.log(error);
    })
    //get other family members of this user and render them.    

  }

  home.prototype.arrange = function() {
    for (var m of this.mainMember.relations) {
      var strategy = placementStrategy(m.type, m.member);
      if (strategy) strategy.move();
    }
  }

  return home;
}(config));

var placementStrategy = function(type, member) {
  switch (type) {
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
    var parents = this.member.relations.filter((m, i) => m.relation === 'parent');
    this.member.hop('top');
  }

  return topStrategy
}());

var leftStrategy = (function(member) {
  function leftStrategy(member) {
    this.member = member;
  }
  leftStrategy.prototype.move = function() {
    var siblings = this.member.relations.filter((m, i) => m.relation === 'sibling');
    this.member.hop('left');
  }
  return leftStrategy;
}())

var rightStrategy = (function() {
  function rightStrategy(member) {
    this.member = member;
  }
  rightStrategy.prototype.move = function() {
    var friends = this.member.relations.filter((m, i) => m.relation === 'friend');
    this.member.hop('right');
  }
  return rightStrategy;
}())

var bottomStrategy = (function() {
  function bottomStrategy(member) {
    this.member = member;
  }

  bottomStrategy.prototype.move = function() {
    //var children = this.member.relations.filter((m, i) => m.relation === 'child');
    this.member.hop('bottom');
  }

  return bottomStrategy;
}())