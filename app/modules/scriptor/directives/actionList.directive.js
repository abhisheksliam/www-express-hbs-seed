/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('actionList', function() {
        return {
            restrict: 'A',
            templateUrl: 'modules/scriptor/directives/views/actionList.tpl.html',
            scope: {
                'triggers': '='
            }
        }
    });

