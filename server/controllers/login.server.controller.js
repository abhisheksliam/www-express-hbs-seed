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

    console.log(_v1);

    var options = {
        host: 'www.googleapis.com',
        path: _v1,
        method: 'get'
    };

    var callback = function(response) {
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
            var username = JSON.parse(str).email;
            getUserPassword(username, function(password){
                console.log(username);
                done({username:username, password: password});
            });
        });

        response.on('error', function(err) {
            console.error(err.stack);
            er();
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
    } else if (req.body.id_token !== null && req.body.id_token !== undefined){
        console.log('request authenticated google');
        req.body.username = 'test';
        req.body.password = 'test';

        googleLogin(req,
            function(_res){
                console.log('authenticating google user from db');
                req.body.username = _res.username;
                req.body.password = _res.password;
                passport.authenticate('local')(req, res, function () {
                    res.end();
                });
            },
            function(_error){
                console.log(_error);
                req.body.username = null;
                req.body.password = null;
                passport.authenticate('local')(req, res, function () {
                    res.end();
                });
            }
        )
    } else {
        console.log('authenticating username and password from db');
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    }
}
