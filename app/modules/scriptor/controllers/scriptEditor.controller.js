'use strict';

angular.module('automationApp.scriptor')
	.controller('ScriptEditorController', ['$stateParams', '$rootScope', '$scope', 'scriptorService', '$timeout', '$state',
		function($stateParams, $rootScope, $scope, scriptorService, $timeout, $state) {
            var taskData;
            $scope.sleId = $stateParams.id;

            if($rootScope.globalConstants === undefined) {
                scriptorService.getTaskJson($stateParams.id).then(function(res) {
                    taskData = res.data.task_json;
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

                    scriptorService.getTriggers().then(function(res) {
                        $rootScope.triggers = res.data[$rootScope.applicationName];
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

                scriptorService.getTriggers().then(function(res) {
                    $rootScope.triggers = res.data[$rootScope.applicationName];
                });
            }

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

            $scope.$on('SCRIPTOR_LOAD_TASK', function(event, res) {
                scriptorService.taskContent = res.data.task_json;
                $state.go('app.script-editor',  {id: res.data.sle_id});
                $scope.showNotify('<div class="alert alert-success m-r-30"><p><strong>' + 'Task data loaded successfully !' + '</p></div>');
            });

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
