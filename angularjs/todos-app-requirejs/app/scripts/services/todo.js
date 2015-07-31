/*global define */
'use strict';

function Todo($resource, $location) {
  var url = [$location.protocol(), '://', $location.host(), ':8000/todos/:id'].join('');
  return $resource(url, {id: '@id'});
}

define(['services/services'], function(services) {
  services.factory('Todo', ['$resource', '$location', Todo]);
});
