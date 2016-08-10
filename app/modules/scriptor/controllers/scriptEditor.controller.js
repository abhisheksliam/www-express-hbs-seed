'use strict';

angular.module('automationApp.scriptor')
	.controller('ScriptEditorController', ['$stateParams', '$rootScope', '$scope', 'scriptorService', '$timeout',
		function($stateParams, $rootScope, $scope, scriptorService, $timeout) {
            var initializing = true;

            $scope.scriptor = scriptorService.uiElements;

            scriptorService.getTriggers().then(function(res) {
                $rootScope.triggers = res.data;
            });

            scriptorService.getTriggerSuggestions().then(function(res) {
                $rootScope.TriggerSuggestions = res.data;
            });

            scriptorService.getTaskJson($stateParams.id).then(function(res) {
                $scope.sleId = $stateParams.id;
                $scope.taskJson =  res.data[0].json;
            });

            $scope.$watch('taskJson', function() {
                if (initializing) {
                    $timeout(function() { initializing = false; });
                } else {
                    scriptorService.updateTaskJson($scope.sleId, $scope.taskJson).then(function(res) {
                        $scope.originalTaskJson =  res.data.json;
                    });
                }
            }, true);

		}]);
