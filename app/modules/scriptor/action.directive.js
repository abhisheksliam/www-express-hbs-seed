/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('actionItem', function() {

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
    });

