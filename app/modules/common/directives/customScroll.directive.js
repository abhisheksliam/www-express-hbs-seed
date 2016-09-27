"use strict";

angular.module('automationApp')
    .directive('customScroll', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: {
            },
            link: function(scope, element, attrs) {
                $timeout(function(){

                    element.mCustomScrollbar({
                        theme: "minimal-dark",
                        axis: "y",
                        autoHideScrollbar: true,
                        scrollButtons: {
                            enable: true
                        }
                    });

                });

            }
        };
    }]);