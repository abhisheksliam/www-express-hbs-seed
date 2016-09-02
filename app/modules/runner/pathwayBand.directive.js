"use strict";

angular.module('automationApp.runner')
    .directive('pathwayBand', function() {
        return ({
            restrict: "E",
            template: "<span>M-{{modifiedPathway}}</span>",
            replace: true,
            link: function(scope) {
                var lastIndex = scope.pathway.lastIndexOf(",")

                var s1 = scope.pathway.substring(0, lastIndex); //after this s1="Text1, Text2, Text"
                var s2 = scope.pathway.substring(lastIndex + 1);

                scope.modifiedPathway = s2;
                scope.$apply();
            }
        });
    });

