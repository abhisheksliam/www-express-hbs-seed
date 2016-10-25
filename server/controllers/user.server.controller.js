/**
 * Created by Shipra on 3/14/2016.
 */
'use strict';

const router = require('express').Router();
var http = require('http');
var Users     = require('./../models/app.server.models.user');

exports.updateUserDetails = function (req, res) {
    var user = new Users();
    user.username = req.params.user_name;
    user.profile.name = req.body.name;
    user.profile.email = req.body.email;

    Users.findOneAndUpdate({username: req.params.user_name}, {$set: {"profile.name" : user.profile.name, "profile.email" : user.profile.email}}, function(err, doc){
        if (err) {
            res.json({
                "errors": {
                    "errorMessage": err,
                    "errorCode": "PROCESSING_ERROR"
                }
            });
        }
        console.log(doc);
        res.json(doc);
    });
};

