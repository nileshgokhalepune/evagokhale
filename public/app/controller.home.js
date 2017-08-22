controllers.home = (function () {
  function home(config) {
    this.myHtml;
    this.currentUserFamily = {};
    this.mainMember = null;
    this.utils = config.utils;
    this.http = config.http;
    this.init();
  }
  home.prototype.init = function () {
    this.http.get('/partials/home').then(data => {
      this.myHtml = data;
      this.render();
      this.currentUserFamily = new controllers.family(config, 1);
      this.currentUserFamily.init().then(data => {
        this.currentUserFamily.renderFamily();
      })
    }).then(d => {
    });
  }

  home.prototype.render = function () {
    this.utils.render('routes', this.myHtml);
  }

  home.prototype.showFamily = function () {
    alert("showing");
  }
  return home;
}(config));

var placementStrategy = function (type, member, containerId) {
  switch (type) {
    case "spouse": {
      return new centerStrategy(member, containerId);
      break;
    }
    case "child": {
      return new bottomStrategy(member, containerId);
      break;
    }
    case "sibling": {
      return new leftStrategy(member, containerId);
      break;
    }
    case "parent": {
      return new topStrategy(member, containerId);
      break;
    }
    case "friend": {
      return new rightStrategy(member, containerId);
      break;
    }
  }
}

var centerStrategy = (function () {
  function centerStrategy(member, containerId) {
    this.member = member;
    this.containerId = containerId;
  }

  centerStrategy.prototype.move = function () {
    var spouse = this.member.relations.filter((m, i) => m.relation === 'spouse');
    this.member.hop('center' + this.containerId);
  }

  return centerStrategy;
}());

var topStrategy = (function () {
  function topStrategy(member, containerId) {
    this.member = member;
    this.containerId = containerId;
  }

  topStrategy.prototype.move = function () {
    var parents = this.member.relations.filter((m, i) => m.relation === 'parent');
    this.member.hop('top' + this.containerId);
  }

  return topStrategy
}());

var leftStrategy = (function () {
  function leftStrategy(member, containerId) {
    this.member = member;
    this.containerId = containerId;
  }
  leftStrategy.prototype.move = function () {
    var siblings = this.member.relations.filter((m, i) => m.relation === 'sibling');
    this.member.hop('left' + this.containerId);
  }
  return leftStrategy;
}())

var rightStrategy = (function () {
  function rightStrategy(member, containerId) {
    this.member = member;
    this.containerId = containerId;
  }
  rightStrategy.prototype.move = function () {
    var friends = this.member.relations.filter((m, i) => m.relation === 'friend');
    this.member.hop('right' + this.containerId);
  }
  return rightStrategy;
}())

var bottomStrategy = (function () {
  function bottomStrategy(member, containerId) {
    this.member = member;
    this.containerId = containerId;
  }

  bottomStrategy.prototype.move = function () {
    var children = this.member.relations.filter((m, i) => m.relation === 'child');
    this.member.hop('bottom' + this.containerId);
  }

  return bottomStrategy;
}())