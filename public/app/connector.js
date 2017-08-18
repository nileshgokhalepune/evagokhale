var connector = (function () {
  function connector(container, svg, containerDiv) {
    this.container = container;
    this.svg = svg;
    this.containerDiv = containerDiv;
    this.graph = graph();
  }

  connector.prototype.connect = function (source, target, uniqueId, text) {
    var path = ui('<path>', true, 'svg').id('path' + uniqueId).attr('d', 'M0 0').attr('stroke', '#000').attr('fill', 'none').attr('stroke-width', '12px');
    path.appendTo(this.svg);
    this.graph.connectElements(this.containerDiv.element, this.svg, path, source, target);
  }

  return connector;
}());