(function () {
  'use strict';

  angular
    .module('maps.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('maps', {
        abstract: true,
        url: '/maps',
        template: '<ui-view/>'
      })
      .state('maps.list', {
        url: '',
        templateUrl: '/modules/maps/client/views/list-maps.client.view.html',
        controller: 'mapsListController',
        controllerAs: 'vm'
      });
  }

}());
