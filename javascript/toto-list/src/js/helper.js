// Define utility methods
var helpers = (function(){
  "use strict";

  var helpers = {
    /*
    * Loop a object likes a dictionary
    * @param {Object}     : an object
    * @param {Function()} : callback function
    * @return {void}
    */
    forEachIn: function(object, action) {
      for (var property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property)) {
          action(property, object[property]);
        }
      }
    },

    /* Add event listener for element
    * @param {Element}     : node
    * @param {String}      : event
    * @param {Function()} : callback funtion
    * @return {void}
    */
    registerEventHandler: function(node, event, handler) {
      if (typeof node.addEventListener === 'function') {
        // For all major browsers, except IE 8 and earlier
        node.addEventListener(event, handler, false);
      } else {
        // For IE 8 and earlier versions
        node.attachEvent('on' + event, handler);
      }
    },

    /* Remove event listener of element
    * @param {Element}     : node
    * @param {String}      : event
    * @param {Function()}
    * @return {void}
    */
    unregisterEventHandler: function(node, event, handler) {
      if (typeof node.addEventListener === 'function') {
        // For all major browsers, except IE 8 and earlier
        node.removeEventListener(event, handler, false);
      } else {
        // For IE 8 and earlier versions
        node.detachEvent('on' + event, handler);
      }
    },

    /* Remove an element
    * @param {Element}     : node
    * @return {void}
    */
    removeNode: function(node) {
      node.parentNode.removeChild(node);
    },

    /* Add an element before another
    * @param {Element}     : node
    * @param {Element}     : node
    * @return {void}
    */
    insertBefore: function(newNode, node) {
      node.parentNode.insertBefore(newNode, node);
    },

    /* Normalizing Event Objects - goes over all the event object properties
    * @param {Object}   : event
    * @return {Object}  : optimized event
    */
    normalizeEvent: function(event) {
      // Cancel bubbling and default action of event
      if (!event.stopPropagation) {
        event.stopPropagation = function() {
          this.cancelBubble = true;
        };
        event.preventDefault = function() {
          this.returnValue = false;
        };
      }
      if (!event.stop) {
        event.stop = function() {
          this.stopPropagation();
          this.preventDefault();
        };
      }
      if (event.srcElement && !event.target) {
        event.target = event.srcElement;
      }
      // if ((event.toElement || event.fromElement) && !event.relatedTarget) {
      //   event.relatedTarget = event.toElement || event.fromElement;
      // }
      if (typeof event.clientX !== 'undefined' && typeof event.pageX === 'undefined') {
        event.pageX = event.clientX + document.body.scrollLeft;
        event.pageY = event.clientY + document.body.scrollTop;
      }
      if (event.type === 'keypress') {
        event.character = String.fromCharCode(event.charCode || event.keyCode);
      }

      return event;
    },

    /* Add event listener
    * @param {Element}     : node
    * @param {String}      : event
    * @param {Function}    : function
    * @return {Object}     : object
    */
    addHandler: function(node, type, handler) {
      function wrapHandler(event) {
        handler(helpers.normalizeEvent(event || window.event));
      }

      this.registerEventHandler(node, type, wrapHandler);
      var obj = {
        node: node,
        type: type,
        handler: wrapHandler
      };
      return obj;
    },

    /* Remove event listener
    * @param {Object}     : object
    * @return {void}
    */
    removeHandler: function(object) {
      this.unregisterEventHandler(object.node, object.type, object.handler);
    },

    /* Call a method within its scope
    * @param {Object}
    * @param {String}
    * @return {Function}
    */
    method: function(object, name) {
      return function() {
        object[name].apply(object, arguments);
      };
    },

    getLocalStorage: function() {
      try {
        if(typeof(Storage) !== "undefined") {
          return localStorage;
        } else {
          throw new Error("Sorry! No Web Storage support");
        }
      } catch(err) {
        console.log(err.name + " " + err.message);
      }
    },

    /**
     * Add class to an element
     * @param {Element} node
     * @param {string}  className
     */
    addClass: function(node, className) {

      // Add class name to element if it hasn't
      if (!this.hasClass(node, className)) {
        if (node.classList) {
          node.classList.add(className);
        } else {
          // Fix < IE 9
          node.className += ' ' + className;
        }
      }
    },

    /**
     * Remove class from element if it has
     * @param  {Element} node
     * @param  {string}  className
     * @return {void}
     */
    removeClass: function(node, className) {

      if (this.hasClass(node, className)) {

        if (node.classList) {
          node.classList.remove(className);
        } else {
          // Fix < IE 9
          node.className = node.className.replace(new RegExp('(^|\\b)' +
              className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      }
    },

    /**
     * Checking the element has class `className` or not
     * @param  {Element}  node
     * @param  {string}   className
     * @return {Boolean}           [description]
     */
    hasClass: function(node, className) {

      var hasClazz = false;

      if (node.classList) {
        hasClazz = node.classList.contains(className);
      } else {
        // Fix < IE 9
        hasClazz = new RegExp('(^| )' + className + '( |$)', 'gi').test(node.className);
      }

      return hasClazz;
    }


  };

  return helpers;
})();
