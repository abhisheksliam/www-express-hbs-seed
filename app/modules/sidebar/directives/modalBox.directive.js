/**
 * Created by piyush on 9/21/2016.
 */

"use strict";

angular.module('automationApp.sidebar')
    .directive('modalBox', ['scriptorService','$location','$rootScope', '$window', '$filter', function(scriptorService,$location,$rootScope, $window, $filter) {
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
                scope.mode = '';
                scope.load = false;
                scope.loadTaskOption = "1";
                scope.iCheckOptions = {
                    radioClass: 'iradio_flat-blue'
                };

                var jsonQueryParam, javaQueryParam, xmlQueryParam;

                $('#modal-modalbox').on('show.bs.modal', function (event) {

                    jsonQueryParam = '?format=json';
                    javaQueryParam = '?format=java';
                    xmlQueryParam = '?format=xml';

                    scope.hideErr = function() {
                        $('.err-msg1').hide();
                        $('.err-msg2').hide();
                    }

                    scope.hideErr();
                    scope.taskId='';
                    var thisModal = $(this);
                    var listItem = $(event.relatedTarget) // Button that triggered the modal

                    if(listItem.data('context') == 'export') {
                        scope.mode = 'export';
                        scope.headerText = 'Export Script';
                        scope.confirmText = 'Export';
                        scope.load = false;
                    }else if(listItem.data('context') == 'load') {
                        scope.headerText = 'Load Existing Script';
                        scope.confirmText = 'Load';
                        scope.load = true;
                        jsonQueryParam = undefined;
                    }

                    /* else if(listItem.data('context') == 'exportAll') {
                     scope.mode = 'exportAll';
                     scope.headerText = 'Export Task Files (JSON, XML, JAVA)';
                     scope.confirmText = 'Export';
                     scope.load = false;
                     } else if(listItem.data('context') == 'preview') {
                        scope.mode = 'preview';
                        scope.headerText = 'Preview XML';
                        scope.confirmText = 'Preview';
                        route = '/api/tasks/';
                        queryParam = '?format=xml';
                        scope.load = false;
                    } */

                    scope.clickAction = function(){

                        scope.taskId = scope.taskId.toUpperCase().replace(/\s+/g,'');

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
                                        scope.errmsg2 = "Invalid JSON !";
                                        $('.err-msg2').show();
                                    }

                                    if(ingestJSON !== undefined && ingestJSON.length !== undefined) {

                                        var taskId = $filter('uppercase')(ingestJSON[0].id+ '.' + ingestJSON[0].scenario);

                                        scriptorService.saveTaskScript(ingestJSON[0].appName, ingestJSON[0].scenario, taskId, ingestJSON[0].id, '', 'ingest', ingestJSON, $rootScope.authentication.user.username).then(function(res) {
                                            if(res.data.errors) {
                                                if(res.data.errors.errorCode === 'EXISTS_IN_DB'){
                                                    bootbox.confirm({
                                                        message: 'Task already exists - Do you want to override? ',
                                                        className: 'error-box',
                                                        callback: function(result) {
                                                            if(result) {
                                                                scriptorService.updateTaskScript(ingestJSON[0].appName, ingestJSON[0].scenario, taskId, ingestJSON[0].id, '', 'ingest', ingestJSON, $rootScope.authentication.user.username).then(function(res) {
                                                                    if(res.data.errors){
                                                                        $scope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>' + res.data.errors.errorMessage + '</p></div>');
                                                                    }
                                                                    else {
                                                                        $('#modal-modalbox').modal('hide');  // hide modal
                                                                        $rootScope.$broadcast('SCRIPTOR_LOAD_TASK', res);
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    scope.errmsg2 = "Ingest JSON format not supported !";
                                                    $('.err-msg2').show();
                                                }
                                            } else{
                                                $('#modal-modalbox').modal('hide');  // hide modal
                                                $rootScope.$broadcast('SCRIPTOR_LOAD_TASK', res);
                                            }
                                        });
                                    } else {
                                        scope.errmsg2 = "Ingest JSON format not supported !";
                                        $('.err-msg2').show();
                                    }
                                };
                            } else {
                                scope.errmsg2 = "No files selected";
                                $('.err-msg2').show();
                            }
                        } else {
                            if (scope.taskId == '' || scope.taskId.length === 0) {
                                event.stopPropagation();
                                scope.errmsg = "Task Id cannot be blank !";
                                $('.err-msg1').show();
                            }
                            else if ($rootScope.validateTaskId(scope.taskId)){	// client side validation
                                // api call
                                scriptorService.getTaskJson(scope.taskId, jsonQueryParam).then(function(res) {
                                    if(res.data.errors) {
                                        scope.errmsg = "Error in getting data for Task - " + scope.taskId;
                                        $('.err-msg1').show();

                                        scope.taskId = '';
                                    } else{
                                        $('#modal-modalbox').modal('hide');  // hide modal
                                        if (scope.load) {

                                            $rootScope.$emit('SCRIPTOR_LOAD_TASK', res);
                                        } else if(scope.mode == 'export'){

                                            download(JSON.stringify(res.data), scope.taskId + ".json", "text/plain");

                                            scriptorService.getTaskJson(scope.taskId, xmlQueryParam).then(function(res) {
                                                download(vkbeautify.xml(res.data), scope.taskId + ".xml", "text/plain");
                                            });

                                            scriptorService.getTaskJson(scope.taskId, javaQueryParam).then(function(res) {
                                                download(js_beautify(res.data), scope.taskId + ".java", "text/plain");
                                            });
                                        }

                                        /*
                                        // preview XML, open in New Window
                                         else {
                                            $window.open($location.protocol() + "://" + $location.host() + ':' + $location.port() + route + scope.taskId + queryParam);
                                        }*/
                                        //scope.taskId = '';
                                    }
                                });
                            } else{
                                scope.errmsg = "Invalid Task Id !";
                                $('.err-msg1').show();
                            }
                        }
                    }
                    scope.$apply();
                })
            }
        };
    }]);

