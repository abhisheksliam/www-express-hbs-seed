/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('methodItem', ['$timeout', function($timeout) {

        return {
            restrict: 'A',
            templateUrl: 'modules/scriptor/method.tpl.html',
            scope: {
                'item': '='
            },
            link: function (scope, element, attributes) {
                $timeout(function(){
                    element.nestable();
                    element.nestable('collapseAll');
                });
            }
        }
    }]);

