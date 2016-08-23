"use strict";

angular.module('automationApp.core')
    .directive('menuSidebar', function() {
        return {
            restrict: 'A',
            templateUrl: 'modules/core/sidebar/menuSidebar.tpl.html',
            link: function (scope, element, attributes) {


            }
        }
    });

