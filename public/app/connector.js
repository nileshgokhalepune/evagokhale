var connector = (function() {
  function connector(container) {
    // source, target,, uniqueId
    // this.source = source;
    // this.target = target;
    this.container = container;
    // this.text = text;
    // this.uniqueId = uniqueId;
    this.svg = ui('<svg>', true, 'svg');
    this.containerDiv = ui('<div>').id('svgContainer');
    this.graph = graph();
    this.svg.appendTo(this.containerDiv);
    this.containerDiv.appendTo(this.container);
  }

  connector.prototype.connect = function(source, target, uniqueId, text) {
    this.svg.id('svg' + uniqueId); 
    var path = ui('<path>', true, 'svg').id('path' + uniqueId).attr('d', 'M0 0').attr('stroke', '#000').attr('fill', 'none').attr('stroke-width', '12px');
    path.appendTo(this.svg);
    this.graph.connectElements(this.svg.element, path, source, target);
    // var src = ui(this.source);
    // var trg = ui(this.target)
    // var sourceRect = src.bounds();
    // var targetRect = trg.bounds();
    // var top = (sourceRect.top - targetRect.top) < 0 ? targetRect.top : sourceRect.top;
    // var left = (sourceRect.left - targetRect.left) < 0 ? targetRect.left : sourceRect.left;

  // ui('<div>').style({
  //   'background-color': 'red',
  //   top: top + 'px',
  //   left: left + 'px',
  //   position: 'absolute',
  //   width: '100px',
  //   height: '10px;'
  // }).appendTo(ui(this.container)).text(this.text);
  }

  return connector;
}());