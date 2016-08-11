/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('scriptor', ['$timeout', 'scriptorService', function($timeout, scriptorService) {

        return {
            restrict: 'E',
            templateUrl: 'modules/scriptor/directives/views/scriptor.tpl.html',
            scope: {
                'items': '=',
                'triggers': '=',
                'methodtypelist': '=',
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
                        var item_id = $(this).closest('.li-level-0').data('id');
                        var method = $(this).closest('.li-level-1');
                        var method_id = method.data('id');
                        var newDataID = method.find('.dd-list').length-1;

                        scope.items[0].items[item_id].methods[method_id].actions.splice(newDataID, 0, action);

                        // If any other trigger is opened, close it
                        var level2items = element.find('.item-level-2 .panel-toggle.closed');
                        level2items.toggleClass("closed").parents(".panel:first").find(".panel-content").slideToggle();

                        if(!scope.$$phase) {
                            scope.$apply();
                        }
                    }
                };

                $timeout(function(){
                    element.find( ".dd-handle" ).draggable({
                        helper: "clone",
                        revert: "invalid",
                        cursor: "move",
                        stop: function( event, ui ) {
                           element.find(".drop-action-handle:visible").removeClass("highlight-drop");
                        },
                        start: function( event, ui ) {
                            ui.helper.addClass("ui-draggable-handle");
                            element.find(".drop-action-handle:visible").addClass("highlight-drop");
                        }
                    });

                    $( ".dd3-content.drop-action-handle" ).droppable(dropHandler);

                },1500);

                scope.$on('SCRIPTOR_NEW_ITEM_ADDED', function(event) {
                    $( ".dd3-content.drop-action-handle" ).droppable(dropHandler);
                });

            }
        }
    }]);
