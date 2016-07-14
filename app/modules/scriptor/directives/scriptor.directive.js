/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('scriptor', ['$timeout', '$compile', function($timeout, $compile) {

        return {
            restrict: 'E',
            templateUrl: 'modules/scriptor/directives/scriptor.tpl.html',
            scope: {
                'items': '=',
                'triggers': '='
            },
            link: function (scope, element, attributes) {

                // timeout is added so thar both child directive dom is ready
                // due to bug: https://github.com/angular/angular.js/issues/8877
                $timeout(function(){
                    element.find( ".dd-handle" ).draggable({
                        helper: "clone",
                        revert: "invalid",
                        cursor: "move",
                        stop: function( event, ui ) {
                           element.find(".drop-action-handle:visible").removeClass("highlight-drop");

                        },
                        start: function( event, ui ) {
                            element.find(".drop-action-handle:visible").addClass("highlight-drop");
                        }
                    });

                    $( ".dd3-content.drop-action-handle" ).droppable({
                        accept: ".dd-handle",
                        drop: function( event, ui ) {


                            var action =  {
                                "values": [
                                    {
                                        "actVal": "Customize_Quick_Access_Toolbar",
                                        "actKey": "elementName"
                                    },
                                    {
                                        "actVal": "ALT,F,T",
                                        "actKey": "keyName"
                                    }
                                ],
                                "name": "clickAndWait()",
                                "syntax": "clickAndWait(String elementName)"
                            };
                            //console.log($(this));
                            scope.action = action;

                            var el = $compile( "<ol class='dd-list'><li class='dd-item'><div class='item-level-2 dd3-content' trigger-item action='action' close='false' index='8'></div></li></ol>" )( scope );
                            $(this).closest('.dd-list.ui-sort-disabled').before( el );
                            //if any other trigger is opened, close it
                            var level2items = element.find('.item-level-2 .panel-toggle.closed');
                            level2items.toggleClass("closed").parents(".panel:first").find(".panel-content").slideToggle();
                        }
                    });


                },1000);
            }
        }
    }]);
