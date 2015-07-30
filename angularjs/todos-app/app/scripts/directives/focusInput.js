/*global define */
'use strict';

function FocusInput() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch(attrs.focus, function(newVal) {
        if (newVal) {
          element[0].focus();
        }
      });
    }
  };
}

define(['directives/directives'], function(directives) {
  directives.directive('focus', FocusInput);
});
