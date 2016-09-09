"use strict";

angular.module('automationApp.sidebar')
    .directive('loadModal', ['scriptorService','$rootScope', function(scriptorService, $rootScope) {
        return {
            restrict: 'E',
            replace: true,
            scope:{},
            templateUrl: 'modules/sidebar/loadModal.tpl.html',
            link: function (scope, element, attributes) {
                scope.loadTaskOption = "";
                scope.loadTaskId ="";

                scope.iCheckOptions = {
                    radioClass: 'iradio_flat-blue'
                };

                scope.loadScript = function(){
                    if ($('input[name=load-task-options]:checked').val() === "2") {
                        var ingestJSON;
                        var file = document.getElementById('files').files[0];
                        if (file) {
                            // create reader
                            var reader = new FileReader();
                            reader.readAsText(file);
                            reader.onload = function(e) {
                                ingestJSON = JSON.parse(e.target.result)[0];

                                scriptorService.saveTaskScript(ingestJSON.appName, ingestJSON.scenario, ingestJSON.id, '', 'ingest', ingestJSON, username).then(function(res) {
                                    if(res.data.errors) {
                                        if(res.data.errors.errorCode === 'EXISTS_IN_DB'){
                                            $rootScope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>Task already exists</p></div>','.modal-body');
                                        } else {
                                            $rootScope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>' + res.data.errors.errorMessage + '</p></div>','.modal-body');
                                        }
                                    } else{
                                        $('#modal-loadtask').modal('hide');
                                        $rootScope.$broadcast('SCRIPTOR_LOAD_TASK', res.data);
                                    }
                                });
                            };
                        }
                    } else {
                        if (scope.loadTaskId == undefined || scope.loadTaskId.length === 0) {
                            $rootScope.showNotify('<div class="alert alert-danger"><p><strong>' + 'Task Id cannot be blank !' + '</p></div>','.modal-body');
                        }
                        else if ($rootScope.validateTaskId(scope.loadTaskId)){	// client side validation
                            // api call
                            scriptorService.getTaskJson(scope.loadTaskId).then(function(res) {
                                if (res.data.length == 0) {
                                    $rootScope.showNotify('<div class="alert alert-danger"><p><strong>Error in getting Task Data</p></div>','.modal-body');
                                } else{
                                    $('#modal-loadtask').modal('hide');
                                    $rootScope.$broadcast('SCRIPTOR_LOAD_TASK', res.data[0]);
                                }
                            });
                        } else{
                            $rootScope.showNotify('<div class="alert alert-danger"><p><strong>' + 'Invalid Task Id !' + '</p></div>','.modal-body');
                        }
                    }
                };
            }
        }
}]);

