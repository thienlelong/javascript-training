
function Todo($resource) {
  return $resource('http://localhost:8000/todos/:id', {id: '@id'});
}

define(['services/services'], function(services) {
  services.factory('Todo', ['$resource', Todo]);
});
