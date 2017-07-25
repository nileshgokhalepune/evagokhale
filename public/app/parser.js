Object.defineProperty(exports, "__esModule", {
  value: true
});

var parser = (function() {
  function parser() {
    this.elementList = new Array();
  }

  parser.prototype.parse = function(html) {
    var startTags = 0; 
    for (var i = 0; i < html.length; i++) {
      if (html[i] === '<') {
        if (html[i + 1] === '/') {
          startTags--;
        } else {

          startTags++;
        }
        console.log(i);
        var pos = findClosingAngle(html, i + 1);
        if (html[pos - 1] === '/') {
          startTags--; //These are self closing elements;
        }
        this.elementList.push(html.substr(i, pos - i + 1));
        i = pos;
      //Find closing
      }
    }
    if (startTags !== 0)
      throw "Closing tag not found for one of the element."
    console.log('Starttags ' + startTags); 
    console.log(this.elementList);
  };

  function findClosingAngle(html, startPos) {
    var pos = html.indexOf('>', startPos);
    console.log(pos);
    return pos;
  };

  return parser;
}());

exports.parser = new parser();
