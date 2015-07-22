/* global define */

'use strict';

/**
 * @ngdoc function
 * @name todosApp.controller:ListCtrl
 * @description
 * # MainCtrl
 * Controller of the todosApp
 */
define([
  'controllers/controllers'
], function(controllers) {
  controllers.controller('TodoCtrl', ['$scope', 'TodoStorageService', TodoListCtrl]);
});

function TodoListCtrl($scope, TodoStorageService) {
  $scope.todos = [{title: 'newTodo', completed: false}, {title: 'fsdf', completed: false}];
  $scope.remainingCount = 5;
  $scope.completedCount = 1;
  TodoStorageService.put($scope.todos)
};
