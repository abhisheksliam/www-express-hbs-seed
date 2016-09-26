"use strict";

angular.module('automationApp')
    .directive('customScroll', ['$log', function($log) {
        return {
            restrict: 'A',
            scope: {
            },
            link: function postLink(scope, iElement, iAttrs, controller, transcludeFn) {

                iElement.mCustomScrollbar({
                    theme: 'dark',
                    axis: "y",
                    scrollButtons: {
                        enable: true
                    }
                });

            }
        };
    }]);