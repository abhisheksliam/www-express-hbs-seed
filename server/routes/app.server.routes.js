/**
 * Created by Shipra
 */

'use strict';

const passport = require('passport');
var scriptorController = require('../controllers/scriptor.server.controller');

module.exports = function (app) {

    /*
        Route definition
     */

    /*
    app.use('/api/', require('../controllers/user.server.controller'));*/

    app.get('/api/taskjson', scriptorController.getJSON);

    app.post('/api/taskjson', scriptorController.postJSON);

    app.get('/api/taskjson/:task_id', scriptorController.getJSONById);

    app.put('/api/taskjson/:task_id', scriptorController.putJSONById);

    app.delete('/api/taskjson/:task_id', scriptorController.deleteJSONById);






    /*app.use('/', function (req, res, next) {
        if (req.url === '/' || req.isAuthenticated()) {
            next();
        } else {
            res.status(401).send({
                message: 'User is not logged in'
            });
        }
    });*/

    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/login', function(req, res) {
        res.status(401).send({
            message: 'User is not logged in'
        });
    });

    app.post('/login',
        passport.authenticate('local', { successRedirect: '/',
            failureRedirect: '/login' }));




};



