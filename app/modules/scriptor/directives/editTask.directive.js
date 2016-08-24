"use strict";

angular.module('automationApp.scriptor')
    .directive('editTask', ['$timeout', function($timeout) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'modules/scriptor/directives/views/editTask.tpl.html',
            link: function (scope, element, attributes) {
                scope.iCheckOptions = {
                    radioClass: 'iradio_flat-blue'
                };

                $timeout(function(){
                    var scenarioSelect = element.find('select').select2({
                        dropdownCssClass: 'form-white',
                        minimumResultsForSearch: -1
                    });

                },200);

            }
        }
    }]);

