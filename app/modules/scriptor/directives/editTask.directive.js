"use strict";

angular.module('automationApp.scriptor')
    .directive('editTask', ['$timeout','pluginsService', function($timeout,pluginsService) {
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

/*                    $(':radio').each(function () {

                        var checkboxClass = $(this).attr('data-checkbox') ? $(this).attr('data-checkbox') : 'icheckbox_minimal-grey';
                        var radioClass = $(this).attr('data-radio') ? $(this).attr('data-radio') : 'iradio_minimal-grey';

                        if (checkboxClass.indexOf('_line') > -1 || radioClass.indexOf('_line') > -1) {
                            $(this).iCheck({
                                checkboxClass: checkboxClass,
                                radioClass: radioClass,
                                insert: '<div class="icheck_line-icon"></div>' + $(this).attr("data-label")
                            });
                        } else {
                            $(this).iCheck({
                                checkboxClass: checkboxClass,
                                radioClass: radioClass
                            });
                        }
                    });*/

                },200);

            }
        }
    }]);

