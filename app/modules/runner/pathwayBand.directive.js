"use strict";

angular.module('automationApp.runner')
    .directive('pathwayBand', function() {
        return ({
            restrict: "E",
            template: "<span>M-{{modifiedPathway}}</span>",
            replace: true,
            link: function(scope) {
                var stringDelimiter = "/";

                var lastIndex = scope.pathway.lastIndexOf(stringDelimiter);
                scope.modifiedPathway = scope.pathway.substring(lastIndex + 1);
            }
        });
    });

