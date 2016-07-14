/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('scriptor', ['$timeout', function($timeout) {

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
                        connectToSortable: ".li-level-1 .data-items",
                        helper: "clone",
                        revert: "invalid",
                        stop: function( event, ui ) {
                            console.log("event in parent drop.")
                        }
                    });
                },1000);
            }
        }
    }]);
