/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('actionItem', function() {

        return {
            restrict: 'A',
            templateUrl: 'modules/scriptor/directives/action.tpl.html',
            scope: {
                'action': '=',
                'index' : '='
            },
            link: function (scope, element, attributes) {

                // Toggle Panel Content
                element.find(".panel-header .panel-toggle").click(function (event) {
                    event.preventDefault();

                    if($(this).find('.panel-toggle.closed').length == 0) {
                        var activeElement = $(this).closest('.data-items').find('.panel-toggle.closed');
                        if(activeElement.length != 0) {
                            activeElement.toggleClass("closed").parents(".panel:first").find(".panel-content").slideToggle();
                        }
                    }

                    $(this).toggleClass("closed").parents(".panel:first").find(".panel-content").slideToggle();
                    event.stopPropagation();
                });

                element.find(".panel-header").click(function (event) {
                    event.preventDefault();

                    if($(this).find('.panel-toggle.closed').length == 0) {
                        var activeElement = $(this).closest('.data-items').find('.panel-toggle.closed');
                        if(activeElement.length != 0) {
                            activeElement.toggleClass("closed").parents(".panel:first").find(".panel-content").slideToggle();
                        }
                    }

                    $(this).find(".panel-toggle").toggleClass("closed");
                    $(this).siblings(".panel-content").slideToggle();
                    event.stopPropagation();
                });

                element.find(".panel-content").slideToggle();

                element.find(".panel-header .panel-close").click(function (event) {
                    event.preventDefault();
                    var $item = $(this).parents(".dd-item:first");
                    bootbox.confirm("Are you sure to remove this trigger?", function (result) {
                        if (result === true) {
                            $item.addClass("animated bounceOutRight");
                            window.setTimeout(function () {
                                $item.remove();
                            }, 300);
                        }
                    });
                });

                element.find(".panel-move").click(function (event) {
                    event.preventDefault();
                    //todo
                    event.stopPropagation();
                });

                element.find(".panel-copy").click(function (event) {
                    event.preventDefault();
                    //todo
                    event.stopPropagation();
                });
            }
        }
    });

