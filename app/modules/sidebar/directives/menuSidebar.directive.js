"use strict";

angular.module('automationApp.sidebar')
    .directive('menuSidebar', function() {
        return {
            restrict: 'A',
            templateUrl: 'modules/sidebar/views/menuSidebar.tpl.html',
            link: function (scope, element, attributes) {


            }
        }
    });

