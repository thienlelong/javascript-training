/* global define ,_ */

'use strict';

/**
 * @ngdoc function
 * @name todosApp.controller:TodoCtrl
 * @description
 * # TodoCtrl
 * Controller of the todosApp
 */
define([
  'controllers/controllers'
], function(controllers) {
  controllers.controller('TodoCtrl', ['$scope', '$filter', '$routeParams', 'TodoStorageService', TodoCtrl]);
});

function TodoCtrl($scope, $filter, $routeParams, TodoStorageService) {
  var todos = $scope.todos = TodoStorageService.get();
  $scope.newTodo = {};
  $scope.editedTodo = null;

  $scope.$watch('todos', function(newValue, oldValue) {
    $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
    $scope.completedCount = todos.length - $scope.remainingCount;
    $scope.allChecked = !$scope.remainingCount;

    if (newValue !== oldValue) {

      // update todos to local Storage
      TodoStorageService.put(todos);
    }
  }, true);

  // monitor the current route for changes and adjust the filter accordingly.
  $scope.$on('$routeChangeSuccess', function() {
    var status = $scope.status = $routeParams.status || '';

    $scope.statusFilter = (status === 'active') ?
      { completed: false } : (status === 'completed') ?
      { completed: true } : {};
  });

  $scope.addTodo = function() {
    var newTodo = $scope.newTodo.title.trim();
    if (!newTodo.length) {
      return;
    }

    todos.push({
      title: newTodo,
      completed: false
    });

    $scope.newTodo = {};
  };

  // check all todo tongle
  $scope.markAll = function(completed) {
    todos.forEach(function(todo) {
      todo.completed = completed;
    });
  };

  // remove todo
  $scope.removeTodo = function(todo) {
    todos.splice(todos.indexOf(todo), 1);
  };

  // clear all todo complete
  $scope.clearCompletedTodos = function() {
    $scope.todos = todos = todos.filter(function(todo) {
      return !todo.completed;
    });
  };
};
