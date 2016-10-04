"use strict";

angular.module('automationApp')
    .directive('customScroll', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            scope: {
                triggers : "="
            },
            link: function(scope, element, attrs) {

                scope.$watch('triggers', function(newValue) {
                    if (newValue !== undefined) {
                        element.mCustomScrollbar({
                            theme: "dark",
                            autoHideScrollbar: true,
                            advanced:{ updateOnContentResize: true,
                                updateOnBrowserResize:true},
                            autoExpandScrollbar: true,
                            scrollInertia:350,
                            autoDraggerLength:true,
                            mouseWheel:{
                                enable:true,
                                scrollAmount:5
                            }
                        });
                    }
                });

            }
        };
    }]);