var express = require('express');

// Get the router
var apirouter = express.Router();
var TaskJson     = require('./../../models/json');

// Middleware for all this apirouters requests
apirouter.use(function timeLog(req, res, next) {
  console.log('Request Received: ', dateDisplayed(Date.now()));
  next();
});

// Welcome message for a GET at http://localhost:8080/restapi
apirouter.get('/', function(req, res) {
    res.json({ message: 'Welcome to runner-v2 REST API',
               APIList: [
                    "GET all json (using a GET at http://localhost:8080/taskjson)",
                    "Create a taskjson (using POST at http://localhost:8080/taskjson)",
                    "GET taskjson with id (using a GET at http://localhost:8080/taskjson/:task_id)",
                    "Update taskjson with id (using a PUT at http://localhost:8080/taskjson/:task_id)",
                    "Delete taskjson with id (using a DELETE at http://localhost:8080/taskjson/:task_id)",
                    " **Replace http://localhost:8080 with server url"
               ]
    });
});

// GET all json (using a GET at http://localhost:8080/taskjson)
apirouter.route('/taskjson')
    .get(function(req, res) {
        TaskJson.find(function(err, taskjson) {
            if (err)
                res.send(err);
            res.json(taskjson);
        });
    });

// Create a taskjson (using POST at http://localhost:8080/taskjson)
apirouter.route('/taskjson')
    .post(function(req, res) {
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


apirouter.route('/taskjson/:task_id')
    // GET taskjson with id (using a GET at http://localhost:8080/taskjson/:task_id)
    .get(function(req, res) {
        TaskJson.find({taskid: req.params.task_id}, function(err, taskdata) {
            if (err)
                res.send(err);
            res.json(taskdata);
        });
    })

    // Update taskjson with id (using a PUT at http://localhost:8080/taskjson/:task_id)
    .put(function(req, res) {
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
    })

    // Delete taskjson with id (using a DELETE at http://localhost:8080/taskjson/:task_id)
    .delete(function(req, res) {
        TaskJson.remove({
        taskid: req.params.task_id
        }, function(err, taskdata) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted task json!' });
        });
    });

module.exports = apirouter;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}