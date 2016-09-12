"use strict";

angular.module('automationApp.sidebar')
    .directive('exportModal', ['scriptorService','$location','$rootScope', '$window',function(scriptorService, $location,$rootScope, $window  ) {
        return {
            restrict: 'E',
            replace: true,
            scope:{},
            templateUrl: 'modules/sidebar/exportModal.tpl.html',
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
                                if (res.data.length == 0) {
                                    $rootScope.showNotify('<div class="alert alert-danger"><p><strong>Error in getting Task Data</p></div>','.modal-body');
                                } else{
                                    $('#modal-exportModal').modal('hide');
                                    $rootScope.showNotify('<div class="alert alert-success m-r-30"><p><strong>' + 'Task Id Search SUCCESS !! Now Exporting....!' + '</p></div>');
                                    if($location.host() == 'localhost' || $location.host() == 'piyush') {
                                        $window.open($location.protocol() + "://" + $location.host() + ':8080' + '/api/tasks/' + res.data[0].sle_id);
                                    }
                                    else {
                                        $window.open($location.protocol() + "://" + $location.host() + '/api/tasks/' + res.data[0].sle_id);
                                    }
                                }
                            });
                        } else{
                            $rootScope.showNotify('<div class="alert alert-danger"><p><strong>' + 'Invalid Task Id !' + '</p></div>','.modal-body');
                        }
                };
            }
        }
}]);

