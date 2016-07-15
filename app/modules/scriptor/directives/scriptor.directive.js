/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('scriptor', ['$timeout', '$compile', 'scriptorService', function($timeout, $compile, scriptorService) {

        return {
            restrict: 'E',
            templateUrl: 'modules/scriptor/directives/scriptor.tpl.html',
            scope: {
                'items': '=',
                'triggers': '=',
                'methodtypelist': '='
            },
            link: function (scope, element, attributes) {

                // timeout is added so thar both child directive dom is ready
                // due to bug: https://github.com/angular/angular.js/issues/8877
                var index=0;
                scope.action = [];

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

                    $( ".dd3-content.drop-action-handle" ).droppable({
                        accept: ".dd-handle",
                        drop: function( event, ui ) {


                            var id =  ui.draggable.data("id");
                            var action = scriptorService.getTriggerForID(id) ;
                            //console.log($(this));

                            /*
                            var item_id = $(this).closest('.li-level-0').data('id');
                            var method = $(this).closest('.li-level-1');
                            var method_id = method.data('id');
                            var newDataID = method.find('.dd-list').length-1;
                            */

                            scope.action[index] = action;

                            var templateString = "<ol class='dd-list'><li class='dd-item li-level-2'><div class='item-level-2 dd3-content' trigger-item action='action["+ index +"]' close='false' index='0'></div></li></ol>";
                            index++;
                            var el = $compile( templateString )( scope );
                            $(this).closest('.dd-list.ui-sort-disabled').before( el );
                            //if any other trigger is opened, close it
                            var level2items = element.find('.item-level-2 .panel-toggle.closed');
                            level2items.toggleClass("closed").parents(".panel:first").find(".panel-content").slideToggle();
                        }
                    });


                },1500);
            }
        }
    }]);
