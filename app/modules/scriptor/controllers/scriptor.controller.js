'use strict';

angular.module('automationApp.scriptor')
	.controller('NewScriptController', ['$rootScope', '$scope', 'pluginsService', 'applicationService', '$location', '$state', 'scriptorService',
		function($rootScope, $scope, pluginsService, applicationService, $location, $state, scriptorService) {



			/* Template Code to be kept in first route to be loaded */
			$scope.$on('$viewContentLoaded', function () {
				pluginsService.init();
                applicationService.createSideScroll();
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

            $scope.taskId = "";

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

			$scope.displayScript = function(){

                if ($scope.taskId == undefined || $scope.taskId.length === 0) {
					$scope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>' + 'Task Id cannot be blank !' + '</p></div>');

                }
                else if ($scope.validateTaskId($scope.taskId)){

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
                                                $scope.runnerTaskJSON = scriptorService.taskContent;
                                                $state.go('app.script-editor',  {id: res.data.sle_id});
												$scope.showNotify('<div class="alert alert-success m-r-30"><p><strong>' + 'Task data updated successfully !' + '</p></div>');
                                            });
                                        }
                                    }
                                });
                            } else {
								$scope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>' + res.data.errors.errorMessage.message + '</p></div>');
                            }
                        } else{
                            scriptorService.taskContent = res.data.task_json;
                            $scope.runnerTaskJSON = scriptorService.taskContent;
                            $state.go('app.script-editor',  {id: res.data.sle_id});
							$scope.showNotify('<div class="alert alert-success m-r-30"><p><strong>' + 'Task data updated successfully !' + '</p></div>');
                        }
                    });

                } else{
					$scope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>' + 'Invalid Task Id !' + '</p></div>');
                }

			};

		}]);
