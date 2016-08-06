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

apirouter.get('/taskjson', scriptorController.getJSON);

apirouter.post('/taskjson', scriptorController.postJSON);

apirouter.get('/taskjson/:task_id', scriptorController.getTaskScript);

apirouter.put('/taskjson/:task_id', scriptorController.putJSONById);

apirouter.delete('/taskjson/:task_id', scriptorController.deleteJSONById);

module.exports = apirouter;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}