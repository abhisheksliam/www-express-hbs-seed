'use strict';

angular.module('automationApp.scriptor')
	.controller('ScriptEditorController', ['$stateParams', '$rootScope', '$scope', 'scriptorService', '$interval',
		function($stateParams, $rootScope, $scope, scriptorService, $interval) {

            $scope.scriptor = scriptorService.uiElements;
			$scope.triggers =	scriptorService.getTriggers();

            scriptorService.getGlobalContext().then(function(res) {
                $rootScope.keyboardActions = res.data.keyboardActions;
                $scope.applications =  res.data.applications;
                $scope.scenarios =  res.data.scenarios;
                $scope.methodtypelist =	res.data.methodtype;

                $scope.scenarioType = $scope.scenarios[0];
                $scope.applicationName = $scope.applications[0].label;

                if($scope.scriptor.taskId){
                    $scope.taskId = $scope.scriptor.taskId;
                    $scope.scenarioType = $scope.scriptor.scenarioType;
                    $scope.applicationName = $scope.scriptor.applicationName;
                }
            });

            scriptorService.getTaskJson($stateParams.id).then(function(res) {
                console.log("json : " ,res.data[0].json);
                $scope.taskJson =  res.data[0].json;
            });

		}]);
