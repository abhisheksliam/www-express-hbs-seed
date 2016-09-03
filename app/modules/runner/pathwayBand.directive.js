"use strict";

angular.module('automationApp.runner')
    .directive('pathwayBand', function() {
        return ({
            restrict: "E",
            template: "<span>M-{{modifiedPathway}}</span>",
            replace: true,
            link: function(scope) {
                var lastIndex = scope.pathway.lastIndexOf(",")

                var s1 = scope.pathway.substring(0, lastIndex);
                var s2 = scope.pathway.substring(lastIndex + 1);

                scope.modifiedPathway = s2;

            }
        });
    });

