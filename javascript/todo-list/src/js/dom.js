/* global helpers */

// define utility methods
var dom = (function() {
  'use strict'

  var _helpers = helpers;
  /*
  * build an element
  *
  * @param {String}     : name of node
  * @return {Element}
  */
  return function(name, attributes) {
    var node = document.createElement(name);
    if (attributes) {
      _helpers.forEachIn(attributes, function(name, value) {
        node.setAttribute(name, value);
      });
    }

    for (var i = 2; i < arguments.length; i++) {
      var child = arguments[i];
      if (typeof child === 'string') {
        child = document.createTextNode(child);
      }

      node.appendChild(child);

    }

    return node;
  };

})();
