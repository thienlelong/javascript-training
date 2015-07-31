/* global require */
require.config({
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    angular: '../bower_components/angular/angular',
    angularRoute: '../bower_components/angular-route/angular-route',
    angularResource: '../bower_components/angular-resource/angular-resource',
    bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap'
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
  'services/todoStorage',
  'services/todo',
  'services/todosLoader',
  'directives/focusInput'
],
  function(angular, app) {
    'use strict';

    app.config(['$routeProvider', function($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'TodoCtrl',
          templateUrl:'views/todo-list.html',
          resolve: {
            todos: ['TodosLoader', function(TodosLoader) {
              return new TodosLoader();
            }]
          }
        })
        .when('/:status/', {
          controller: 'TodoCtrl',
          templateUrl: 'views/todo-list.html',
          resolve: {
            todos: ['TodosLoader', function(TodosLoader) {
              return new TodosLoader();
            }]
          }
        })
        .otherwise({redirectTo:'/'});
    }

    ]);

    angular.element(document).ready(function() {
      angular.bootstrap(document, ['TodosApp']);
    });
  }

);
