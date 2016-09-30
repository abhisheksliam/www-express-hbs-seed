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
                        theme: "dark",
                        autoHideScrollbar: true,
                        advanced:{ updateOnContentResize: true,
                            updateOnBrowserResize:true},
                        autoExpandScrollbar: true,
                        scrollInertia:350,
                        autoDraggerLength:true
                    });
                },2000);
            }
        };
    }]);