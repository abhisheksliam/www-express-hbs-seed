// Get the router
var apirouter = require('express').Router();
var scriptorController = require('../../controllers/scriptor.server.controller');
var userController = require('../../controllers/user.server.controller');
var xpathController = require('../../controllers/xpath.server.controller');
//var loginController = require('../../controllers/login.server.controller');
const passport = require('passport');

// Middleware for all this apirouters requests
apirouter.use(function timeLog(req, res, next) {
  logger.info('Request Received: ', dateDisplayed(Date.now()));
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

apirouter.post('/login', function(req, res){
    logger.info('logging in user.');
    console.log('Authenticating username and password from Database');
    passport.authenticate('local', function(err, user, info) {
    //passport.authenticate('local')(req, res, function (err, user) {
        try {

            console.log('In callback',err, user, info); /*, res.req.IncomingMessage.connection.client.sessionStore.user*/
            /*if (err || !user) {
                res.status(400).send({
                    message: 'Oops! The credentials provided are not valid.'
                });
            } else {
*/
                req.login(user, function (err) {
                   /* if (err) {
                        res.status(400).send(err);
                    } else {*/
                        res.json(user);
                    //}
                });
          //  }
        } catch (er) {
            console.log(er);
        }
    })(req, res);
});

apirouter.get('/logout', function(req, res){
    logger.info('logging out user.');
    req.session.destroy(function (err) {
        res.redirect('/login');
    });
});


apirouter.post('/tasks', scriptorController.saveTask);
apirouter.put('/tasks', scriptorController.updateTask);

apirouter.get('/tasks/:task_id', scriptorController.getTaskScript);
apirouter.put('/tasks/:task_id', scriptorController.updateTaskScript);

apirouter.get('/tasks', scriptorController.getAllTasks);
apirouter.delete('/tasks/:task_id', scriptorController.deleteTaskScript);

/**
 * api for xpath functionality
 *
 * xpath are unique at application level, different applications can have xpath with same key
 * user is restricted to update / delete key of existing xpath
 * user is able to update value of xpath with notification on basis of taskid tags
 */

// add xpath: error on existing xpath key for app
apirouter.post('/xpaths', xpathController.addXpath);

// update xpath: update xpath value + add task_id tag (no duplicates)
apirouter.put('/xpaths/:app_type/:xpath_key', function(){});

// tagged xpath for a task, may not return all the xpaths of the task
apirouter.get('/xpaths/task/tagged/:task_id', xpathController.getTaskXpaths);

// get user details
apirouter.get('/users/:user_name', userController.getUser);

// update user details
apirouter.put('/users/:user_name', userController.updateUserDetails);

module.exports = apirouter;

function dateDisplayed(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}