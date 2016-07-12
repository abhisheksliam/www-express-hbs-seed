/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
.directive('runnerNestedList', ['$timeout', function($timeout) {

    return {
        restrict: 'A',
        templateUrl: 'modules/scriptor/directives/scriptor.tpl.html',
        scope: {
            'items': '='
        },
        link: function (scope, element, attributes) {
            $timeout(function(){
                //element.nestable();
                //element.nestable('collapseAll');

                element.sortable({
                    placeholder: "placeholder-ui",
                    items: "ol:not(.ui-sort-disabled)",
                    handle: ".item-level-0"
                });

                element.find( ".li-level-0" ).sortable({
                    items: "ol",
                    placeholder: "placeholder-ui",
                    handle: ".item-level-1"
                });

                element.find( ".li-level-1" ).sortable({
                    items: "ol:not(.ui-sort-disabled)",
                    placeholder: "placeholder-ui",
                    handle: ".item-level-2"
                });

                element.find(".item-level-0.dd3-content").click(function (event) {
                    event.preventDefault();

                    if($(this).hasClass('bg-primary')) {
                        $(this).siblings(".data-items").hide();
                        $(this).removeClass('bg-primary');
                    }
                    else {
                        $(this).siblings(".data-items").show();
                        $(this).addClass('bg-primary');
                    }
                });

                element.find(".item-level-1.dd3-content").click(function (event) {
                    event.preventDefault();

                    if($(this).hasClass('selected')) {
                        $(this).siblings(".data-items").hide();
                        $(this).removeClass('selected');
                    }
                    else {
                        $(this).siblings(".data-items").show();
                        $(this).addClass('selected');
                    }
                });


                element.find(".item-level-1 .baloo-actions-text").click(function (event) {
                    event.preventDefault();
                    console.log("Baloo Action clicked");

                    var parent = $(this).parent();
                    parent.siblings(".data-items").width("60%");
                    parent.siblings(".baloo-action-content").show();

                    event.stopPropagation();
                });

                element.find(".li-level-1 .baloo-action-close").click(function (event) {
                    event.preventDefault();

                    var content = $(this).parent().parent();
                    content.siblings(".data-items").width("100%");
                    content.hide();

                    event.stopPropagation();
                });


                element.find(".item-level-0 .panel-close").click(function (event) {
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
                    event.stopPropagation();
                });

                element.find(".item-level-1 .panel-close").click(function (event) {
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
                    event.stopPropagation();
                });

                element.find(".item-level-1 .panel-copy").click(function (event) {
                    event.preventDefault();
                    //todo

                    event.stopPropagation();

                });
                element.find(".item-level-1 .panel-move").click(function (event) {
                    event.preventDefault();
                    //todo
                    event.stopPropagation();
                });

            });
        }
    }
}]);


