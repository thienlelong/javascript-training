/*global angular */

/**
 * services that persists and retrieves TODOs from localStorage
 */

define([
  'services/services'
], function(services) {
  services.factory('TodoStorageService', TodoStorage);
});

function TodoStorage() {
  'use strict';

  var STORAGE_ID = 'todos';

  return {

    get: function() {
      return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
    },

    put: function(todos) {
      localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
    }
  };
};





