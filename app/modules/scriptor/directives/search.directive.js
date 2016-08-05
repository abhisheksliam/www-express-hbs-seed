/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('searchInput', ['$compile', '$timeout', function($compile, $timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {},
            link: function(scope, el, attrs, ctrl) {

                el.addClass('reset-field');

                var template = $compile('<i ng-show="enabled" ng-mousedown="reset()" class="fa fa-close"></i>')(scope);
                el.after(template);

                scope.reset = function() {
                    ctrl.$setViewValue(null);
                    ctrl.$render();
                    $timeout(function() {
                        el[0].focus();
                    }, 0, false);
                };

                el.bind('input focus', function() {
                    scope.enabled = !ctrl.$isEmpty(el.val());
                    if(!scope.$$phase) {
                        scope.$apply();
                    }
                })
/*                    .bind('blur', function() {
                        scope.enabled = false;
                        if(!scope.$$phase) {
                            scope.$apply();
                        }
                    });*/
            }
        };
    }]);