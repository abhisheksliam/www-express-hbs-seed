"use strict";

angular.module('automationApp.sidebar')
    .directive('exportModal', ['scriptorService','$location','$rootScope', '$window',function(scriptorService, $location,$rootScope, $window  ) {
        return {
            restrict: 'E',
            replace: true,
            scope:{},
            templateUrl: 'modules/sidebar/views/exportModal.tpl.html',
            link: function (scope, element, attributes) {
                scope.loadTaskOption = "";
                scope.loadTaskId ="";

                scope.iCheckOptions = {
                    radioClass: 'iradio_flat-blue'
                };

                scope.exportScript = function(){
                        if (scope.exportTaskId == undefined || scope.exportTaskId.length === 0) {
                            $rootScope.showNotify('<div class="alert alert-danger"><p><strong>' + 'Task Id cannot be blank !' + '</p></div>','.modal-body');
                        }
                        else if ($rootScope.validateTaskId(scope.exportTaskId)){	// client side validation
                            // api call
                            scriptorService.getTaskJson(scope.exportTaskId).then(function(res) {
                                if(res.data.errors) {
                                    $rootScope.showNotify('<div class="alert alert-danger"><p><strong>Error in getting Task Data</p></div>','.modal-body');
                                } else{
                                    $('#modal-exportModal').modal('hide');

                                    var queryParam = '?mode=export';

                                    $window.open($location.protocol() + "://" + $location.host() + ':' + $location.port() + '/api/tasks/' + res.data.sle_id + queryParam);
                                }
                            });
                        } else{
                            $rootScope.showNotify('<div class="alert alert-danger"><p><strong>' + 'Invalid Task Id !' + '</p></div>','.modal-body');
                        }
                };
            }
        }
}]);

