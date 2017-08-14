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
  }
  return connector;
}());