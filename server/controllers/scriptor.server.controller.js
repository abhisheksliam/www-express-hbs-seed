/**
 * Created by Shipra on 3/14/2016.
 */
'use strict';

const TEMPLATE_BLANK = "blank",
      TEMPLATE_BALOO = "baloo",
      TEMPLATE_TASK = "task",
      BALOO_API_HOST = 'anu',
      BALOO_API_PORT = '8080',
      BALOO_API_URL = '/NLPService/api/tasks/';

const router = require('express').Router();
var http = require('http');
var AutomationScripts     = require('./../models/app.server.models.script');
var _ = require('lodash');

exports.saveTask = function (req, res) {
    var sle_id = req.body.task_id + "." + req.body.scenario;
    AutomationScripts.findOne({sle_id: sle_id}, function(err, scriptData) {
        if (err) {
            res.json({
            "errors": {
                "errorMessage": err,
                "errorCode": "PROCESSING_ERROR"
            }
            });
        }
        if(scriptData) {
            res.json({ "errors": {
                "errorMessage": "Task script already exists in database",
                "errorCode": "EXISTS_IN_DB"
            } });
        } else {
             checkForTemplateAndSave(sle_id, req, res, true);
        }
    });

};

exports.updateTask = function (req, res) {
    var sle_id = req.body.task_id + "." + req.body.scenario;

    checkForTemplateAndSave(sle_id, req, res, false);
};

exports.getTaskScript = function (req, res) {
    AutomationScripts.find({sle_id: req.params.task_id}, function(err, scriptData) {
        if (err) {
            res.json({
                "errors": {
                    "errorMessage": err,
                    "errorCode": "PROCESSING_ERROR"
                }
            });
        }

        transformPathwaysNewFormat(res, scriptData);
    });
};

exports.updateTaskScript = function (req, res) {

    var scriptData = transformPathwaysOldFormat(req.body.task_json);

    AutomationScripts.findOneAndUpdate({sle_id: req.params.task_id}, {$set: {"task_json" : req.body.task_json, 'modified_by.name' : req.body.modified_by.name}}, function(err, doc){
        if (err) {
            res.json({
                "errors": {
                    "errorMessage": err,
                    "errorCode": "PROCESSING_ERROR"
                }
            });
        }
        res.json(doc);
    });
};

exports.getAllTasks = function (req, res) {
    AutomationScripts.find(function(err, scriptData) {
        if (err) {
            res.json({
                "errors": {
                    "errorMessage": err,
                    "errorCode": "PROCESSING_ERROR"
                }
            });
        }
        res.json(scriptData);
    });
};

exports.deleteTaskScript = function (req, res) {
    AutomationScripts.remove({
        sle_id: req.params.task_id
    }, function(err, scriptData) {
        if (err) {
            res.json({
                "errors": {
                    "errorMessage": err,
                    "errorCode": "PROCESSING_ERROR"
                }
            });
        }

        res.json({ message: 'Successfully deleted task json!' });
    });
};

function checkForTemplateAndSave(sle_id, req, res, bSaveUpdate){
    var automationScript = new AutomationScripts();
    // Set text and user values from the request
    automationScript.sle_id = sle_id;
    automationScript.modified_by.name = req.body.modified_by.name;

    if(req.body.template === TEMPLATE_BLANK) {
        generateBlankTemplate(req, function(taskJson){
            saveUpdateData(bSaveUpdate, req, res, automationScript, taskJson, sle_id);
        });

    } else if(req.body.template === TEMPLATE_BALOO){
        generatePreFilledBalooTemplate(req,
            function(taskJson){
                saveUpdateData(bSaveUpdate, req, res, automationScript, taskJson, sle_id);
            });

    } else if (req.body.template === TEMPLATE_TASK){
        generateCopyTemplate(req, function(taskJson){
            saveUpdateData(bSaveUpdate, req, res, automationScript, taskJson, sle_id);
        });
    }
};

