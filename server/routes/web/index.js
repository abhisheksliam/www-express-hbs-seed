/*
'use strict';
var express = require('express');
var loginController = require('../../controllers/login.server.controller');


var webrouter = express.Router();

webrouter.get('/', function(req, res) {
    if(req.isAuthenticated()){

        res.setHeader('Cache-control', ['no-cache','no-store','must-revalidate']);
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.render('index',{ username: req.user.username, name: req.user.profile.name });
    }else{
        logger.warn('request not authenticated');
        res.redirect('/login');
    }
});

webrouter.get('/login', function(req, res) {
    if(req.isAuthenticated()){

        res.redirect('/');
    }else{
        logger.warn('request not authenticated');
        res.setHeader('Cache-control', ['no-cache','no-store','must-revalidate']);
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.render('', {layout: 'login.hbs'});
    }
});

webrouter.post('/login', loginController.userLoginHandler);

webrouter.get('/logout', function(req, res){
    logger.info('logging out user.');
    req.session.destroy(function (err) {
        res.redirect('/login');
    });
});

module.exports = webrouter;
*/
