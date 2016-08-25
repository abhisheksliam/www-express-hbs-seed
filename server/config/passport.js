'use strict';

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var crypto = require('crypto');
var Users     = require('./../models/app.server.models.user');

var hashPassword = function(password, saltValue) {
    return crypto.pbkdf2Sync(password, saltValue, 10000, 64).toString('base64');
};

module.exports = function(passport) {

    // passport session setup
    // required for persistent login sessions
    // passport needs ability to serialize and deserialize users out of session

    // http://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize

    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
        Users.findOne({username: username}, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local',
        new LocalStrategy({
                passReqToCallback : true
            },
            function(req, username, password, done) {

                Users.findOne({username: username}, function(err, user) {

                    if (err || user === null) {return done(null, false)}

                    if (username === null) {
                        console.log('credentials not provided');
                        return done(null, false)
                    }

                    if(user.username !== username){
                        console.log('User Not Found with username '+username);
                        return done(null, false);
                    }

                    if(user.username === username && user.password !== password){
                        console.log('Incorrect password');
                        return done(null, false);
                    }

                    if(user.username === username && user.password === password){
                        console.log('Successfully authenticated ' + username);
                        return done(null, user);
                    }
                });

            }
    ));
};