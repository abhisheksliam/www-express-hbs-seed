/**
 * Created by piyush on 9/21/2016.
 */

"use strict";

angular.module('automationApp.sidebar')
    .directive('modalBox', ['scriptorService','$location','$rootScope', '$window', function(scriptorService,$location,$rootScope, $window) {
        return {
            restrict: 'AE',
            replace: true,
            scope:{
            },
            templateUrl: 'modules/sidebar/views/modalBox.tpl.html',
            link: function(scope) {
                scope.headerText = '';
                scope.confirmText = 'Continue';
                scope.taskId = '';

                scope.load = false;
                scope.loadTaskOption = "1";
                scope.iCheckOptions = {
                    radioClass: 'iradio_flat-blue'
                };

                var route, queryParam;

                $('#modal-modalbox').on('show.bs.modal', function (event) {
                    var thisModal = $(this);
                    var listItem = $(event.relatedTarget) // Button that triggered the modal

                    if(listItem.data('context') == 'export') {
                        scope.headerText = 'Export Script';
                        scope.confirmText = 'Export';
                        route = '/api/tasks/';
                        queryParam = '?format=json';
                        scope.load = false;
                    } else if(listItem.data('context') == 'preview') {
                        scope.headerText = 'Preview XML';
                        scope.confirmText = 'Preview';
                        route = '/api/tasks/';
                        queryParam = '?format=xml';
                        scope.load = false;
                    } else if(listItem.data('context') == 'load') {
                        scope.headerText = 'Load Existing Script';
                        scope.confirmText = 'Load';
                        scope.load = true;
                    }

                    scope.$watch('taskId', function() {
                        scope.taskId = scope.taskId.toUpperCase().replace(/\s+/g,'');
                    });

                    scope.clickAction = function(){
                        if (scope.load && $('input[name=load-task-options]:checked').val() === "2") {
                            var ingestJSON;
                            var file = document.getElementById('files').files[0];
                            if (file) {
                                // create reader
                                var reader = new FileReader();
                                reader.readAsText(file);
                                reader.onload = function(e) {
                                    try {
                                        ingestJSON = JSON.parse(e.target.result);
                                    } catch (e) {
                                        $rootScope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>Invalid JSON</p></div>','.modal-body');
                                    }

                                    if(ingestJSON !== undefined && ingestJSON.length !== undefined) {

                                        var taskId = $filter('uppercase')(ingestJSON[0].id+ '.' + ingestJSON[0].scenario);

                                        scriptorService.saveTaskScript(ingestJSON[0].appName, ingestJSON[0].scenario, taskId, ingestJSON[0].id, '', 'ingest', ingestJSON, username).then(function(res) {
                                            if(res.data.errors) {
                                                if(res.data.errors.errorCode === 'EXISTS_IN_DB'){
                                                    $rootScope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>Task already exists</p></div>','.modal-body');
                                                } else {
                                                    $rootScope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>' + res.data.errors.errorMessage + '</p></div>','.modal-body');
                                                }
                                            } else{
                                                $('#modal-loadtask').modal('hide');
                                                $rootScope.$broadcast('SCRIPTOR_LOAD_TASK', res);
                                            }
                                        });
                                    } else {
                                        $rootScope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>Ingest JSON format not supported</p></div>','.modal-body');
                                    }
                                };
                            }
                        } else {
                            if (scope.taskId == '' || scope.taskId.length === 0) {
                                $rootScope.showNotify('<div class="alert alert-danger"><p><strong>' + 'Task Id cannot be blank !' + '</p></div>','.modal-body');
                            }
                            else if ($rootScope.validateTaskId(scope.taskId)){	// client side validation
                                // api call
                                scriptorService.getTaskJson(scope.taskId).then(function(res) {
                                    if(res.data.errors) {
                                        $rootScope.showNotify('<div class="alert alert-danger"><p><strong>Error in getting data for Task - ' + scope.taskId + '</p>'+'</div>','.modal-body');
                                        scope.taskId = '';
                                    } else{
                                        $('#modal-modalbox').modal('hide');  // hide modal
                                        if (scope.load) {
                                            $rootScope.$broadcast('SCRIPTOR_LOAD_TASK', res);
                                        } else {
                                            $window.open($location.protocol() + "://" + $location.host() + ':' + $location.port() + route + scope.taskId + queryParam);
                                        }
                                        scope.taskId = '';
                                    }
                                });
                            } else{
                                $rootScope.showNotify('<div class="alert alert-danger"><p><strong>' + 'Invalid Task Id !' + '</p></div>','.modal-body');
                            }
                        }
                    }

                    scope.$apply();
                })
            }
        };
    }]);