function saveUpdateData(bSaveUpdate, req, res, automationScript, taskJson, sle_id){
    automationScript.task_json = taskJson;

    if (taskJson.errors){
        console.log(taskJson);
        res.json(taskJson);
    }
    else if(bSaveUpdate) {
        // save as a new task - this is already validated that task does not exist.
        automationScript.created_by.name = req.body.modified_by.name;
        automationScript.save(function (err, scriptData) {
            if (err) {
                res.json({
                    "errors": {
                        "errorMessage": err,
                        "errorCode": "PROCESSING_ERROR"
                    }
                });
            }
            res.json(scriptData);
        });
    } else {
        AutomationScripts.findOneAndUpdate({sle_id: sle_id}, {$set: {"task_json" : automationScript.task_json, 'modified_by.name' : req.body.modified_by.name}}, function(err, doc){

            if (err) {
                res.json({
                    "errors": {
                        "errorMessage": err,
                        "errorCode": "PROCESSING_ERROR"
                    }
                });
            }
            doc.task_json = automationScript.task_json; // findOneAndUpdate return found value in response, not updated
            doc.modified_by.name = automationScript.modified_by.name;
            res.json(doc);
        });
    }
};

function generateBlankTemplate(req, done){

    var taskjson = [
        {
            "items": [
                {
                    "methods": [
                        {
                            "type": "Ribbon",
                            "actions": []
                        }
                    ]
                }
            ],
            "appName" : req.body.app_key,
            "id" : req.body.task_id,
            "scenario" : req.body.scenario
        }
    ];

    done(taskjson);
}


function generatePreFilledBalooTemplate(req,done){

    var errObj = {
                "errors": {
                    "errorMessage": '',
                    "errorCode": "PROCESSING_ERROR"
                }
                };

    var _v1 = (BALOO_API_URL + (req.body.task_id + '.' + req.body.scenario));

    var options = {
        host: BALOO_API_HOST,
        port: BALOO_API_PORT,
        path: _v1,
        method: 'get'
    };

    var callback = function(response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('error', function(err) {
            errObj.errors.errorMessage = err;
            done(errObj);
        });

        response.on('end', function () {
            var parsed = {};
            try{
                parsed = JSON.parse(str);
                if(parsed.statusCode == 200){
                    done([parsed.content]);
                } else {
                    errObj.errors.errorMessage = parsed.message;
                    done(errObj);
                }
            } catch(e){
                errObj.errors.errorMessage = "Error in NLP JSON";
                done(errObj);
            }
        });
    };

        var b_req = http.request(options, callback);
        b_req.on('error', function(err) {
                errObj.errors.errorMessage = 'Error in connecting NLP server';
                done(errObj);
            });
        b_req.end();
};

function generateCopyTemplate(req, done){

    AutomationScripts.findOne({sle_id: req.body.copy_sle_id}, function(err, scriptData) {
        if (err) {
            var error = {
                "errors": {
                    "errorMessage": err,
                    "errorCode": "PROCESSING_ERROR"
                }
            };
            done(error);
        }
        if(scriptData) {
            scriptData.task_json[0].appName = req.body.app_key;
            scriptData.task_json[0].id =req.body.task_id;
            scriptData.task_json[0].scenario = req.body.scenario;

            done(scriptData.task_json);
        } else {
            var error = {
                "errors": {
                    "errorMessage": 'SLE_NOT_FOUND : ' + req.body.copy_sle_id,
                    "errorCode": 'SLE_NOT_FOUND'
                }
            };
            done(error);
        }
    });
};

function transformPathwaysNewFormat(res, scriptData) {

    if(scriptData[0].task_json[1] !== undefined){
        var array2 = [];

        var array = _.map(scriptData[0].task_json[1], function(value, index) {
            if(index%2 == 0) {

                var pathwayArr = _.map(value, function(innenrValue, innerIndex) {
                    return innenrValue.replace(/['"]+/g, '').replace(',', '/').replace(" ", "");
                });

                return {"pathway" : pathwayArr}
            } else {
                return value;
            }
        });

        _.map(array, function(value, index) {
            if(index%2 == 0) {
                return value;
            } else {
                array[index-1].group = value.replace(/['"]+/g, '');
                array2.push(array[index-1]);
                return value;
            }
        });

        scriptData[0].task_json[1] = array2;
    }

    res.json(scriptData);

};


function transformPathwaysOldFormat(scriptData) {

    if(scriptData[1] !== undefined){

        var array2 = [];

        _.map(scriptData[1], function(value, index) {
                var pathwayArr = _.map(value.pathway, function(innenrValue, innerIndex) {
                    return innenrValue.replace('/', ',');
                });
                array2.push(pathwayArr);
                array2.push(value.group);

                return value;
        });

        scriptData[1] = array2;
    }

    return scriptData;

};