'use strict';

/**
 * Module dependencies
 */
var mapsPolicy = require('../policies/maps.server.policy'),
  maps = require('../controllers/maps.server.controller');

module.exports = function (app) {
  app.route('/api/maps/key')
    .get(maps.getKey);
};
