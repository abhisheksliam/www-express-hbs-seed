'use strict';

// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var crypto = require('crypto');

var hashPassword = function(password, saltValue) {
    return crypto.pbkdf2Sync(password, saltValue, 10000, 64).toString('base64');
};

var users = {
"id" : 1,
"username" : "comproqa",
"password" : "password"
};

module.exports = function(passport) {

    // passport session setup
    // required for persistent login sessions
    // passport needs ability to serialize and deserialize users out of session

    passport.serializeUser(function(user, done) {
        console.log('serializing user:',users.username);
        //return the unique id for the user
        return done(null, users.id);
    });

    //Desieralize user will call with the unique id provided by serializeuser
    passport.deserializeUser(function(id, done) {
        // Find user by id
        return done(null, users);
    });

    passport.use('local',
        new LocalStrategy({
                passReqToCallback : true
            },
            function(req, username, password, done) {
                console.log('Authenticating user using passport local strategy' ,  username);

                if (username === null) {
                    console.log('credentials not provided');
                    return done(null, false)
                }

                if(users.username !== username){
                    console.log('User Not Found with username '+username);
                    return done(null, false);
                }

                if(users.username === username){
                    console.log('Successfully authenticated');
                    return done(null, users);
                }

            }
    ));
};