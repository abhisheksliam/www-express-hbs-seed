/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('actionItem', ['$timeout', function($timeout) {

        return {
            restrict: 'A',
            templateUrl: 'modules/scriptor/action.tpl.html',
            scope: {
                'action': '=',
                'index' : '='
            },
            link: function (scope, element, attributes) {

            }
        }
    }]);

