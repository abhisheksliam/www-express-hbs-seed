'use strict';

var express = require('express');
const passport = require('passport');

// Get the router
var webrouter = express.Router();

webrouter.get('/', function(req, res) {
    res.render('index', {
        user: req.user || null,
        helpers: {
            json: function(context) {
                return JSON.stringify(context);
            }
        }
    });
});

webrouter.get('/login', function(req, res) {
    res.status(401).send({
        message: 'User is not logged in'
    });
});

webrouter.post('/login',
    passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login' }));

module.exports = webrouter;
