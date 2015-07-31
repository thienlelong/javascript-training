/*global define */
'use strict';

function FocusInput($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch(attrs.focus, function(newVal) {
        if (newVal) {
          $timeout(function() {element[0].focus();}, 100)
        }
      });
    }
  };
}

FocusInput.$inject = ['$timeout']
define([
  'directives/directives'
], function(directives) {
  directives.directive('focus', FocusInput);
});
