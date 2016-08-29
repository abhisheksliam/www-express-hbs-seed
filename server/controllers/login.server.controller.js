/**
 * Created by AbhishekK on 8/26/2016.
 */

var Users = require('./../models/app.server.models.user');
const passport = require('passport');
var https = require('https');

var getUserPassword = function(username, callback){
    console.log('getting google user details from db');
    Users.findOne({username: username}, function(err, user) {
        if(user){
            callback(user.password);
        } else {
            // todo: create user validating compro email domain if does not exist
            callback(null);
        }
    });
};

var googleLogin = function (req,done,er) {

//    validate google login
    var _v1 = ('/oauth2/v3/tokeninfo?id_token=' + req.body.id_token);

    //console.log(_v1);

    var options = {
        host: 'www.googleapis.com',
        path: _v1,
        method: 'get'
    };

    var callback = function(response) {
        var str = '';
        response.on('data', function (chunk) {
            console.log('data');
            str += chunk;
            console.log(str);
            var username = JSON.parse(str).email;
            getUserPassword(username, function(password){
                console.log(username);
                done({username:username, password: password, error: (password === null)});
            });
        });

        response.on('error', function(err) {
            console.log('error');
            er({error: true});
        });

        response.on('end', function () {
            console.log('end');
        });
    };

    https.request(options, callback).end();

};

exports.userLoginHandler = function(req, res) {

    if(req.isAuthenticated()){
        console.log('request authenticated');
        res.redirect('/');
    }
    else if (req.body.id_token !== null && req.body.id_token !== undefined){
        console.log('request authenticated google');
        req.body.username = 'test';
        req.body.password = 'test';

        googleLogin(req,
            function(_res){
                console.log('authenticating google user from db');
                console.log(_res);
                if (_res.error === true) {
                    console.log('sending error 403');
                    return res.send({
                        status: 403,
                        message: 'Invalid User!'
                    });
                } else {
                    req.body.username = _res.username;
                    req.body.password = _res.password;
                    passport.authenticate('local')(req, res, function (err) {
                        return res.send({
                            status: err ? 403 : 200,
                            message: (err !== undefined && err !== null) ? err.message : 'Login successful'
                        });
                    });
                }
            },
            function(_error){
                console.log(_error);
                return res.send({
                    status: 403,
                    message: 'Error in google authentication!'
                });
            }
        )
    }
    else {
        console.log('authenticating username and password from db');
        passport.authenticate('local')(req, res, function (err) {
            return res.send({
                status: (err !== undefined && err !== null) ? 403 : 200,
                message: (err !== undefined && err !== null) ? err.message : 'Login successful'
            });
        });
    }
};
