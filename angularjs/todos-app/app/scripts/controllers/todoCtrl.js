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
  $scope.todos = ['sdf', 'sdfsfdsfsf', 's df'];
  TodoStorageService.put($scope.todos)
  console.log($scope.todos);
};
