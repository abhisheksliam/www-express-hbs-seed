/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('itemPanel', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            templateUrl: 'modules/scriptor/directives/views/itemPanel.tpl.html',
            scope: {
                'items': '=',
                'methodtypelist': '=',
                'index': '=',
                'editableiteminput': '='
                },
            link: function (scope, element) {

                $timeout(function(){

                    element.on('click',"#add-item-link a",function(event) {

                        var newItemTemplate = {
                            "init": true,
                            "methods": [
                                {
                                    "init": true,
                                    "type": "Ribbon",
                                    "balooActions": [
                                        {
                                            "text": ""
                                        }
                                    ],
                                    "actions": [

                                    ],
                                    "group": "NOT_FOUND"
                                }

                            ],
                            "skip": false,
                            "text": ""
                        };
                        scope.items[0].items.push(newItemTemplate);

                        if(!scope.$$phase) {
                            scope.$apply();
                        }

                        scope.$emit('SCRIPTOR_NEW_ITEM_ADDED', "");
                    });

                    element.on('click',".add-method-link a",function(event) {
                        event.preventDefault();

                        var newMethodTemplate = {
                            "init": true,
                            "type": "Ribbon",
                            "balooActions": [
                                {
                                    "text": ""
                                }
                            ],
                            "actions": [

                            ],
                            "group": "NOT_FOUND"
                        };


                        var itemNumber = $(this).closest('.li-level-0').data('id');
                        scope.items[0].items[itemNumber].methods.push(newMethodTemplate);

                        if(!scope.$$phase) {
                            scope.$apply();
                        }

                        scope.$emit('SCRIPTOR_NEW_ITEM_ADDED', "");
                        event.stopPropagation();
                    });

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

                        closeLevel1Elements();
                        closeLevel2Elements();
                        event.stopPropagation();
                    });

                    var  closeLevel1Elements = function () {
                        //close all child elements if these are opened
                        var level1items = element.find('.selected');
                        level1items.siblings(".data-items").hide();
                        level1items.removeClass('selected');
                    };

                    var  closeLevel2Elements = function () {
                        var level2items = element.find('.item-level-2 .panel-toggle.closed');
                        level2items.toggleClass("closed").parents(".panel:first").find(".panel-content").slideToggle();
                        var content = element.find(".baloo-action-content:visible");
                        if(content.length !=0) {
                            content.siblings(".data-items").width("100%");
                            content.hide();
                        }
                    };

                    element.on('click',".item-level-0 .panel-close",function (event) {
                        event.preventDefault();
                        var itemNumber = $(this).closest('.li-level-0').data('id');
                        var $item = $(this).parents(".dd-item:first");

                        bootbox.confirm("Are you sure to delete this item?", function (result) {
                            if (result === true) {
                                $item.addClass("animated bounceOutRight");
                                window.setTimeout(function () {
                                    scope.items[0].items.splice(itemNumber, 1);
                                    scope.$apply();
                                }, 300);
                            }
                        });
                        event.stopPropagation();
                    });

                    element.on('click',".item-level-1.dd3-content",function (event) {
                        event.preventDefault();

                        if($(this).hasClass('selected')) {
                            $(this).siblings(".data-items").hide();
                            $(this).removeClass('selected');
                        }
                        else {
                            var activeElement = element.find('.selected');
                            if(activeElement.length != 0) {
                                activeElement.siblings(".data-items").hide();
                                activeElement.removeClass('selected');
                            }
                            $(this).siblings(".data-items").show();
                            $(this).addClass('selected');
                        }
                        closeLevel2Elements();
                    });

                });

                //to fix this, implement template cache, then there is no need of timeout
                $timeout(function(){
                    element.sortable({
                        items: "ol:not(.ui-sort-disabled)",
                        placeholder: "placeholder-ui",
                        handle: ".item-level-0"
                    });

                    element.find( ".li-level-0 .data-items" ).sortable({
                        items: "ol:not(.ui-sort-disabled)",
                        placeholder: "placeholder-ui",
                        handle: ".item-level-1"
                    });

                    element.find( ".li-level-1 .data-items" ).sortable({
                        items: "ol:not(.ui-sort-disabled)",
                        placeholder: "placeholder-ui",
                        handle: ".item-level-2",
                        helper : 'clone'
                    });
                },2000);
            }
        }
    }]);


