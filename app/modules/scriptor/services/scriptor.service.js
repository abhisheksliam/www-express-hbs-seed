/**
 * Created by Shipra
 */
'use strict';

angular.module('automationApp.scriptor')
.factory('scriptorService', ['$filter' , '$http' ,function($filter, $http) {

        /**************** Constants ****************/
        var triggers = [
            {
                name:"clickAndWait()",
                id:"1",
                syntax: "clickAndWait(String elementName)",
                values: [
                    {
                        "actVal": "Customize_Quick_Access_Toolbar",
                        "actKey": "elementName",
                        "displayXpath" : true,
                        "dataType": "string"
                    }
                ]
            },
            {
                name:"selectCell()",
                id:"2",
                syntax: "selectCell(String cellName)",
                values: [
                    {
                        "actVal": "abc",
                        "actKey": "cellName",
                        "dataType": "string"
                    }
                ]
            },
            {
                name:"rightClickOnCell()",
                id:"3",
                syntax: "rightClickOnCell(String cellName)",
                values: [
                    {
                        "actVal": "abc",
                        "actKey": "cellName",
                        "dataType": "string"
                    }
                ]
            },
            {
                name:"doubleClick()",
                id:"4",
                syntax: "doubleClick(String elementName)",
                values: [
                    {
                        "actVal": "abc",
                        "actKey": "elementName",
                        "displayXpath" : true,
                        "dataType": "string"
                    }
                ]
            },
            {
                name:"clickAtCurrentPos()",
                id:"5",
                syntax: "clickAtCurrentPos()",
                values: []
            },
            {
                name:"pressKey()",
                id:"6",
                syntax: "pressKey(MyKeys keyName)",
                values: [
                    {
                        "actVal": "ALT",
                        "actKey": "keyName",
                        "dataType": "string"
                    }
                ]
            },
            {
                name:"clickMultipleTimes()",
                id:"7",
                syntax: "clickMultipleTimes(String elementName , String numOfTimes)",
                values: [
                    {
                        "actVal": "Customize_Quick_Access_Toolbar",
                        "actKey": "elementName",
                        "displayXpath" : true,
                        "dataType": "string"
                    },
                    {
                        "actVal": "4",
                        "actKey": "numOfTimes",
                        "dataType": "string"
                    }
                ]
            },
            {
                name:"doubleClickAndWait()",
                id:"8",
                syntax: "doubleClickAndWait()",
                values: []
            },
            {
                name:"rightClickCurrentPos()",
                id:"9",
                syntax: "rightClickCurrentPos()",
                values: []
            }
        ];

        var keyboardActions =
            ["ALT","ARROW_DOWN","ARROW_LEFT","ARROW_RIGHT","ARROW_UP","BACK_SPACE","CONTROL","DECIMAL","DELETE","END","ENTER","ESCAPE","F1","F10","F11","F12","F2","F3","F4","F5","F6","F7","F8","F9","HOME","PAGE_DOWN","SHIFT","SPACEBAR","TAB","CTRL","ESC","PAGE_UP"];

        var elementNameSuggestion = [
            "DialogFormIcon",
            "Access_TaskBar_StartButton",
            "Ribbon_Minimize",
            "Ribbon_ClosePreview_ClosePrintPreview"
        ];

        var xPathForElement = {
            "DialogFormIcon" : "//*[@id='12_frameicon']",
            "Access_TaskBar_StartButton" : "//*[@id='win10tb-start-btn']",
            "Ribbon_Minimize" : "//*[@class='title-bar']//*[contains(@class,'titlebar-control')][descendant::*[text()='Minimize']]",
            "Ribbon_ClosePreview_ClosePrintPreview" : "//*[@id='ribbon-tab-Print Preview']/li[descendant::*[text()='C']]"
        }


        /***************** APIs ********************/


        var getNewScriptContext = function() {
            return $http.get('data/new_script.json');
        }

        var getTaskJson = function() {
            return $http.get('data/ppt_task.json');
        }

        var getTriggers = function() {
            return triggers;
        }

        var getTriggerForID = function(id) {
            var dest = {};
            var source = $filter('filter')(triggers, {id:id})[0];
            angular.copy(source, dest);
            return dest;
        }

        var getKeyNameSuggestions = function() {
            return keyboardActions;
        }

        var getElementNameSuggestions = function() {
            return elementNameSuggestion;
        }


        var getXPathForElement = function(elementName) {
            return xPathForElement[elementName];
        }


        return {
        "uiElements" : {},
        "getNewScriptContext": getNewScriptContext,
        "getTriggers":  getTriggers,
        "getTriggerForID": getTriggerForID,
        "getTaskJson": getTaskJson,
        "getKeyNameSuggestions":getKeyNameSuggestions,
        "getElementNameSuggestions":getElementNameSuggestions,
        "getXPathForElement" : getXPathForElement
    };
}]);
