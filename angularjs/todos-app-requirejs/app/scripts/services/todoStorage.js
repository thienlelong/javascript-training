/*global define */
'use strict';

/**
 * @name TodoStorage
 * @desc get and put totos from localStorage
 */

function TodoStorage() {

  var STORAGE_ID = 'todos';

  return {

    get: function() {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },

    put: function(todos) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
    }
  };

}

define([
  'services/services'
], function(services) {
  services.factory('TodoStorageService', TodoStorage);
});










