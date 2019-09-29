'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  config = require(path.resolve('./config/config'));

exports.getKey = function (req, res) {
  res.json({
    "map_key":config.map_key
  });
};