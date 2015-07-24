/* global define */

'use strict';

/**
 * @ngdoc function
 * @name todosApp.controller:TodoCtrl
 * @description
 * # TodoCtrl
 * Controller of the todosApp
 */
function TodoCtrl($scope, $filter, $routeParams, TodoStorageService) {
  var todos = $scope.todos = TodoStorageService.get();
  $scope.newTodo = {};
  $scope.editedTodo = null;

  // watch todos onchange
  $scope.$watch('todos', function(newValue, oldValue) {
    $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
    $scope.completedCount = todos.length - $scope.remainingCount;
    $scope.allChecked = !$scope.remainingCount;

    if (newValue !== oldValue) {

      // update todos to local Storage
      TodoStorageService.put(todos);
    }
  }, true);

  // the current route for changes and filter todo on status
  $scope.$on('$routeChangeSuccess', function() {
    var status = $scope.status = $routeParams.status || '';

    $scope.statusFilter = (status === 'active') ?
      { completed: false } : (status === 'completed') ?
      { completed: true } : {};
  });

  // add new todo
  $scope.addTodo = function() {
    var newTodo = $scope.newTodo.name.trim();
    if (!newTodo.length) {
      return;
    }

    todos.push({
      name: newTodo,
      completed: false
    });

    $scope.newTodo = {};
  };

  // edit todo
  $scope.editTodo = function(todo) {
    $scope.editedTodo = todo;
  };

  // edit todo when enter or focus out input
  $scope.doneEditTodo = function(todo) {
    $scope.editedTodo = null;
    var editTodo = todo.name;
    if (!editTodo) {
      $scope.removeTodo(todo);
    }
  }

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
}

define(['controllers/controllers'], function(controllers) {
  controllers.controller('TodoCtrl', ['$scope', '$filter', '$routeParams', 'TodoStorageService', TodoCtrl]);
});
