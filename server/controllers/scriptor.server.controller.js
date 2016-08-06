/**
 * Created by Shipra on 3/14/2016.
 */
'use strict';

const router = require('express').Router();
var TaskJson     = require('./../models/app.server.models.script');

exports.getJSON = function (req, res) {
    TaskJson.find(function(err, taskjson) {
        console.log("get json" , taskjson);
        if (err)
            res.send(err);
        res.json(taskjson);
    });
};

exports.postJSON = function (req, res) {
    console.log("post json");
    var taskjson = new TaskJson();
    // Set text and user values from the request
    taskjson.taskid = req.body.taskid;
    taskjson.json = req.body.json;

    // Save message and check for errors
    taskjson.save(function(err) {
        if (err)
            res.send(err);
        res.json({ message: 'Task Json created successfully!' });
    });
};

exports.getTaskScript = function (req, res) {
    TaskJson.find({taskid: req.params.task_id}, function(err, taskjson) {
        console.log("get json" , taskjson);
        if (err)
            res.send(err);
        res.json(taskjson);
    });
};

exports.putJSONById = function (req, res) {
    console.log("put json");
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

exports.deleteJSONById = function (req, res) {
    console.log("delete json");
    TaskJson.remove({
        taskid: req.params.task_id
    }, function(err, taskdata) {
        if (err)
            res.send(err);

        res.json({ message: 'Successfully deleted task json!' });
    });
};

