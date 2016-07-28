/**
 * Created by Shipra on 3/14/2016.
 */
'use strict';

const router = require('express').Router();
var TaskJson     = require('./../models/app.server.models.script');

module.exports = function() {

    // GET all json (using a GET at http://localhost:8080/taskjson)
    router.get('/taskjson', (req, res, next) => {
        TaskJson.find(function(err, taskjson) {
            if (err)
                res.send(err);
            res.json(taskjson);
        });
    });

    // Create a taskjson (using POST at http://localhost:8080/taskjson)
    router.post('/taskjson', (req, res, next) => {
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
    });


    // GET taskjson with id (using a GET at http://localhost:8080/taskjson/:task_id)
    router.get('/taskjson/:task_id', (req, res, next) => {
        TaskJson.find({taskid: req.params.task_id}, function(err, taskdata) {
            if (err)
                res.send(err);
            res.json(taskdata);
        });
    });

    // GET taskjson with id (using a GET at http://localhost:8080/taskjson/:task_id)
    router.put('/taskjson/:task_id', (req, res, next) => {
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
    });

    // GET taskjson with id (using a GET at http://localhost:8080/taskjson/:task_id)
    router.delete('/taskjson/:task_id', (req, res, next) => {
        TaskJson.remove({
            taskid: req.params.task_id
        }, function(err, taskdata) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted task json!' });
        });
    });


    return router;

}

