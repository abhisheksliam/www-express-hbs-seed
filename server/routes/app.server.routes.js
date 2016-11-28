'use strict';

var scriptorController = require('../controllers/scriptor.server.controller');
var userController = require('../controllers/user.server.controller');
var xpathController = require('../controllers/xpath.server.controller.js');
var loginController = require('../controllers/login.server.controller');
const passport = require('passport');

module.exports = function (app) {

    app.use('/', function (req, res, next) {
        if (req.url === '/' || req.url === '/api/login' || req.url === '/api/logout' || ((req.url.indexOf('/api/xpaths') !== -1) && (req.method === 'GET')) || req.isAuthenticated()) {
            next();
        } else {
            res.status(401).send({
                message: 'User is not logged in'
            });
        }
    });

    app.get('/', function (req, res) {

        res.render('index', (req.user !== undefined ? { username: req.user.username, name: req.user.profile.name } : null));

    });

    /*
     Route definition
     */
    app.post('/api/login', loginController.userLoginHandler);

    app.get('/api/logout', function(req, res){
        logger.info('logging out user.');
        req.session.destroy(function (err) {
            res.redirect('/');
        });
    });

    app.post('/api/tasks', scriptorController.saveTask);
    app.put('/api/tasks', scriptorController.updateTask);

    app.get('/api/tasks/:task_id', scriptorController.getTaskScript);
    app.put('/api/tasks/:task_id', scriptorController.updateTaskScript);

    app.get('/api/tasks', scriptorController.getAllTasks);
    app.delete('/api/tasks/:task_id', scriptorController.deleteTaskScript);

    // get all xpath
    app.get('/api/xpaths', xpathController.getXpaths);

// get xpath for app_type
    app.get('/api/xpaths/:app_type', xpathController.getApplicationXpaths);

// get xpath: by key + app_type
    app.get('/api/xpaths/:app_type/:xpath_key', xpathController.getApplicationXpathValue);

    app.post('/api/xpaths', xpathController.addXpath);

// update xpath: update xpath value + add task_id tag (no duplicates)
    app.put('/api/xpaths/:app_type/:xpath_key', function(){});

// tagged xpath for a task, may not return all the xpaths of the task
    app.get('/api/xpaths/task/tagged/:task_id', xpathController.getTaskXpaths);

// get user details
    app.get('/api/users/:user_name', userController.getUser);

// update user details
    app.put('/api/users/:user_name', userController.updateUserDetails);

};
