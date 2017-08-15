var connector = (function() {
  function connector(source, target) {
    this.source = source;
    this.target = target;
  }

  connector.prototype.connect = function() {
    if (typeof this.source === 'string') {
      this.source = document.getElementById(this.source);
    }
    if (typeof this.target == 'string') {
      this.target = document.getElementById(this.target);
    }

    var sourceRect = this.source.getBoundingClientRect();
    var targetRect = this.target.getBoundingClientRect();

    ui('<div>').style({
      'background-color': 'red',
      width: '100px',
      height: '1px'
    }).appendTo(ui('body'));
  }

  return connector;
}());