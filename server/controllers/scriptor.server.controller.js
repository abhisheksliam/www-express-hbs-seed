/**
 * Created by Shipra on 3/14/2016.
 */
'use strict';

const TEMPLATE_BLANK = "blank";
const TEMPLATE_BALOO = "baloo";

const router = require('express').Router();
var TaskJson     = require('./../models/app.server.models.script');

exports.saveTaskScript = function (req, res) {
    var taskjson = new TaskJson();
    // Set text and user values from the request
    taskjson.taskid = req.body.task_id + "." + req.body.scenario;

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
};

exports.getTaskScript = function (req, res) {
    TaskJson.find({taskid: req.params.task_id}, function(err, taskjson) {
        if (err)
            res.send(err);
        res.json(taskjson);
    });
};

exports.updateTaskScript = function (req, res) {
    TaskJson.find({taskid: req.params.task_id}, function(err, taskdata) {
        if (err)
            res.send(err);
        // Update the message text
        taskdata.json = req.body.json;
        taskdata.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Message successfully updated!' });
        });
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