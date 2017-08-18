controllers.family = (function () {
  function family(config, id) {
    this.http = config.http;
    this.id = id;
    this.elementId = 'family' + this.id;
  }

  family.prototype.init = function () {
    return new Promise((resolve, reject) => {
      this.http.get('/partials/family').then(data => {
        this.myhtml = utils.modelbind(this, {
          id: this.id
        }, data);
        this.render();
        resolve(true);
      }).catch(error => {
        reject(error);
      });
    })
  }

  family.prototype.arrange = function () {
    for (var m of this.mainMember.relations) {
      var strategy = placementStrategy(m.type, m.member, this.id);
      if (strategy) strategy.move();
    }
  }

  family.prototype.renderFamily = function () {
    var _this = this;
    this.mainMember = new controllers.member(config, 1, null, _this);
    this.mainMember.init().then(data => {
      var promises = [];
      _this.http.get('/family/' + 1).then(data => {
        if (data) {
          for (var member of data) {
            var m = new controllers.member(config, member.id, member.member, _this);
            promises.push(m.init());
            this.mainMember.relations.push({
              member: m,
              type: member.type,
              relation: member.relation
            });
          }
          Promise.all(promises).then(d => {
            //_this.arrange();
            var main = ui("#" + this.mainMember.userData.id).center();
            var container = ui("#family" + this.id);
            var svg = ui('#svg' + this.id);
            var containerDiv = ui('#containerDiv' + this.id);
            var c = new connector(container, svg, containerDiv);
            for (var m of this.mainMember.relations) {
              var rel = ui("#" + m.member.userData.id).randomPos();
              c.connect(main, rel, m.member.userData.id, this.mainMember.userData.userName + ' - is ' + m.relation + ' of ' + m.member.userData.userName);
              // c.connect();
            }
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

  family.prototype.render = function () {
    utils.render('home', this.myhtml, true);
  }

  return family;
}(config));