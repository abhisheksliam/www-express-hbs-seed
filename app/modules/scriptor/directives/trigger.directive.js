/**
 * Created by Shipra
 */
"use strict";

angular.module('automationApp.scriptor')
    .directive('triggerItem', ['$timeout', 'scriptorService' ,'$rootScope', function($timeout, scriptorService, $rootScope) {

        return {
            restrict: 'A',
            templateUrl: 'modules/scriptor/directives/views/trigger.tpl.html',
            scope: {
                'method' : '=',
                'action': '=',
                'index' : '='
            },
            link: function (scope, element, attributes) {

                // Toggle Panel Content
                scope.oldAction = angular.copy(scope.action);
                scope.editMode = false;
                scope.droppedTrigger = false;
                scope.emptyActionForm = false;

                if (scope.action.values.length === 0) {
                    scope.emptyActionForm = true;
                }

                element.on('click',".panel-header",function (event) {
                    event.preventDefault();

                    event.stopPropagation();
                });

                element.on('click',".panel-edit",function (event, bDropped) {
                    event.preventDefault();

                    scope.editMode = true;
                    if(bDropped !== undefined && bDropped === "true") {
                        scope.droppedTrigger = true;
                    }
                    $(this).closest('.item-level-2').addClass('edit-mode');
                    scope.$apply();

                    event.stopPropagation();
                });


                //Save button clicked
                element.on('click',".trigger-save",function (event) {
                    event.preventDefault();

                    if(scope.triggerForm.$valid) {
                        var triggerNumber = parseInt($(this).closest('.dd-list').index());

                        var triggerRefrence = $(this).closest('.dd-list');

                        var len = 0;
                        if($(this).closest('.panel-content').find('input.xpath.elementName')){
                            len = $(this).closest('.panel-content').find('input.xpath.elementName').length;
                        }

                        if(len !==0) {
                            var counter = 0;
                            $(this).closest('.panel-content').find('input.xpath.elementName').each (function () {
                                var $el = $(this);
                                var key = $(this).attr('data-elementname');
                                var value = $(this).val();
                                var taskid = $rootScope.taskId;
                                var app_type = $rootScope.applicationName;

                                if (key && taskid && app_type){
                                    saveXpathToDatabase(key, value, taskid, app_type,
                                        function(success){
                                            counter++;
                                            if(counter === len) {

                                                if(scope.droppedTrigger) {
                                                    $(triggerRefrence).remove();
                                                    scope.method.actions.splice(scope.index, 0, scope.oldAction);
                                                    scope.$apply();
                                                } else {
                                                    scope.method.actions[triggerNumber] = angular.copy(scope.oldAction);
                                                }
                                                scope.editMode = false;
                                                $(this).closest('.item-level-2').removeClass('edit-mode');

                                                $rootScope.showNotify('<div class="alert alert-success m-r-30"><p><strong>Update Successful !!</p></div>');
                                            }
                                            $timeout(function(){
                                            if(!scope.$$phase) {
                                                scope.$apply();
                                            };
                                            },200);

                                        },
                                        function(error){
                                            scriptorService.getXpathArrayList(app_type).then(function(res) {
                                                $rootScope.xpathArrayList = res;
                                                var xPath = scriptorService.getXPathForElement(key);
                                                $el.val(xPath);
                                            });
                                            $rootScope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>Element ' + key + ' : ' + error + '</p></div>');
                                        });
                                } else {
                                    $rootScope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>Error in getting xpath values.</p></div>');
                                }
                            });
                        } else {

                            if(scope.droppedTrigger) {
                                $(triggerRefrence).remove();
                                scope.method.actions.splice(scope.index, 0, scope.oldAction);
                            } else {
                                scope.method.actions[triggerNumber] = angular.copy(scope.oldAction);
                            }
                            scope.editMode = false;
                            scope.droppedTrigger = false;
                            $(this).closest('.item-level-2').removeClass('edit-mode');
                            scope.$apply();
                        }
                    } else {
                        $rootScope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>Please fill out mandatory fields.</p></div>');
                    }

                    event.stopPropagation();
                });

                //cancel button clicked
                element.on('click',".trigger-cancel",function (event) {
                    event.preventDefault();

                    scope.editMode = false;
                    scope.oldAction = angular.copy(scope.action);
                    $(this).closest('.item-level-2').removeClass('edit-mode');
                    scope.$apply();

                    $(this).closest('.panel-content').find('input.xpath').each (function () {
                        var $el = $(this);
                        var key = $(this).attr('data-elementname');
                        var xPath = scriptorService.getXPathForElement(key);
                        $el.val(xPath);

                    });

                    event.stopPropagation();
                });

                element.on('click',".panel-header .panel-close",function (event) {
                    event.preventDefault();

                    var $item = $(this).parents(".dd-item:first");

                    if(scope.droppedTrigger) {
                        var triggerReference = $(this).closest('.dd-list');
                        
                        bootbox.confirm("Are you sure to remove this trigger?", function (result) {
                            if (result === true) {
                                $item.addClass("animated bounceOutRight");
                                window.setTimeout(function () {
                                    $(triggerReference).remove();
                                    scope.$apply();
                                }, 300);
                            }
                        });
                        scope.$apply();
                    } else {
                        var triggerNumber = parseInt($(this).closest('.dd-list').index());

                        bootbox.confirm("Are you sure to remove this trigger?", function (result) {
                            if (result === true) {
                                $item.addClass("animated bounceOutRight");
                                window.setTimeout(function () {
                                    scope.method.actions.splice(triggerNumber, 1);
                                    scope.$apply();
                                }, 300);
                            }
                        });
                    }

                    event.stopPropagation();
                });

                element.on('click',".panel-move",function (event) {
                    event.preventDefault();
                    //todo
                    event.stopPropagation();
                });

                element.on('click',".copy-trigger",function (event) {
                    event.preventDefault();

                    var triggerNumber = parseInt($(this).closest('.dd-list').index());
                    var triggerToCopy = angular.copy(scope.method.actions[triggerNumber]);

                    scope.method.actions.splice(triggerNumber, 0, triggerToCopy);
                    scope.editMode = true;
                    $(this).closest('.item-level-2').addClass('edit-mode');
                    scope.$apply();

                    event.stopPropagation();
                });

                $timeout(function(){

                    angular.forEach(element.find( ".input__field.xpath" ), function(value, key){
                        var a = angular.element(value);
                        var currentEnementName = a.attr("data-elementName");
                        var xpath = scriptorService.getXPathForElement(currentEnementName);
                        a.val(xpath);
                    });

                    element.find( ".input__field.elementName" ).autocomplete({
                        source: $rootScope.xpathArrayList,
                        select: function( event, ui ) {
                            var _index = $(this).attr('data-index');
                            scope.oldAction.values[_index].actVal = ui.item.value;

                                var xPath = scriptorService.getXPathForElement(ui.item.value);
                                if(xPath) {
                                    $(this).closest('.trigger-input-parent').find('input.xpath').val(xPath);
                                } else {
                                    $(this).closest('.trigger-input-parent').find('input.xpath').val('');
                                }

                            scope.$apply();
                            return true;
                        }
                    });

                    var myKeysSuggestions = scriptorService.getKeyNameSuggestions();
                    element.find( ".input__field.keyName" ).autocomplete({
                        source: myKeysSuggestions,
                        select: function( event, ui ) {
                            var _index = $(this).attr('data-index');
                            scope.oldAction.values[_index].actVal = ui.item.value;

                            scope.$apply();
                            return true;
                        }
                    });

                },2000);

                function saveXpathToDatabase (key,value,taskid,app_type,done,err){
                    scriptorService.saveXpath(key, value, taskid, app_type).then(function(res) {
                        if(res.data.errors) {
                            if(res.data.errors.errorCode === 'EXISTS_IN_DB'){
                                err('EXISTS_IN_DB');
                            } else {
                                err('SERVER_ERROR');
                            }
                        } else{
                            // add newly added xpath to suggestion list
                            $rootScope.xpathList.data.push(res.data);
                            $rootScope.xpathArrayList.push(res.data.xpath.key);
                            done('xpath saved successfully');
                        }
                    });
                };

            }
        }
    }]);

