'use strict';
var express = require('express');
var loginController = require('../../controllers/login.server.controller');

// Get the router
var webrouter = express.Router();

webrouter.get('/', function(req, res) {
    if(req.isAuthenticated()){
        console.log('request authenticated');
        res.render('index',{ username: req.user.username });
    }else{
        console.log('request not authenticated');
        //next(new Error(401)); // 401 Not Authorized
        res.writeHead(301,
            {Location: './login.html' }
        );
        res.end();
    }
});

webrouter.post('/login', loginController.userLoginHandler);

webrouter.get('/logout', function(req, res){
    console.log('logging out');
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});

module.exports = webrouter;
