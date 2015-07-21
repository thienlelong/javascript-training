'use strict';

/**
 * @ngdoc function
 * @name todosAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the todosAppApp
 */
angular.module('todosAppApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
