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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                                "actVal": "Ribbon__File"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_Save As"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_SaveAs_SaveAsList_Item4"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
                                        "syntax": "pressKey(MyKeys keyName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "Dialog__pen"
                                            }
                                        ],
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
                                        "syntax": "pressKey(MyKeys keyName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "Dialog__pen"
                                            }
                                        ],
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    }
                                ]
                            },
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
                                                "actVal": "Ribbon__File"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_Save"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_Save As_Documents"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "rightClick()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "Dialog"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "rightClick(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "ContextMenu_New"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "ContextMenu_New_Folder"
                                            }
                                        ],
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
                                        "syntax": "enterText(String text)"
                                    },
                                    {
                                        "init": true,
                                        "name": "pressKey()",
                                        "values": [
                                            {
                                                "actKey": "keyName",
                                                "actVal": "ENTER, ENTER"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "pressKey(MyKeys keyName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "enterText()",
                                        "values": [
                                            {
                                                "actKey": "text",
                                                "actVal": "1A_Quarterly_Sales.xlsx"
                                            }
                                        ],
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    }
                                ]
                            },
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
                                                "actVal": "Ribbon__File"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_Export"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_Export_Change File Type"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_Export_Save As"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
                                        "syntax": "pressKey(MyKeys keyName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "doubleClick()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "Dialog_File3"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "doubleClick(String elementName)"
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    }
                                ]
                            },
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
                                                "actVal": "Ribbon__File"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_Export"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_Export_Change File Type"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "doubleClick()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_Export_ChangeFileType_Item2"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "doubleClick(String elementName)"
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
                                        "syntax": "pressKey(MyKeys keyName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "doubleClick()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "Dialog_File3"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "doubleClick(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "Dialog_Save as type{dropdown}"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "pressKeyMultipleTimes()",
                                        "values": [
                                            {
                                                "actKey": "keyName",
                                                "actVal": "ARROW_UP"
                                            },
                                            {
                                                "actKey": "numOfTimes",
                                                "actVal": "2"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "pressKeyMultipleTimes(MyKeys keyName , String numOfTimes)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "Dialog_Save as type_ExcelWorkbook"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "Dialog_FileName_Textbox"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "pressControlA()",
                                        "values": [],
                                        "balooActionIndex": "",
                                        "syntax": "pressControlA()"
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                                "actVal": "ALT, F, A, 1"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "pressKey(MyKeys keyName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "pressKeyMultipleTimes()",
                                        "values": [
                                            {
                                                "actKey": "keyName",
                                                "actVal": "TAB"
                                            },
                                            {
                                                "actKey": "numOfTimes",
                                                "actVal": "5"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "pressKeyMultipleTimes(MyKeys keyName , String numOfTimes)"
                                    },
                                    {
                                        "init": true,
                                        "name": "pressKey()",
                                        "values": [
                                            {
                                                "actKey": "keyName",
                                                "actVal": "ARROW_RIGHT, ENTER"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "pressKey(MyKeys keyName)"
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
                                        "balooActionIndex": "",
                                        "syntax": "enterText(String text)"
                                    },
                                    {
                                        "init": true,
                                        "name": "pressKey()",
                                        "values": [
                                            {
                                                "actKey": "keyName",
                                                "actVal": "ENTER, ENTER"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "pressKey(MyKeys keyName)"
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
                                        "syntax": "pressKey(MyKeys keyName)"
                                    }
                                ]
                            },
                            {
                                "init": true,
                                "type": "Toolbar",
                                "actions": [
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "TitleBar_Save"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_Save"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "FileBackstage_Save As_Documents"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "rightClick()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "Dialog"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "rightClick(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "ContextMenu_New"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "ContextMenu_New_Folder"
                                            }
                                        ],
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
                                        "syntax": "pressKey(MyKeys keyName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "clickAndWait()",
                                        "values": [
                                            {
                                                "actKey": "elementName",
                                                "actVal": "Dialog_File3"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
                                    },
                                    {
                                        "init": true,
                                        "name": "pressKey()",
                                        "values": [
                                            {
                                                "actKey": "keyName",
                                                "actVal": "SHIFT+F10, L"
                                            }
                                        ],
                                        "balooActionIndex": "",
                                        "syntax": "pressKey(MyKeys keyName)"
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
                                        "syntax": "clickAndWait(String elementName)"
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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
                                        "balooActionIndex": "",
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