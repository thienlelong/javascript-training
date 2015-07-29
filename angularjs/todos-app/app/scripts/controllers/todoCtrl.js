/* global define */

'use strict';

/**
 * @name TodoCtrl
 * @desc Main Controller todo app
 */
function TodoCtrl($scope, $filter, $routeParams, TodoStorageService, Todo, TodosLoader, todos) {
  $scope.todos = todos
  $scope.todo = new Todo();
  $scope.editedTodo = null;

  $scope.refreshTodos = function() {
    var promise = new TodosLoader();

    promise.then(function(todos) {
      $scope.todos = todos
    });
  };

  /**
   * @name watch
   * @desc watch onchange todos and update data to localStorage
   */
  $scope.$watch('todos', function(newValue, oldValue) {
    $scope.remainingCount = $filter('filter')($scope.todos, { completed: false }).length;
    $scope.completedCount = $scope.todos.length - $scope.remainingCount;
    $scope.allChecked = !$scope.remainingCount;
    console.log('watch');
    if (newValue !== oldValue) {

      // update todos to local Storage
      // TodoStorageService.put(todos);
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
    $scope.todo.$save(function(todo) {
      $scope.todo = new Todo();
      $scope.refreshTodos();
    });

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
    $scope.todos.forEach(function(todo) {
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
    todo.$remove(function() {
      $scope.refreshTodos();
    });
  };

  /**
   * @name clearCompletedTodos
   * @desc remove all todo item have status completed
   * @param {Array} list todo
   * @returns {void}
   */
  $scope.clearCompletedTodos = function() {
  /*  $scope.todos = todos = todos.filter(function(todo) {
      return !todo.completed;
    });*/
    $scope.todos.forEach(function(todo) {
      if (todo.completed){
        todo.$remove();
      }
    });
    $scope.refreshTodos();
  };
}

define(['controllers/controllers'], function(controllers) {
  controllers.controller('TodoCtrl', ['$scope', '$filter', '$routeParams', 'TodoStorageService', 'Todo', 'TodosLoader', 'todos', TodoCtrl]);
});
