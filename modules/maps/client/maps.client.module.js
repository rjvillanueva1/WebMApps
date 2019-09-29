(function (app) {
  'use strict';

  app.registerModule('maps', ['core','ngMap']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('maps.admin', ['core.admin']);
  app.registerModule('maps.admin.routes', ['core.admin.routes']);
  app.registerModule('maps.services');
  app.registerModule('maps.routes', ['ui.router', 'core.routes', 'maps.services']);
}(ApplicationConfiguration));
