(function () {
  'use strict';

  // Configuring the maps Admin module
  angular
    .module('maps.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage maps',
      state: 'admin.maps.list'
    });
  }
}());
