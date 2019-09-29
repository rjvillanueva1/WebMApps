(function () {
  'use strict';

  angular
    .module('maps.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.maps', {
        abstract: true,
        url: '/maps',
        template: '<ui-view/>'
      })
      .state('admin.maps.list', {
        url: '',
        templateUrl: '/modules/maps/client/views/admin/list-maps.client.view.html',
        controller: 'mapsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      });
  }
  
}());
