'use strict';

angular.module('automationApp.scriptor')
	.controller('ScriptEditorController', ['$stateParams', '$rootScope', '$scope', 'scriptorService', '$state', '$filter',
		function($stateParams, $rootScope, $scope, scriptorService, $state, $filter) {

            $rootScope.taskId = $scope.taskId = $filter('uppercase')($stateParams.id);

            if ($.isEmptyObject(scriptorService.taskContent) || $rootScope.globalConstants === undefined) {

                scriptorService.getGlobalContext().then(function(res) {
                    $rootScope.globalConstants = res.data;
                });

                loadTaskJSON();

            } else {
                if (scriptorService.taskContent[0] !== undefined && scriptorService.taskContent[0].id !== $scope.taskId) {
                    loadTaskJSON();

                } else {
                    setDataFromTaskJSON(scriptorService.taskContent);

                }
            }

            function loadTaskJSON() {

                scriptorService.getTaskJson($scope.taskId).then(function(res) {
                    if(res.data.errors) {
                        $scope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>' + res.data.errors.errorMessage + '</p></div>');
                    } else {
                        setDataFromTaskJSON(res.data.task_json);
                    }
                });
            }

            function setDataFromTaskJSON(taskData) {
                $scope.taskJson = taskData;
                $scope.originalTaskJson = angular.copy(taskData);

                $scope.sleId = taskData[0].id;
                $scope.scenarioType = taskData[0].scenario;
                $rootScope.applicationName = $scope.applicationName = taskData[0].appName;

                scriptorService.getTriggers().then(function(res) {
                    var commonActions = res.data["common"];
                    var appSpecificActions = res.data[$rootScope.applicationName];

                    $rootScope.triggers = commonActions.concat(appSpecificActions);
                });

                scriptorService.getXpathArrayList($rootScope.applicationName).then(function(res) {
                    $rootScope.xpathArrayList = res;
                    $rootScope.getXPathForElement = scriptorService.getXPathForElement;
                });

                scriptorService.getTriggerSuggestions().then(function(res) {
                    $rootScope.TriggerSuggestions = res.data;
                });
            }

            $scope.$watch('taskJson',function(newValue, oldValue) {
                if(newValue != oldValue) {
                    if(!angular.equals($scope.taskJson,$scope.originalTaskJson)) {
                        scriptorService.updateTaskJson($scope.taskId, $scope.taskJson, username).then(function(res) {
                            $scope.originalTaskJson =  res.data.task_json;
                        });
                    }
                }
            },true);

            $scope.$on('SCRIPTOR_LOAD_TASK', function(event, res) {
                scriptorService.taskContent = res.data.task_json;
                $state.go('app.script-editor',  {id: res.data.task_id});
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
