/* global define */
require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    angular: '../bower_components/angular/angular',
    angularRoute: '../bower_components/angular-route/angular-route',
    angularResource: '../bower_components/angular-resource/angular-resource',
    bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
    angularAnimate: '../bower_components/angular-animate/angular-animate',
    angularSanitize: '../bower_components/angular-sanitize/angular-sanitize'
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    },
    angular: {
      deps: ['jquery', 'bootstrap'],
      exports: 'angular'
    },
    angularRoute: {
      deps: ['angular']
    },
    angularResource: {
      deps: ['angular']
    }
  }
});

require([
  'angular',
  'app',
  'controllers/todoCtrl',
  'services/todoStorage'
],
  function(angular, app) {
    'use strict';

    app.config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'TodoCtrl',
          templateUrl:'views/todo-list.html'
        })
        .when('/:status', {
          controller: 'TodoCtrl',
          templateUrl: 'views/todo-list.html'
        })
        .otherwise({redirectTo:'/'});
    }

    ]);

    angular.element(document).ready(function() {
      angular.bootstrap(document, ['TodosApp']);
    });
  }

);
