/*
'use strict';
var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('connected');
});

exports.setCacheObject = function (key, data) {

    console.log('setting cache for ' + key);

    client.hmset('frameworks', {
        'javascript': 'AngularJS',
        'css': 'Bootstrap',
        'node': 'Express'
    });


    client.hmset(key , data);
    client.expire(key, 3600); // in seconds
};


exports.getCacheObject = function (key, done) {

    var _query = ( key == undefined || null ? '' : key.toString() );

    console.log('getting cache for ' + _query);

    client.hgetall(_query , function(err, object) {
        done(object);
    });
};
*/
