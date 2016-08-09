"use strict";

angular.module('automationApp.scriptor')
    .directive('inputEditable', function() {
        return {
            restrict: 'A',
            templateUrl: 'modules/scriptor/directives/views/inputEditable.tpl.html',
            scope: {
                'triggers': '='
            }
        }
    });
