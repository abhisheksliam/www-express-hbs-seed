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

                    var triggerNumber = parseInt($(this).closest('.li-level-2').data('id'));
                   
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
                                            
                                            scope.method.actions[triggerNumber] = angular.copy(scope.oldAction);
                                            scope.editMode = false;
                                            scope.droppedTrigger = false;
                                            $(this).closest('.item-level-2').removeClass('edit-mode');
                                            $rootScope.showNotify('<div class="alert alert-success m-r-30"><p><strong>Update Successful !!</p></div>');
                                        }
                                    },
                                    function(error){
                                        var xPath = scriptorService.getXPathForElement(key);
                                        $el.val(xPath);
                                        $rootScope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>Element ' + key + ' : ' + error + '</p></div>');
                                    });
                            } else {
                                $rootScope.showNotify('<div class="alert alert-danger m-r-30"><p><strong>Error in getting xpath values.</p></div>');
                            }
                        });
                    } else {
                        scope.editMode = false;
                        scope.droppedTrigger = false;
                        $(this).closest('.item-level-2').removeClass('edit-mode');
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
                    var triggerNumber = parseInt($(this).closest('.li-level-2').data('id'));
                    var $item = $(this).parents(".dd-item:first");
                    bootbox.confirm("Are you sure to remove this trigger?", function (result) {
                        if (result === true) {
                            $item.addClass("animated bounceOutRight");
                            window.setTimeout(function () {
                                scope.method.actions.splice(triggerNumber, 1);
                                scope.$apply();
                            }, 300);
                        }
                    });
                    event.stopPropagation();
                });

                element.on('click',".panel-move",function (event) {
                    event.preventDefault();
                    //todo
                    event.stopPropagation();
                });

                element.on('click',".copy-trigger",function (event) {
                    event.preventDefault();

                    var triggerNumber = parseInt($(this).closest('.li-level-2').data('id'));
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

                    var elementNameSuggestions = scriptorService.getElementNameSuggestions();
                    element.find( ".input__field.elementName" ).autocomplete({
                        source: elementNameSuggestions,
                        select: function( event, ui ) {
                            //scope.action.values[0].actVal = ui.item.value;
                            var _index = $(this).attr('data-index');
                            scope.action.values[_index].actVal = ui.item.value;

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
                            scope.action.values[_index].actVal = ui.item.value;

                            scope.$apply();
                            return true;
                        }
                    });

                },200);

                function saveXpathToDatabase (key,value,taskid,app_type,done,err){
                    scriptorService.saveXpath(key, value, taskid, app_type).then(function(res) {
                        if(res.data.errors) {
                            if(res.data.errors.errorCode === 'EXISTS_IN_DB'){
                                err('EXISTS_IN_DB');
                            } else {
                                err('SERVER_ERROR');
                            }
                        } else{
                            done('xpath saved successfully');
                        }
                    });
                };

            }
        }
    }]);

