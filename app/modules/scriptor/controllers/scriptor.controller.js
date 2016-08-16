'use strict';

angular.module('automationApp.scriptor')
	.controller('NewScriptController', ['$rootScope', '$scope', 'pluginsService', 'applicationService', '$location', '$state', 'scriptorService',
		function($rootScope, $scope, pluginsService, applicationService, $location, $state, scriptorService) {

            $scope.taskId = "";
			$scope.loadTaskId = "";

			if($rootScope.globalConstants === undefined) {
				scriptorService.getGlobalContext().then(function (res) {
					$rootScope.globalConstants = res.data;

					$scope.scenarioType = $rootScope.globalConstants.scenarios[0];
					$scope.applicationName = $rootScope.globalConstants.applications[0].key;

					$scope.templateOptions = $rootScope.globalConstants.templateOptions;
					$scope.template = $scope.templateOptions[0].key;
				});
			}
			else {
				$scope.scenarioType = $rootScope.globalConstants.scenarios[0];
				$scope.applicationName = $rootScope.globalConstants.applications[0].key;

				$scope.templateOptions = $rootScope.globalConstants.templateOptions;
				$scope.template = $scope.templateOptions[0].key;
			}

			/* Template Code to be kept in first route to be loaded */
			$scope.$on('$viewContentLoaded', function () {
				pluginsService.init();
				applicationService.customScroll();
				applicationService.handlePanelAction();
				$('.nav.nav-sidebar .nav-active').removeClass('nav-active active');
				$('.nav.nav-sidebar .active:not(.nav-parent)').closest('.nav-parent').addClass('nav-active active');

				if($location.$$path == '/'){
					$('.nav.nav-sidebar .nav-parent').removeClass('nav-active active');
					$('.nav.nav-sidebar .nav-parent .children').removeClass('nav-active active');
					if ($('body').hasClass('sidebar-collapsed') && !$('body').hasClass('sidebar-hover')) return;
					if ($('body').hasClass('submenu-hover')) return;
					$('.nav.nav-sidebar .nav-parent .children').slideUp(200);
					$('.nav-sidebar .arrow').removeClass('active');
					$('body').addClass('dashboard');
				} else {
					$('body').removeClass('dashboard');
				}

			});

			function validateTaskId(input){
				var regex = /[^a-z0-9.]/i; // not a valid task id string - contains other characters from a-z0-9.

				if (regex.test(input)) {
					return false;
				} else {
					return true;
				}
			}

			function showNotify(customText){
                noty({
                    text        : customText,
                    layout      : 'topRight',
                    theme       : 'made',
                    maxVisible  : 1,
                    animation   : {
                        open  : 'animated fadeInRight',
                        close : 'animated fadeOut'
                    },
                    timeout: 3000
                });
			}

			$scope.displayScript = function(){

                if ($scope.taskId == undefined || $scope.taskId.length === 0) {
                    showNotify('<div class="alert alert-danger m-r-30"><p><strong>' + 'Task Id cannot be blank !' + '</p></div>');

                }
                else if (validateTaskId($scope.taskId)){

                    scriptorService.saveTaskScript($scope.applicationName, $scope.scenarioType, $scope.taskId, $scope.template).then(function(res) {

                        if(res.data.errors) {
                            if(res.data.errors.errorCode === 'EXISTS_IN_DB'){
                                bootbox.confirm({
                                    title: 'Task already exists',
                                    message: 'Do you want to override task with new selections ?',
                                    className: 'error-modal',
                                    callback: function(result) {
                                        if(result) {
                                            scriptorService.updateTaskScript($scope.applicationName, $scope.scenarioType, $scope.taskId, $scope.template).then(function(res) {
                                                scriptorService.taskContent = res.data.task_json;
                                                $state.go('script-editor',  {id: res.data.sle_id});
                                                showNotify('<div class="alert alert-success m-r-30"><p><strong>' + 'Task data updated successfully !' + '</p></div>');
                                            });
                                        }
                                    }
                                });
                            } else {
                                showNotify('<div class="alert alert-danger m-r-30"><p><strong>' + res.data.errors.errorMessage.message + '</p></div>');
                            }
                        } else{
                            scriptorService.taskContent = res.data.task_json;
                            $state.go('script-editor',  {id: res.data.sle_id});
                            showNotify('<div class="alert alert-success m-r-30"><p><strong>' + 'Task data updated successfully !' + '</p></div>');
                        }
                    });

                } else{
                    showNotify('<div class="alert alert-danger m-r-30"><p><strong>' + 'Invalid Task Id !' + '</p></div>');

                }

			};

			$scope.loadScript = function(){

				if ($scope.loadTaskId == undefined || $scope.loadTaskId.length === 0) {
					showNotify('<div class="alert alert-danger m-r-30"><p><strong>' + 'Task Id cannot be blank !' + '</p></div>');
				}
				else if (validateTaskId($scope.loadTaskId)){	// client side validation
					// api call
					scriptorService.getTaskJson($scope.loadTaskId).then(function(res) {
						if (res.data[0].errors) {
							showNotify('<div class="alert alert-danger m-r-30"><p><strong>Error in getting Task Data</p></div>');
						} else{
							scriptorService.taskContent = res.data[0].json;
							$state.go('script-editor',  {id: res.data[0].taskid});
							showNotify('<div class="alert alert-success m-r-30"><p><strong>' + 'Task data loaded successfully !' + '</p></div>');
						}
					});
					//
				} else{
					showNotify('<div class="alert alert-danger m-r-30"><p><strong>' + 'Invalid Task Id !' + '</p></div>');
				}
			};

		}]);
