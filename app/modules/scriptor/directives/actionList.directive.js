/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('actionList', ['$timeout', '$rootScope', function($timeout, $rootScope) {
        return {
            restrict: 'A',
            templateUrl: 'modules/scriptor/directives/views/actionList.tpl.html',
            scope: {
                'triggers': '='
            },
            link: function(scope, element, attributes){
                scope.searchActionText = "";

                scope.$watch('triggers', function(newValue) {
                    if (newValue !== undefined) {
                        if (!$rootScope.initializeDrag) {
                            $rootScope.initializeDrag = true;
                        }
                    }
                });

                scope.removeTagOnBackspace = function (event) {
                    $timeout(function(){
                        $('#triggerlist .nestable').mCustomScrollbar("update");
                    });
                };

                scope.$on('ACTION_SEARCH_RESET', function(event) {
                    scope.searchActionText = "";
                    $timeout(function(){
                        $('#triggerlist .nestable').mCustomScrollbar("update");
                    });
                });
            }
        }
    }]);

