'use strict';

var express = require('express');
const passport = require('passport');

// Get the router
var webrouter = express.Router();

webrouter.get('/', function(req, res) {
    if(req.isAuthenticated()){
        res.render('index');
    }else{
        //next(new Error(401)); // 401 Not Authorized
        res.writeHead(301,
            {Location: './login.html' }
        );
        res.end();
    }
});

webrouter.post('/login',
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/' })
);

webrouter.get('/logout', function(req, res){
    console.log('logging out');
    req.logout();
    res.redirect('/');
});

module.exports = webrouter;
