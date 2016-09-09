"use strict";

angular.module('automationApp.sidebar')
    .directive('loadModal', ['scriptorService', function(scriptorService) {
        return {
            restrict: 'E',
            replace: true,
            scope:{},
            templateUrl: 'modules/sidebar/loadModal.tpl.html',
            link: function (scope, element, attributes) {
                scope.task;

                scope.loadScript = function(){
                    var ingestJSON;
                    var file = document.getElementById('files').files[0];
                    if (file) {
                        // create reader
                        var reader = new FileReader();
                        reader.readAsText(file);
                        reader.onload = function(e) {
                            ingestJSON = JSON.parse(e.target.result)[0];

                            // TO-DO: Event trigger ..... go to save
                            scriptorService.saveTaskScript(ingestJSON.appName, ingestJSON.scenario, ingestJSON.id, '', 'ingest', ingestJSON, username).then(function(res) {


                                scriptorService.taskContent = res.data.task_json;
                                $('#modal-loadtask').modal('hide');
                               // $state.go('app.script-editor',  {id: res.data.sle_id});
                              //  $scope.showNotify('<div class="alert alert-success m-r-30"><p><strong>' + 'Task data updated successfully !' + '</p></div>');

                            });
                        };
                    }


                    /* if ($scope.loadTaskId == undefined || $scope.loadTaskId.length === 0) {
                     $scope.showNotify('<div class="alert alert-danger"><p><strong>' + 'Task Id cannot be blank !' + '</p></div>','.modal-body');
                     }
                     else if ($scope.validateTaskId($scope.loadTaskId)){	// client side validation
                     // api call
                     scriptorService.getTaskJson($scope.loadTaskId).then(function(res) {
                     if (res.data.length == 0) {
                     $scope.showNotify('<div class="alert alert-danger"><p><strong>Error in getting Task Data</p></div>','.modal-body');
                     } else{
                     $('#modal-loadtask').modal('hide');
                     scriptorService.taskContent = res.data[0].task_json;
                     $state.go('app.script-editor',  {id: res.data[0].sle_id});
                     $scope.showNotify('<div class="alert alert-success m-r-30"><p><strong>' + 'Task data loaded successfully !' + '</p></div>');
                     }
                     });
                     //
                     } else{
                     $scope.showNotify('<div class="alert alert-danger"><p><strong>' + 'Invalid Task Id !' + '</p></div>','.modal-body');
                     }*/
                };

            }
        }
}]);

