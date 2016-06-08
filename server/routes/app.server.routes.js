'use strict';

module.exports = function (app) {

    /*
        Route definition
     */
    /*app.use('/api/',
        require('../controllers/')
    );*/
   
    /*app.use('/', function (req, res, next) {
        if (req.url === '/' || req.isAuthenticated()) {
            next();
        } else {
            res.status(401).send({
                message: 'User is not logged in'
            });
        }
    });*/

    app.get('/', function(req, res) {
        res.render('index', {
            user: req.user || null,
            helpers: {
                json: function(context) {
                    return JSON.stringify(context);
                }
            }
        });
    });

};