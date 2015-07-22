/* global define */
'use strict';

/**
 * @ngdoc overview
 * @name todosAppApp
 * @description
 * # todosAppApp
 *
 * Main module of the application.
 */

define([
  'angular',
  'angularRoute',
  'controllers/controllers',
  'services/services'
  ], function(angular) {
  return angular.module('TodosApp', ['ngRoute', 'controllers', 'services']);
});
