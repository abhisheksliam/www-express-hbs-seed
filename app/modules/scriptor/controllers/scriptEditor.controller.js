'use strict';

angular.module('automationApp.scriptor')
	.controller('ScriptEditorController', ['$stateParams', '$rootScope', '$scope', 'scriptorService', '$timeout',
		function($stateParams, $rootScope, $scope, scriptorService, $timeout) {
            var initializing = true;

            // to-do: $rootScope.globalConstants appkey --> applabel pick set in applicationName
            if($rootScope.globalConstants === undefined) {
                scriptorService.getTaskJson($stateParams.id).then(function(res) {
                    $scope.sleId = $stateParams.id;
                    $scope.taskJson =  res.data[0].json;
                    $scope.taskId = $scope.taskJson[0].id;
                    $scope.scenarioType = $scope.taskJson[0].scenario;
                    $scope.applicationName = $scope.taskJson[0].appName;
                });

                scriptorService.getGlobalContext().then(function(res) {
                    $rootScope.globalConstants = res.data;
                });

            } else {
                $scope.taskJson = scriptorService.taskContent;
                $scope.taskId = $scope.taskJson[0].id;
                $scope.scenarioType = $scope.taskJson[0].scenario;
                $scope.applicationName = $scope.taskJson[0].appName;
            }

            scriptorService.getTriggers().then(function(res) {
                $rootScope.triggers = res.data;
            });

            scriptorService.getTriggerSuggestions().then(function(res) {
                $rootScope.TriggerSuggestions = res.data;
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
