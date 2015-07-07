var app = app || {};

;(function(){
  'use strict';

  var helper = {

   /**
    * Get data from browser's localStorage
    * @return {Object} localStorage object
    */
    getLocalStorage: function () {
      if (typeof Storage !== 'undefined') {
        return localStorage;
      } else {
        throw new Error('Sorry! No Web Storage support');
      }
    }
  };

  app.helper = helper;

}) ();