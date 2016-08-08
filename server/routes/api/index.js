// Get the router
var apirouter = require('express').Router();
var scriptorController = require('../../controllers/scriptor.server.controller');

// Middleware for all this apirouters requests
apirouter.use(function timeLog(req, res, next) {
  console.log('Request Received: ', dateDisplayed(Date.now()));
  next();
});

// Welcome message for a GET at http://localhost:8080/restapi
apirouter.get('/', function(req, res) {
    var rand = Math.random() * (9999999 - 9999) + 9999;
    res.writeHead(301,
        {Location: 'https://apiui.herokuapp.com?https://raw.githubusercontent.com/sim5runner/runner-v2/master/server/routes/api/docs/swagger.json&' + rand }
    );
    res.end();
});



apirouter.post('/tasks', scriptorController.saveTaskScript);

apirouter.get('/tasks/:task_id', scriptorController.getTaskScript);

apirouter.put('/tasks/:task_id', scriptorController.updateTaskScript);


apirouter.get('/tasks', scriptorController.getAllTasks);
apirouter.delete('/tasks/:task_id', scriptorController.deleteTaskScript);

module.exports = apirouter;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}