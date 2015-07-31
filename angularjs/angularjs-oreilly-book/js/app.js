'use strict';

/* app Module */
var myApp = angular.module('exampleApp', ['ngRoute']);
function emailRouteConfig($routeProvider) {
  $routeProvider.
  when('/', {
    controller: ListController,
    templateUrl: 'partials/list.html'
  }).
// Notice that for the detail view, we specify a parameterized URL component
// by placing a colon in front of the id
  when('/view/:id', {
    controller: DetailController,
    templateUrl: 'partials/detail.html'
  }).
  otherwise({
    redirectTo: '/'
  })
};

// Set up our route so the AMail service can find it
myApp.config(emailRouteConfig);

