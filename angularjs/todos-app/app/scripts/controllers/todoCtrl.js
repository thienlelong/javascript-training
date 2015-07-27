/* global define */

'use strict';

/**
 * @name TodoCtrl
 * @desc Main Controller todo app
 */
function TodoCtrl($scope, $filter, $routeParams, TodoStorageService) {
  var todos = $scope.todos = TodoStorageService.get();
  $scope.newTodo = {};
  $scope.editedTodo = null;

  /**
   * @name watch
   * @desc watch onchange todos and update data to localStorage
   */
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
  /**
   * @name routeChangeSuccess
   * @desc event onchange route and update status filter todo
   */
  $scope.$on('$routeChangeSuccess', function() {
    var status = $scope.status = $routeParams.status || '';

    $scope.statusFilter = (status === 'active') ?
      { completed: false } : (status === 'completed') ?
      { completed: true } : {};
  });

  /**
   * @name addTodo
   * @desc add new todo 
   * @param {String} : new todo name
   * @returns {void}
   */
  $scope.addTodo = function() {
    var newTodo = $scope.newTodo.name.trim();
    if (newTodo.length) {
      todos.push({
        name: newTodo,
        completed: false
      });
      $scope.newTodo = {};
    }
    
  };

  /**
   * @name editTodo
   * @desc update info todo
   * @param {Object} todo -todo edit
   * @returns {void}
   */
  $scope.editTodo = function(todo) {
    $scope.editedTodo = todo;
  };

  /**
   * @name doneEditTodo
   * @desc had been change info todo and update local storage
   * @param {Object} todo - todo info
   * @returns {void}
   */
  $scope.doneEditTodo = function(todo) {
    $scope.editedTodo = null;
    var editTodo = todo.name.trim();
    if (!editTodo) {
      $scope.removeTodo(todo);
    }
  }

  /**
   * @name markAll
   * @desc toggle mark all todo list
   * @param {Boolean} completed
   * @returns {void}
   */
  $scope.markAll = function(completed) {
    todos.forEach(function(todo) {
      todo.completed = completed;
    });
  };

  /**
   * @name removeTodo
   * @desc Remove todo item
   * @param {Object} todo
   * @returns {void}
   */
  $scope.removeTodo = function(todo) {
    todos.splice(todos.indexOf(todo), 1);
  };

  /**
   * @name clearCompletedTodos
   * @desc remove all todo item have status completed
   * @param {Array} list todo 
   * @returns {void}
   */
  $scope.clearCompletedTodos = function() {
    $scope.todos = todos = todos.filter(function(todo) {
      return !todo.completed;
    });
  };
}

define(['controllers/controllers'], function(controllers) {
  controllers.controller('TodoCtrl', ['$scope', '$filter', '$routeParams', 'TodoStorageService', TodoCtrl]);
});
