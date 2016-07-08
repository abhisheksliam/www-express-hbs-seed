/**
 * Created by Shipra
 */
'use strict';

angular.module('automationApp.scriptor')
.factory('scriptorService', function() {

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
                name:"clickAndWait(String elementName)",
                id:"clickAndWait(String elementName)"
            },
            {
                name:"selectCell(String cellName)",
                id:"selectCell(String cellName)"
            },
            {
                name:"rightClickOnCell(String cellName)",
                id:"rightClickOnCell(String cellName)"
            },
            {
                name:"doubleClick(String elementName)",
                id:"doubleClick(String elementName)"
            },
            {
                name:"clickAtCurrentPos()",
                id:"clickAtCurrentPos()"
            },
            {
                name:"clickAndHoldCurrentPos()",
                id:"clickAndHoldCurrentPos()"
            },
            {
                name:"clickMultipleTimes(String elementName , String numOfTimes)",
                id:"clickMultipleTimes(String elementName , String numOfTimes)"
            },
            {
                name:"doubleClickAndWait()",
                id:"doubleClickAndWait()"
            },
            {
                name:"rightClickCurrentPos()",
                id:"rightClickCurrentPos()"
            }
        ];

        var taskJson = [
            {
                "init": true,
                "scenario": "T1",
                "id": "GO16.XL.01.1A.01",
                "name": "XL Activity 1.01",
                "description": "Starting Excel, Navigating Excel, and Naming and Saving a Workbook",
                "appName": "excel",
                "items": [
                    {
                        "init": true,
                        "skip": false,
                        "methods": [
                            {
                                "init": true,
                                "type": "Other",
                                "actions": [
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "Ribbon__File"
                                            }
                                        ],
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_TemplateItem1"
                                            },
                                            {
                                                "actKey": "xPos",
                                                "actVal": "210"
                                            },
                                            {
                                                "actKey": "yPos",
                                                "actVal": "320"
                                            }
                                        ],
                                        "syntax": "clickAndWait(String elementName)"
                                    }
                                ]
                            },
                            {
                                "init": true,
                                "type": "Right - Click",
                                "actions": [
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_Save As"
                                            }
                                        ],
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "rightClick()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_TemplateItem1"
                                            }
                                        ],
                                        "syntax": "rightClick(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_ContextMenu_Create"
                                            }
                                        ],
                                        "syntax": "clickAndWait(String elementName)"
                                    }
                                ]
                            },
                            {
                                "init": true,
                                "type": "Keyboard",
                                "actions": [
                                    {
                                        "init": true,
                                        "name": "pressKey()",
                                        "values": [
                                            {
                                                "actKey": "keyName",
                                                "actVal": "ESCAPE"
                                            }
                                        ],
                                        "syntax": "pressKey(MyKeys keyName)"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "init": true,
                        "skip": false,
                        "methods": [
                            {
                                "init": true,
                                "type": "Ribbon",
                                "actions": [
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "Dialog__pen"
                                            }
                                        ],
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "enterText()",
                                        "values": [
                                            {
                                                "actKey": "text",
                                                "actVal": "1A_Quarterly_Sales"
                                            }
                                        ],
                                        "syntax": "enterText(String text)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "Dialog__ave"
                                            }
                                        ],
                                        "syntax": "clickAndWait(String elementName)"
                                    }
                                ]
                            },
                            {
                                "init": true,
                                "type": "Keyboard",
                                "actions": [
                                    {
                                        "init": true,
                                        "name": "pressKey()",
                                        "values": [
                                            {
                                                "actKey": "keyName",
                                                "actVal": "F12"
                                            }
                                        ],
                                        "syntax": "pressKey(MyKeys keyName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "Dialog_NewFolder"
                                            }
                                        ],
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "enterText()",
                                        "values": [
                                            {
                                                "actKey": "text",
                                                "actVal": "Excel Chapter 1"
                                            }
                                        ],
                                        "syntax": "enterText(String text)"
                                    },
                                    {
                                        "init": true,
                                        "name": "pressKey()",
                                        "values": [
                                            {
                                                "actKey": "keyName",
                                                "actVal": "ENTER"
                                            }
                                        ],
                                        "syntax": "pressKey(MyKeys keyName)"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "init": true,
                        "skip": false,
                        "methods": [
                            {
                                "init": true,
                                "type": "Other",
                                "actions": [
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_TemplateItem1"
                                            }
                                        ],
                                        "syntax": "clickAndWait(String elementName)"
                                    }
                                ]
                            },
                            {
                                "init": true,
                                "type": "Right - Click",
                                "actions": [
                                    {
                                        "init": true,
                                        "name": "rightClick()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_TemplateItem1"
                                            }
                                        ],
                                        "syntax": "rightClick(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_ContextMenu_Create"
                                            }
                                        ],
                                        "syntax": "clickAndWait(String elementName)"
                                    }
                                ]
                            },
                            {
                                "init": true,
                                "type": "Keyboard",
                                "actions": [
                                    {
                                        "init": true,
                                        "name": "pressKey()",
                                        "values": [
                                            {
                                                "actKey": "keyName",
                                                "actVal": "ESCAPE"
                                            }
                                        ],
                                        "syntax": "pressKey(MyKeys keyName)"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ];


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

        var getTaskJson = function() {
            return taskJson;
        }

        return {
        "uiElements" : {},
        "getApplications": getApplications,
        "getScenarios": getScenarios,
        "getTriggers":  getTriggers,
        "getTaskJson": getTaskJson
    };
});