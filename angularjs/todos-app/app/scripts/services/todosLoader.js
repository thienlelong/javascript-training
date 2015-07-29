'use strict';

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

define([
  'services/services'
], function(services) {
  services.factory('TodosLoader', ['Todo', '$q', TodosLoader]);
});
