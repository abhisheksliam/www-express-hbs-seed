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
                        $(".runtaskbtnd").removeClass("runtaskbtnd").addClass("");
                        event.stopPropagation();
                    });

                    // run task button
                    element.on('click',".runtaskbtn",function(event) {
                        console.log('clicking run task button');

                        event.stopPropagation();
                    });
                });
            }
        }
    }]);

