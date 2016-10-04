/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('scriptor', ['$compile', '$timeout', 'scriptorService', function($compile, $timeout, scriptorService) {

        return {
            restrict: 'E',
            templateUrl: 'modules/scriptor/directives/views/scriptor.tpl.html',
            scope: {
                'items': '=',
                'triggers': '=',
                'editableiteminput': '='
            },
            link: function (scope, element, attributes) {

                // timeout is added so thar both child directive dom is ready
                // due to bug: https://github.com/angular/angular.js/issues/8877
                var index=0;
                scope.action = [];

                var dropHandler = {
                    accept: ".dd-handle",
                    drop: function( event, ui ) {
                        var id =  ui.draggable.data("id");
                        var action = scriptorService.getTriggerForID(id) ;
                        var item_id = $(this).closest('.li-level-0').parent().index();
                        var method = $(this).closest('.li-level-1');
                        var method_id = method.parent().index();
                        scope.method =  scope.items[0].items[item_id].methods[method_id];
                        var newDataID = method.find('.dd-list').length;

                        scope.action[index] = action;

                        var templateString = "<ol class='dd-list ui-sort-disabled'><li class='dd-item'><div class='item-level-2 dd3-content' trigger-item method='method' action='action["+ index +"]' index='"+ newDataID +"'></div></li></ol>";
                        index++;
                        var el = $compile( templateString )( scope );
                        $(this).closest('.dd-list.ui-sort-disabled').before( el );

                        if(!scope.$$phase) {
                            scope.$apply();
                        }

                        $(this).closest('.dd-list.ui-sort-disabled').prev().find('.item-level-2 .panel-edit').trigger('click', [ "true" ]);
                    }
                };

                var dragHandler = {
                    helper: "clone",
                    appendTo: '#triggerlist',
                    containment: 'document',
                    revert: "invalid",
                    cursor: "move",
                    scroll: false,
                    stop: function( event, ui ) {
                       element.find(".drop-action-handle:visible").removeClass("highlight-drop");
                    },
                    start: function( event, ui ) {
                        ui.helper.addClass("ui-draggable-handle");
                        element.find(".drop-action-handle:visible").addClass("highlight-drop");
                    }
                };

                scope.$on('SCRIPTOR_NEW_ITEM_ADDED', function(event) {
                    element.find( ".drop-action-handle" ).droppable(dropHandler);
                });

                scope.$on('INTIALIZE_DRAG_DROP', function(event) {
                    element.find( ".dd-handle" ).draggable(dragHandler);
                    element.find( ".drop-action-handle" ).droppable(dropHandler);
                });

                $(window).scroll(function () {
                    if ($(window).scrollTop() > 100) {
                        $('#triggerlist').addClass('trigger-fixed');
                    }
                    if ($(window).scrollTop() < 101) {
                        $('#triggerlist').removeClass('trigger-fixed');
                    }
                });

            }
        }
    }]);
