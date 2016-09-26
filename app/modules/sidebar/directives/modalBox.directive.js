/**
 * Created by piyush on 9/21/2016.
 */

"use strict";

angular.module('automationApp.sidebar')
    .directive('modalBox', ['scriptorService','$location','$rootScope', '$window',function(scriptorService,$location,$rootScope, $window) {
        return {
            restrict: 'AE',
            replace: true,
            scope:{
            },
            templateUrl: 'modules/sidebar/views/modalBox.tpl.html',
            link: function(scope) {
                scope.headerText = '';
                scope.confirmText = 'Continue';

                var route, queryParam;

                $('#modal-modalbox').on('show.bs.modal', function (event) {
                    var thisModal = $(this);
                    var listItem = $(event.relatedTarget) // Button that triggered the modal

                    if(listItem.data('context') == 'export') {
                        scope.headerText = 'Export Script';
                        scope.confirmText = 'Export';
                        route = '/api/tasks/';
                        queryParam = '?format=json';
                    }
                    else if(listItem.data('context') == 'preview') {
                        scope.headerText = 'Preview XML';
                        scope.confirmText = 'Preview';
                        route = '/api/tasks/';
                        queryParam = '?format=xml';
                    }



                    scope.clickAction = function(){

                        if (scope.taskId == undefined || scope.taskId.length === 0) {
                            $rootScope.showNotify('<div class="alert alert-danger"><p><strong>' + 'SLE Id cannot be blank !' + '</p></div>','.modal-body');
                        }
                        else if ($rootScope.validateTaskId(scope.taskId)){	// client side validation
                            // api call
                            scriptorService.getTaskJson(scope.taskId).then(function(res) {
                                if(res.data.errors) {
                                    $rootScope.showNotify('<div class="alert alert-danger"><p><strong>Error in getting data for SLE - ' + scope.taskId + '</p>'+'</div>','.modal-body');
                                    scope.taskId = '';
                                } else{
                                    $('#modal-modalbox').modal('hide');  // hide modal
                                    $window.open($location.protocol() + "://" + $location.host() + ':' + $location.port() + route + scope.taskId + queryParam);
                                    scope.taskId = '';
                                }
                            });
                        } else{
                            $rootScope.showNotify('<div class="alert alert-danger"><p><strong>' + 'Invalid Task Id !' + '</p></div>','.modal-body');
                        }
                    }

                    scope.$apply();
                })
            }
        };
    }]);

