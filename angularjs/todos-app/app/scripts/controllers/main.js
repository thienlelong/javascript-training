'use strict';

/**
 * @ngdoc function
 * @name todosAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todosAppApp
 */
angular.module('todosAppApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
