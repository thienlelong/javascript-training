/* global define */
'use strict';

/**
 * @name TodoStorage
 * @desc get and put totos from localStorage
 */
function TodosLoader(Todo, $q) {
  return function() {
    var deferred = $q.defer();

    Todo.query(function(todos) {
      deferred.resolve(todos);
    },

    function() {
      deferred.reject('Unable to fetch todos');
    });

    return deferred.promise;
  };
}

TodosLoader.$inject = ['Todo', '$q']
define([
  'services/services'
], function(services) {
  services.factory('TodosLoader', TodosLoader);
});
