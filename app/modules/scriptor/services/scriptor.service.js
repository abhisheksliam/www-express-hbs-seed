/**
 * Created by Shipra
 */
'use strict';

angular.module('automationApp.scriptor')
.factory('scriptorService', ['$filter',function($filter) {

        /**************** Constants ****************/
        var applications = [
            "Word",
            "Access",
            "PPT",
            "Excel"
        ];

        var scenarios = [
            "T1",
            "A1"
        ];

        var triggers = [
            {
                name:"clickAndWait()",
                id:"1",
                syntax: "clickAndWait(String elementName)",
                values: [
                    {
                        "actVal": "Customize_Quick_Access_Toolbar",
                        "actKey": "elementName"
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
                        "actKey": "cellName"
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
                        "actKey": "cellName"
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
                        "actKey": "elementName"
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
                        "actKey": "keyName"
                    }
                ]
            },
            {
                name:"clickMultipleTimes()",
                id:"7",
                syntax: "clickMultipleTimes(String elementName , String numOfTimes, String extra)",
                values: [
                    {
                        "actVal": "Customize_Quick_Access_Toolbar",
                        "actKey": "elementName"
                    },
                    {
                        "actVal": "4",
                        "actKey": "numOfTimes"
                    },
                    {
                        "actVal": "test",
                        "actKey": "extra"
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

        var taskJson = [
            {
                "description": "WD Step 1.1.7: Customize the Quick Access Toolbar",
                "source": "nlp",
                "scenario": "T1",
                "id": "EXP16.WD.01.01.07",
                "init": true,
                "appName": "word",
                "version": "1.0",
                "name": "WD Step 1.1.7",
                "items": [
                    {
                        "init": true,
                        "methods": [
                            {
                                "init": true,
                                "type": "Toolbar",
                                "balooActions": [
                                    {
                                        "text": "Click Customize Quick Access Toolbar (at the immediate right of the Quick Access Toolbar). Click Print Preview and Print."
                                    }
                                ],
                                "actions": [
                                    {
                                        "init": true,
                                        "balooActionText": "Click Customize Quick Access Toolbar (at the immediate right of the Quick Access Toolbar). Click Print Preview and Print.",
                                        "balooActionIndex": 0,
                                        "values": [
                                            {
                                                "actVal": "Customize_Quick_Access_Toolbar",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Click Customize Quick Access Toolbar (at the immediate right of the Quick Access Toolbar). Click Print Preview and Print.",
                                        "balooActionIndex": 0,
                                        "values": [
                                            {
                                                "actVal": "Print_Preview",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    }
                                ],
                                "group": "NOT_FOUND"
                            },
                            {
                                "init": true,
                                "type": "Ribbon",
                                "balooActions": [
                                    {
                                        "text": "Click the File tab."
                                    },
                                    {
                                        "text": "Click Options."
                                    },
                                    {
                                        "text": "Click Quick Access Toolbar."
                                    },
                                    {
                                        "text": "In the Commands list, scroll to and select Print Preview and Print."
                                    },
                                    {
                                        "text": "Click the Add button."
                                    },
                                    {
                                        "text": "Click OK."
                                    }
                                ],
                                "actions": [
                                    {
                                        "init": true,
                                        "balooActionText": "Click the File tab.",
                                        "balooActionIndex": 0,
                                        "values": [
                                            {
                                                "actVal": "Ribbon__File",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Click Options.",
                                        "balooActionIndex": 1,
                                        "values": [
                                            {
                                                "actVal": "Options",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Click Quick Access Toolbar.",
                                        "balooActionIndex": 2,
                                        "values": [
                                            {
                                                "actVal": "Quick_Access_Toolbar",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "In the Commands list, scroll to and select Print Preview and Print.",
                                        "balooActionIndex": 3,
                                        "values": [
                                            {
                                                "actVal": "scroll_to",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "scroll()",
                                        "syntax": "scroll(String elementName)"
                                    }
                                ],
                                "group": "NOT_FOUND"
                            },
                            {
                                "init": true,
                                "type": "Keyboard",
                                "balooActions": [
                                    {
                                        "text": "Press ALT (or F10, or press F6 until the ribbon is selected), F, T."
                                    },
                                    {
                                        "text": "Press Q (or DOWN ARROW) to select Quick Access Toolbar."
                                    },
                                    {
                                        "text": "Press TAB to select the Commands list, then press ARROW keys (or P then ARROW keys) to select Print Preview and Print. Press ALT+A (or TAB to select Add and press ENTER or SPACEBAR)."
                                    },
                                    {
                                        "text": "Press TAB to select OK and press ENTER or SPACEBAR."
                                    }
                                ],
                                "actions": [
                                    {
                                        "init": true,
                                        "balooActionText": "Press ALT (or F10, or press F6 until the ribbon is selected), F, T.",
                                        "balooActionIndex": 0,
                                        "values": [
                                            {
                                                "actVal": "ALT,F,T",
                                                "actKey": "keyName"
                                            }
                                        ],
                                        "name": "pressKey()",
                                        "syntax": "pressKey(MyKeys keyName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Press Q (or DOWN ARROW) to select Quick Access Toolbar.",
                                        "balooActionIndex": 1,
                                        "values": [
                                            {
                                                "actVal": "Q",
                                                "actKey": "keyName"
                                            }
                                        ],
                                        "name": "pressKey()",
                                        "syntax": "pressKey(MyKeys keyName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Press TAB to select the Commands list, then press ARROW keys (or P then ARROW keys) to select Print Preview and Print. Press ALT+A (or TAB to select Add and press ENTER or SPACEBAR).",
                                        "balooActionIndex": 2,
                                        "values": [
                                            {
                                                "actVal": "TAB",
                                                "actKey": "keyName"
                                            },
                                            {
                                                "actVal": "1",
                                                "actKey": "numOfTimes"
                                            }
                                        ],
                                        "name": "pressKeyMultipleTimes()",
                                        "syntax": "pressKeyMultipleTimes(MyKeys keyName, String numOfTimes)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Press TAB to select the Commands list, then press ARROW keys (or P then ARROW keys) to select Print Preview and Print. Press ALT+A (or TAB to select Add and press ENTER or SPACEBAR).",
                                        "balooActionIndex": 2,
                                        "values": [
                                            {
                                                "actVal": "ARROW",
                                                "actKey": "keyName"
                                            }
                                        ],
                                        "name": "pressKey()",
                                        "syntax": "pressKey(MyKeys keyName)"
                                    }
                                ],
                                "group": "NOT_FOUND"
                            },
                            {
                                "init": true,
                                "type": "Toolbar",
                                "balooActions": [
                                    {
                                        "text": "On the Quick Access Toolbar, click (or right-click) the Customize Quick Access Toolbar button, and then click More Commands (or press M)."
                                    },
                                    {
                                        "text": "In the Commands list, scroll to and select Print Preview and Print."
                                    },
                                    {
                                        "text": "Click the Add button."
                                    },
                                    {
                                        "text": "Click OK."
                                    }
                                ],
                                "actions": [
                                    {
                                        "init": true,
                                        "balooActionText": "On the Quick Access Toolbar, click (or right-click) the Customize Quick Access Toolbar button, and then click More Commands (or press M).",
                                        "balooActionIndex": 0,
                                        "values": [
                                            {
                                                "actVal": "Customize_Quick_Access_Toolbar",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "On the Quick Access Toolbar, click (or right-click) the Customize Quick Access Toolbar button, and then click More Commands (or press M).",
                                        "balooActionIndex": 0,
                                        "values": [
                                            {
                                                "actVal": "More_Commands",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "In the Commands list, scroll to and select Print Preview and Print.",
                                        "balooActionIndex": 1,
                                        "values": [
                                            {
                                                "actVal": "scroll_to",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "scroll()",
                                        "syntax": "scroll(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Click the Add button.",
                                        "balooActionIndex": 2,
                                        "values": [
                                            {
                                                "actVal": "Add",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    }
                                ],
                                "group": "NOT_FOUND"
                            }
                        ],
                        "skip": false,
                        "text": "Customize the Quick Access Toolbar to include Print Preview and Print. Close any open dialog boxes."
                    },
                    {
                        "init": true,
                        "methods": [
                            {
                                "init": true,
                                "type": "Ribbon",
                                "balooActions": [
                                    {
                                        "text": "Click the Review tab."
                                    },
                                    {
                                        "text": "In the Proofing group, right-click Spelling &amp; Grammar, and then click Add to Quick Access Toolbar."
                                    }
                                ],
                                "actions": [
                                    {
                                        "init": true,
                                        "balooActionText": "Click the Review tab.",
                                        "balooActionIndex": 0,
                                        "values": [
                                            {
                                                "actVal": "Ribbon__Review",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "In the Proofing group, right-click Spelling &amp; Grammar, and then click Add to Quick Access Toolbar.",
                                        "balooActionIndex": 1,
                                        "values": [
                                            {
                                                "actVal": "Ribbon__Proofing__Spelling Grammar",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "In the Proofing group, right-click Spelling &amp; Grammar, and then click Add to Quick Access Toolbar.",
                                        "balooActionIndex": 1,
                                        "values": [
                                            {
                                                "actVal": "Ribbon__Proofing__Spelling Grammar__Add Quick Access Toolbar",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    }
                                ],
                                "group": "NOT_FOUND"
                            },
                            {
                                "init": true,
                                "type": "Toolbar",
                                "balooActions": [
                                    {
                                        "text": "Click Customize Quick Access Toolbar (at the immediate right of the Quick Access Toolbar). Click Spelling &amp; Grammar."
                                    }
                                ],
                                "actions": [
                                    {
                                        "init": true,
                                        "balooActionText": "Click Customize Quick Access Toolbar (at the immediate right of the Quick Access Toolbar). Click Spelling &amp; Grammar.",
                                        "balooActionIndex": 0,
                                        "values": [
                                            {
                                                "actVal": "Customize_Quick_Access_Toolbar",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Click Customize Quick Access Toolbar (at the immediate right of the Quick Access Toolbar). Click Spelling &amp; Grammar.",
                                        "balooActionIndex": 0,
                                        "values": [
                                            {
                                                "actVal": "Spelling",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    }
                                ],
                                "group": "NOT_FOUND"
                            },
                            {
                                "init": true,
                                "type": "Keyboard",
                                "balooActions": [
                                    {
                                        "text": "Press ALT (or F10, or press F6 until the ribbon is selected), F, T."
                                    },
                                    {
                                        "text": "Press Q (or DOWN ARROW) to select Quick Access Toolbar."
                                    },
                                    {
                                        "text": "Press TAB to select the Commands list, then press ARROW keys (or S then ARROW keys) to select Spelling &amp; Grammar. Press ALT+A (or TAB to select Add and press ENTER or SPACEBAR)."
                                    },
                                    {
                                        "text": "Press TAB to select OK and press ENTER or SPACEBAR."
                                    }
                                ],
                                "actions": [
                                    {
                                        "init": true,
                                        "balooActionText": "Press ALT (or F10, or press F6 until the ribbon is selected), F, T.",
                                        "balooActionIndex": 0,
                                        "values": [
                                            {
                                                "actVal": "ALT,F,T",
                                                "actKey": "keyName"
                                            }
                                        ],
                                        "name": "pressKey()",
                                        "syntax": "pressKey(MyKeys keyName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Press Q (or DOWN ARROW) to select Quick Access Toolbar.",
                                        "balooActionIndex": 1,
                                        "values": [
                                            {
                                                "actVal": "Q",
                                                "actKey": "keyName"
                                            }
                                        ],
                                        "name": "pressKey()",
                                        "syntax": "pressKey(MyKeys keyName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Press TAB to select the Commands list, then press ARROW keys (or S then ARROW keys) to select Spelling &amp; Grammar. Press ALT+A (or TAB to select Add and press ENTER or SPACEBAR).",
                                        "balooActionIndex": 2,
                                        "values": [
                                            {
                                                "actVal": "TAB",
                                                "actKey": "keyName"
                                            },
                                            {
                                                "actVal": "1",
                                                "actKey": "numOfTimes"
                                            }
                                        ],
                                        "name": "pressKeyMultipleTimes()",
                                        "syntax": "pressKeyMultipleTimes(MyKeys keyName, String numOfTimes)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Press TAB to select the Commands list, then press ARROW keys (or S then ARROW keys) to select Spelling &amp; Grammar. Press ALT+A (or TAB to select Add and press ENTER or SPACEBAR).",
                                        "balooActionIndex": 2,
                                        "values": [
                                            {
                                                "actVal": "ARROW",
                                                "actKey": "keyName"
                                            }
                                        ],
                                        "name": "pressKey()",
                                        "syntax": "pressKey(MyKeys keyName)"
                                    }
                                ],
                                "group": "NOT_FOUND"
                            }
                        ],
                        "skip": false,
                        "text": "Click the Review tab, and then add Spelling & Grammar to the Quick Access Toolbar. Close any open dialog boxes."
                    },
                    {
                        "init": true,
                        "methods": [
                            {
                                "init": true,
                                "type": "Right-Click",
                                "balooActions": [
                                    {
                                        "text": "Right-click Print Preview and Print on the Quick Access Toolbar. Click Remove from Quick Access Toolbar."
                                    }
                                ],
                                "actions": [
                                    {
                                        "init": true,
                                        "balooActionText": "Right-click Print Preview and Print on the Quick Access Toolbar. Click Remove from Quick Access Toolbar.",
                                        "balooActionIndex": 0,
                                        "values": [
                                            {
                                                "actVal": "Print_Preview",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "rightClick()",
                                        "syntax": "rightClick(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Right-click Print Preview and Print on the Quick Access Toolbar. Click Remove from Quick Access Toolbar.",
                                        "balooActionIndex": 0,
                                        "values": [
                                            {
                                                "actVal": "RemoveQuick_Access_Toolbar",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    }
                                ],
                                "group": "NOT_FOUND"
                            },
                            {
                                "init": true,
                                "type": "Toolbar",
                                "balooActions": [
                                    {
                                        "text": "Click Customize Quick Access Toolbar (at the immediate right of the Quick Access Toolbar). Click Print Preview and Print."
                                    }
                                ],
                                "actions": [
                                    {
                                        "init": true,
                                        "balooActionText": "Click Customize Quick Access Toolbar (at the immediate right of the Quick Access Toolbar). Click Print Preview and Print.",
                                        "balooActionIndex": 0,
                                        "values": [
                                            {
                                                "actVal": "Customize_Quick_Access_Toolbar",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Click Customize Quick Access Toolbar (at the immediate right of the Quick Access Toolbar). Click Print Preview and Print.",
                                        "balooActionIndex": 0,
                                        "values": [
                                            {
                                                "actVal": "Print_Preview",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    }
                                ],
                                "group": "NOT_FOUND"
                            },
                            {
                                "init": true,
                                "type": "Ribbon",
                                "balooActions": [
                                    {
                                        "text": "Click the File tab."
                                    },
                                    {
                                        "text": "Click Options."
                                    },
                                    {
                                        "text": "Click Quick Access Toolbar."
                                    },
                                    {
                                        "text": "In the Commands list under Customize Quick Access Toolbar, select Print Preview and Print."
                                    },
                                    {
                                        "text": "Click the Remove button."
                                    },
                                    {
                                        "text": "Click OK."
                                    }
                                ],
                                "actions": [
                                    {
                                        "init": true,
                                        "balooActionText": "Click the File tab.",
                                        "balooActionIndex": 0,
                                        "values": [
                                            {
                                                "actVal": "Ribbon__File",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Click Options.",
                                        "balooActionIndex": 1,
                                        "values": [
                                            {
                                                "actVal": "Options",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Click Quick Access Toolbar.",
                                        "balooActionIndex": 2,
                                        "values": [
                                            {
                                                "actVal": "Quick_Access_Toolbar",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "balooActionText": "Click the Remove button.",
                                        "balooActionIndex": 4,
                                        "values": [
                                            {
                                                "actVal": "Remove",
                                                "actKey": "elementName"
                                            }
                                        ],
                                        "name": "clickAndWait()",
                                        "syntax": "clickAndWait(String elementName)"
                                    }
                                ],
                                "group": "NOT_FOUND"
                            }
                        ],
                        "skip": false,
                        "text": "Remove Print Preview and Print from the Quick Access Toolbar."
                    }
                ]
            }
        ];

        var methodtypelist = [
                            "Ribbon",
                            "Keyboard",
                            "Toolbar",
                            "Mouse",
                            "Shortcut Menu",
                            "Other",
                            "Menu",
                            "Right Click"
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
        /**************** Private functions ********/










        /***************** APIs ********************/


        var getApplications = function() {
            return applications;
        }

        var getScenarios = function() {
            return scenarios;
        }

        var getTriggers = function() {
            return triggers;
        }

        var getTriggerForID = function(id) {
            return $filter('filter')(triggers, {id:id})[0];
        }

        var getTaskJson = function() {
            return taskJson;
        }

        var getMethodTypeList = function() {
            return methodtypelist;
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
        "getApplications": getApplications,
        "getScenarios": getScenarios,
        "getTriggers":  getTriggers,
        "getTriggerForID": getTriggerForID,
        "getTaskJson": getTaskJson,
        "getMethodTypeList": getMethodTypeList,
        "getKeyNameSuggestions":getKeyNameSuggestions,
        "getElementNameSuggestions":getElementNameSuggestions
    };
}]);
