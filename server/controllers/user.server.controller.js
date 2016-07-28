/**
 * Created by Shipra on 3/14/2016.
 */
'use strict';

const router = require('express').Router();
var Users     = require('./../models/app.server.models.user');

module.exports = function() {

    // GET all json (using a GET at http://localhost:8080/users)
    router.get('/users', (req, res, next) => {
        Users.find(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

    return router;

}

