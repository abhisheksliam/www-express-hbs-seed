/**
 * Created by Shipra on 3/14/2016.
 */
'use strict';

const router = require('express').Router();
var http = require('http');
var crypto = require('crypto');
var Users     = require('./../models/app.server.models.user');

exports.getUser = function (req, res) {
    Users.findOne({'username': req.params.user_name}, function(err, user) {
        if (err) {
            res.json({
                "errors": {
                    "errorMessage": err,
                    "errorCode": "PROCESSING_ERROR"
                }
            });
        }
        var decipher = crypto.createDecipher('aes256', 'password');
        user.profile.svn_credentials.password = decipher.update(user.profile.svn_credentials.password, 'hex', 'utf8') + decipher.final('utf8');
        res.json(user);
    });
};

exports.updateUserDetails = function (req, res) {
    var cipher = crypto.createCipher('aes256', 'password');
    var user = new Users();
    user.username = req.params.user_name;
    user.profile.name = req.body.name;
    user.profile.email = req.body.email;
    user.profile.svn_credentials = {};
    user.profile.svn_credentials.username = req.body.svnusername;
    user.profile.svn_credentials.password = cipher.update(req.body.svnpassword, 'utf8', 'hex') + cipher.final('hex');

    Users.findOneAndUpdate({username: req.params.user_name}, {$set: {"profile.name" : user.profile.name, "profile.email" : user.profile.email, "profile.svn_credentials.username" : user.profile.svn_credentials.username, "profile.svn_credentials.password" : user.profile.svn_credentials.password}}, function(err, doc){
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
