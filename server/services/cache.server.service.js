'use strict';
var redis = require('redis');
var portscanner = require('portscanner');
var client;

var redisConnected = false;

// Checks the status of a single port - for redis
portscanner.checkPortStatus(6379, '127.0.0.1', function(error, status) {
    // Status is 'open' if currently in use or 'closed' if available
    if (status == 'open') {
        try{
            var client = redis.createClient();

            client.on('connect', function() {

                redisConnected = true;
                logger.info('Redis Connected');
            });

        }catch(er){
            logger.error("Redis error" + er);
        }
    } else {
        logger.error("Redis server not started on '127.0.0.1:6379'.");
        logger.warn("Fallback to fetch cache data from database.");
    }
});

exports.setCacheObject = function (key, data) {
    if (redisConnected) {
        logger.info('setting cache for ' + key);

        client.set(key , data);
        client.expire(key, 3600); // in seconds
    }
};


exports.getCacheObject = function (key, done) {
    if (redisConnected) {
        var _query = ( key == undefined || null ? '' : key );

        logger.info('getting cache for ' + _query);

        client.get(_query , function(err, object) {

            if(object) {
                done(JSON.parse(object));
            } else {
                done(object);
            }
        });
    } else {
        done(null);
    }
};
