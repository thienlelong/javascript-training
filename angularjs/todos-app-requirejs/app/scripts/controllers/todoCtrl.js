/* global define */
'use strict';

/**
 * @name TodoCtrl
 * @desc Main Controller todo app
 */
function TodoCtrl($scope, $filter, $routeParams, Todo, TodosLoader, todos) {
  $scope.todos = todos;
  $scope.todo = new Todo();
  $scope.editedTodo = null;


  /**
   * @name watch
   * @desc watch onchange todos and update data
   */
  $scope.$watch('todos', function(newValue, oldValue) {
    $scope.remainingCount = $filter('filter')(todos, { completed: false }).length;
    $scope.completedCount = todos.length - $scope.remainingCount;
    $scope.allChecked = !$scope.remainingCount;
  }, true);

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
    var newTodo = $scope.todo;
    if (newTodo.name) {
      newTodo.$save(function(todo) {
        $scope.todo = new Todo();
        todos.push(todo);
      });
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
    if (todo.name.trim()) {
      todo.$save();
    } else {
      $scope.removeTodo(todo);
    }
  };

  /**
   * @name toggleAllCompleted
   * @desc toggle mark all todo list
   * @param {Boolean} completed
   * @returns {void}
   */
  $scope.toggleAllCompleted = function(completed) {
    $scope.todos.forEach(function(todo) {
      todo.completed = completed;
      todo.$save();
    });
  };

  /**
   * @name removeTodo
   * @desc Remove todo item
   * @param {Object} todo
   * @returns {void}
   */
  $scope.removeTodo = function(todo) {
    todo.$remove(function(todo) {
      todos.splice(todos.indexOf(todo), 1);
    });
  };

  /**
   * @name clearCompletedTodos
   * @desc remove all todo item have status completed
   * @param {Array} list todo
   * @returns {void}
   */
  $scope.clearCompletedTodos = function() {
    $scope.todos.forEach(function(todo) {
      if (todo.completed) {
        $scope.removeTodo(todo);
      }
    });

  };

  /**
   * @name toggleCompleted
   * @desc toggle check todo
   * @param {Object} todo
   * @returns {void}
   */
  $scope.toggleCompleted = function(todo) {
    todo.$save();
  };
}

define(['controllers/controllers'], function(controllers) {
  controllers.controller('TodoCtrl', ['$scope', '$filter', '$routeParams', 'Todo', 'TodosLoader', 'todos', TodoCtrl]);
});
