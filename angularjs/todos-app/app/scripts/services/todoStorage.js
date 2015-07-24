/*global define */
'use strict';
/**
 * services that persists and retrieves TODOs from localStorage
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

define(['services/services'], function(services) {
  services.factory('TodoStorageService', TodoStorage);
});








