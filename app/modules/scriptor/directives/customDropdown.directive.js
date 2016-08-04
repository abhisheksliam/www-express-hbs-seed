"use strict";

angular.module('automationApp.scriptor')
    .directive('customDropdown',['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                $timeout(function(){
                    //console.log('inside dir 2');
                    var customSelect = element.find('select').select2({
                        dropdownCssClass: 'form-white',
                        minimumResultsForSearch: -1
                    });
                    customSelect.select2('val', scope.applicationName);
                    customSelect.on("change", function (e) {
                        scope.applicationName = e.val;
                        scope.$apply();
                    });
                },200);
            }
        }
    }]);

