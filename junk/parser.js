Object.defineProperty(exports, "__esModule", {
  value: true
});

var parser = (function() {
  function parser() {
  }

  parser.prototype.parse = function(html, key) {
    var elementList = new Array();
    var startTags = 0;
    for (var i = 0; i < html.length; i++) {
      var isClosing = false;
      if (html[i] === '<') {
        if (html[i + 1] === '/') {
          startTags--;
          isClosing = true;
        } else {
          startTags++;
        }
        console.log(i);
        var pos = findClosingAngle(html, i + 1);
        if (html[pos - 1] === '/') {
          startTags--; //These are self closing elements;
          isClosing = true;
        }
        var element = html.substr(i, pos - i + 1);
        var actualPos = element.indexOf(' ', 1) !== -1 ? element.indexOf(' ', 1) : pos - i - 1;
        var tagName = html.substr(i + 1, actualPos);
        if (!isClosing) {
          element = element.replace('>', ' id="' + key + '_' + tagName + '_' + i + '">');
          html = html.replace(html.substr(i, pos - i + 1), element); 
        }
        elementList.push({
          key: key + '_' + tagName + '_' + i,
          element
        });
        i = pos;
      //Find closing
      }
    }
    if (startTags !== 0)
      throw "Closing tag not found for one of the element."
    console.log('Starttags ' + startTags);
    console.log(this.elementList);
    return {
      html: html,
      children: elementList
    }
  };

  function findClosingAngle(html, startPos) {
    var pos = html.indexOf('>', startPos);
    console.log(pos);
    return pos;
  }
  ;

  return parser;
}());

exports.parser = new parser();
