/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
.directive('runnerNestedList', ['$timeout', function($timeout) {

    return {
        restrict: 'A',
        templateUrl: 'modules/scriptor/directives/scriptor.tpl.html',
        scope: {
            'items': '='
        },
        link: function (scope, element, attributes) {
            $timeout(function(){
                element.nestable();
                element.nestable('collapseAll');
            });
        }
    }
}]);


