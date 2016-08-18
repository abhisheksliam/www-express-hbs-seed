"use strict";

angular.module('automationApp.runner')
    .directive('runnerLauncher', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            templateUrl: 'modules/runner/runnerLauncher.tpl.html',
			link: function (scope, element, attributes) {
                $timeout(function(){
                    element.on('click',".item-level-0.dd3-content",function(event) {

                        event.preventDefault();

                        if($(this).hasClass('bg-primary')) {
                            $(this).siblings(".data-items").hide();
                            $(this).removeClass('bg-primary');
                        }
                        else {
                            var activeElement = element.find('.bg-primary');
                            if(activeElement.length != 0) {
                                activeElement.siblings(".data-items").hide();
                                activeElement.removeClass('bg-primary');
                            }

                            $(this).siblings(".data-items").show();
                            $(this).addClass('bg-primary');
                        }

                        event.stopPropagation();
                    });

                });
            }
        }
    }]);

