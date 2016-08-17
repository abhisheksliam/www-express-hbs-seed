/**
 * Created by AbhishekK
 */
'use strict';

const router = require('express').Router();
var Xpath     = require('./../models/app.server.models.xpath');

/**
 *
 * @param req
 * @param res
 * @param next
 * sample:
 *
 {"app_type": "word",
    "tags": ["123.t1","234.t1"],
    "xpath": {
        "key": "home_button",
        "value": "//[name=home]"
    }
    }
 *
 */

exports.addXpath = function (req, res) {

    var xpath = new Xpath(req.body);

    xpath.save(function(err, xpathData) {
        if (err) {
            res.json({
                "errors": {
                    "errorMessage": err,
                    "errorCode": "PROCESSING_ERROR"
                }
            });
        }
        res.json(xpathData);
    });
};

exports.getXpaths = function (req, res) {

    Xpath.find(function(err, xpathData) {
        if (err) {
            res.json({
                "errors": {
                    "errorMessage": err,
                    "errorCode": "PROCESSING_ERROR"
                }
            });
        }
        res.json(xpathData);
    });

};

exports.getApplicationXpaths = function (req, res) {

};

exports.getApplicationXpathValue = function (req, res) {

};

exports.updateApplicationXpath = function (req, res) {

};
