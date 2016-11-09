/**
 * Created by Shipra on 3/14/2016.
 */
'use strict';

const router = require('express').Router();
var http = require('http');
var crypto = require('crypto');
var Users     = require('./../models/app.server.models.user');

var hashPassword = function(password, saltValue) {
    return crypto.pbkdf2Sync(password, saltValue, 1000, 64).toString('hex');
};

exports.getUser = function (req, res) {
    Users.findOne({'username': req.params.user_name}, function(err, user) {
        if (err) {
            logger.error("Error in getting user profile: " +err);
            res.json({
                "errors": {
                    "errorMessage": err,
                    "errorCode": "PROCESSING_ERROR"
                }
            });
        }

        try {
            var decipher = crypto.createDecipher('aes256', 'password');
            user.profile.svn_credentials.password = decipher.update(user.profile.svn_credentials.password, 'hex', 'utf8') + decipher.final('utf8');
        } catch(err) {
            logger.error('Error occured while decrypt svn password: ' + err);
        }

        user.password = undefined;
        user.salt = undefined;
        
        res.json(user);
    });
};

exports.updateUserDetails = function (req, res) {
    logger.info('Getting User Profile');

    Users.findOne({username: req.params.user_name}, function(err, user) {
        if (err) {
            logger.error("Error in getting user profile: " +err);

            res.json({
                "errors": {
                    "errorMessage": err,
                    "errorCode": "PROCESSING_ERROR"
                }
            });
        }

        if (req.body.password !== undefined) {
            user.password = hashPassword(req.body.password, user.salt);
        }

        user.profile.name = req.body.name;
        user.profile.email = req.body.email;
        user.profile.svn_credentials = {};
        user.profile.svn_credentials.username = req.body.svnusername;

        try {
            var cipher = crypto.createCipher('aes256', 'password');
            var ciph = cipher.update(req.body.svnpassword, 'utf8', 'hex');
            ciph += cipher.final('hex');
            user.profile.svn_credentials.password = ciph;
        } catch(err) {
            logger.error('Error occured while encrypt svn password: ' + err);
            user.profile.svn_credentials.password = req.body.svnpassword;
        }

        logger.info('Saving User Profile');

        user.save().then(function () {

            logger.info('User Profile updated successfully');
            res.json(user);

        }, function(err) {

            logger.error("Error in updating user profile: " +err);
            res.json({
                "errors": {
                    "errorMessage": err,
                    "errorCode": "PROCESSING_ERROR"
                }
            });
        })

    });

};
