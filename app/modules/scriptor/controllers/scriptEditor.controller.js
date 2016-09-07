'use strict';

angular.module('automationApp.scriptor')
	.controller('ScriptEditorController', ['$stateParams', '$rootScope', '$scope', 'scriptorService', '$timeout',
		function($stateParams, $rootScope, $scope, scriptorService, $timeout) {
            var taskData;
            $scope.sleId = $stateParams.id;

            if($rootScope.globalConstants === undefined) {
                scriptorService.getTaskJson($stateParams.id).then(function(res) {
                    taskData = res.data[0].task_json;
                    $scope.taskJson =  taskData;
                    $scope.originalTaskJson = angular.copy(taskData);

                    scriptorService.taskContent = taskData;
                    $rootScope.taskId = $scope.taskId = taskData[0].id;
                    $scope.scenarioType = taskData[0].scenario;
                    $rootScope.applicationName = $scope.applicationName = taskData[0].appName;

                    scriptorService.getXpathArrayList($rootScope.applicationName).then(function(res) {
                        $rootScope.xpathArrayList = res;
                        $rootScope.getXPathForElement = scriptorService.getXPathForElement;
                    });
                });

                scriptorService.getGlobalContext().then(function(res) {
                    $rootScope.globalConstants = res.data;
                });
            } else {
                taskData = scriptorService.taskContent;
                $scope.taskJson = taskData;
                $scope.originalTaskJson = angular.copy(taskData);

                $rootScope.taskId = $scope.taskId = taskData[0].id;
                $scope.scenarioType = taskData[0].scenario;
                $rootScope.applicationName = $scope.applicationName = taskData[0].appName;

                scriptorService.getXpathArrayList($rootScope.applicationName).then(function(res) {
                    $rootScope.xpathArrayList = res;
                    $rootScope.getXPathForElement = scriptorService.getXPathForElement;
                });
            }

            scriptorService.getTriggers().then(function(res) {
                $rootScope.triggers = res.data;
            });

            scriptorService.getTriggerSuggestions().then(function(res) {
                $rootScope.TriggerSuggestions = res.data;
            });

            $scope.$watch('taskJson',function(newValue, oldValue) {
                if(newValue != oldValue) {
                    if(!angular.equals($scope.taskJson,$scope.originalTaskJson)) {
                        scriptorService.updateTaskJson($scope.sleId, $scope.taskJson, username).then(function(res) {
                            $scope.originalTaskJson =  res.data.task_json;
                        });
                    }
                }
            },true);

            $scope.editableiteminput = {
                editorenabled : -1,

                enableEditor : function(index) {
                    $scope.editableiteminput.editorenabled = index;
                },

                disableEditor : function(index,event) {
                    $scope.editableiteminput.editorenabled = index;
                    event.stopPropagation();
                },

                save : function() {
                this.disableEditor();
                },

                stopEvent : function(event) {
                    event.stopPropagation();
                }
            };

		}]);