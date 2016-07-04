'use strict';

var express = require('express');
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

module.exports = webrouter;
