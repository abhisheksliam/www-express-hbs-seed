"use strict";

angular.module('automationApp.scriptor')
    .directive('editTask', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'modules/scriptor/directives/views/editTask.tpl.html',
            //transclude: true,
            link: function (scope, element, attributes) {
                $timeout(function(){
                    var scenarioSelect = element.find('select').select2({
                        dropdownCssClass: 'form-white',
                        minimumResultsForSearch: -1
                    });
                });
            }
        }
    }]);

