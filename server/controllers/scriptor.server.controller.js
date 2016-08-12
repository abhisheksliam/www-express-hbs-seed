/**
 * Created by Shipra on 3/14/2016.
 */
'use strict';

const TEMPLATE_BLANK = "blank";
const TEMPLATE_BALOO = "baloo";

const router = require('express').Router();
var TaskJson     = require('./../models/app.server.models.script');

exports.saveTaskScript = function (req, res) {
    var sle_id = req.body.task_id + "." + req.body.scenario;

    TaskJson.findOne({taskid: sle_id}, function(err, result) {
        if (err)
           res.json({ "errors": {
                "errorMessage": err,
                "errorCode": "PROCESSING_ERROR"
           } });
        if(result) {
            res.json({ "errors": {
                "errorMessage": "Task script already exists in database",
                "errorCode": "EXISTS_IN_DB"
            } });
        } else {
             checkForTemplateAndSave(sle_id, req, res);
        }
    });

};

exports.getTaskScript = function (req, res) {
    TaskJson.find({taskid: req.params.task_id}, function(err, taskjson) {
        if (err)
            res.send(err);
        res.json(taskjson);
    });
};

exports.updateTaskScript = function (req, res) {
    TaskJson.findOneAndUpdate({taskid: req.params.task_id}, {$set: {"json" : req.body.task_json}}, function(err, doc){
        if (err)
            res.send(err);
        res.json(doc);
    });
};

exports.getAllTasks = function (req, res) {
    TaskJson.find(function(err, taskjson) {
        console.log("get json" , taskjson);
        if (err)
            res.send(err);
        res.json(taskjson);
    });
};

exports.deleteTaskScript = function (req, res) {
    console.log("delete json");
    TaskJson.remove({
        taskid: req.params.task_id
    }, function(err, taskdata) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted task json!' });
    });
};

function checkForTemplateAndSave(sle_id, req, res){
    var taskjson = new TaskJson();
    // Set text and user values from the request
    taskjson.taskid = sle_id;

    if(req.body.template === TEMPLATE_BLANK) {
        taskjson.json = generateBlankTemplate(req);
    } else {
        taskjson.json = generatePreFilledTemplate();
    }

    // Save message and check for errors
    taskjson.save(function(err, taskjson) {
        if (err)
            res.send(err);
        console.log(taskjson);
        res.json(taskjson);
    });
}

function generateBlankTemplate(req){

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

    return taskjson;

}


function generatePreFilledTemplate(){

    return {};

}