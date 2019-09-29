(function () {
  'use strict';

  angular
    .module('maps')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Maps',
      state: 'maps',
      // type: 'dropdown',
      roles: ['*']
    });

    // // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'maps', {
    //   title: 'List maps',
    //   state: 'maps.list',
    //   roles: ['*']
    // });
  }
}());
