'use strict';

angular.module('automationApp.scriptor')
	.controller('ScriptEditorController', ['$stateParams', '$rootScope', '$scope', 'scriptorService', '$timeout',
		function($stateParams, $rootScope, $scope, scriptorService, $timeout) {
            var initializing = true;

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


            $scope.editableiteminput = {
                editorenabled : false,

                enableEditor : function() {
                    $scope.editableiteminput.editorenabled = true;
                },

                disableEditor : function() {
                    $scope.editableiteminput.editorenabled = false;
                },

                save : function() {
                this.disableEditor();
                }
            }

		}]);
