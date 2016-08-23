"use strict";

angular.module('automationApp.runner')
    .directive('runnerLauncher', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            templateUrl: 'modules/runner/runnerLauncher.tpl.html',
            link: function (scope, element, attributes) {
                scope.itemSelection;
                scope.methodSelection;

                $timeout(function(){
                    element.on('click',".item-level-0.dd3-content",function(event) {

                        event.preventDefault();

                        if($(this).hasClass('bg-primary')) {
                            $(this).siblings(".data-items").hide();
                            $(this).removeClass('bg-primary');
                        }
                        else {
                            $(this).siblings(".data-items").show();
                            $(this).addClass('bg-primary');
                        }

                        event.stopPropagation();
                    });

                    // checkbox button update
                    element.on('click',".item-level-0.dd3-content .item-check",function(event) {

                        if ($("input[type='checkbox']").is(":checked")) {
                            $(".runtaskbtn").attr("disabled", false);
                            $(".runtaskbtn").removeClass("disablebtn").addClass("enablebtn");
                        } else {
                            $(".runtaskbtn").attr("disabled", true);
                            $(".runtaskbtn").removeClass("enablebtn").addClass("disablebtn");
                        }

                        event.stopPropagation();
                    });

                    // run task button
                    element.on('click',".runtaskbtn",function(event) {
                        event.stopPropagation();
                    });

                    // run task button
                    element.on('hover',".runtaskbtn",function(event) {
                        event.stopPropagation();
                    });
                });
            }
        }
    }]);

