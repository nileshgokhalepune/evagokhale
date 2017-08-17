var connector = (function () {
  function connector(source, target, container, text) {
    this.source = source;
    this.target = target;
    this.container = container;
    this.text = text;
  }

  connector.prototype.connect = function () {
    var src = ui(this.source);
    var trg = ui(this.target)
    var sourceRect = src.bounds();
    var targetRect = trg.bounds();
    var top = (sourceRect.top - targetRect.top) < 0 ? targetRect.top : sourceRect.top;
    var left = (sourceRect.left - targetRect.left) < 0 ? targetRect.left : sourceRect.left;

    ui('<div>').text(this.text).style({
      'background-color': 'red',
      top: top + 'px',
      left: left + 'px',
      position: 'absolute',
      width: '100px',
      height: '10px;'
    }).appendTo(ui(this.container));
  }

  return connector;
}());