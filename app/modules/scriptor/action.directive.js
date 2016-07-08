/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('actionItem', function() {

        return {
            restrict: 'A',
            templateUrl: 'modules/scriptor/action.tpl.html',
            scope: {
                'action': '=',
                'index' : '='
            },
            link: function (scope, element, attributes) {

                // Toggle Panel Content
                element.find(".panel-header .panel-toggle").click(function (event) {
                    event.preventDefault();
                    $(this).toggleClass("closed").parents(".panel:first").find(".panel-content").slideToggle();
                });

                element.find(".panel-content").slideToggle();

                element.find(".panel-header .panel-close").click(function (event) {
                    event.preventDefault();
                    var $item = $(this).parents(".dd-item:first");
                    bootbox.confirm("Are you sure to remove this panel?", function (result) {
                        if (result === true) {
                            $item.addClass("animated bounceOutRight");
                            window.setTimeout(function () {
                                $item.remove();
                            }, 300);
                        }
                    });
                });
            }
        }
    });

