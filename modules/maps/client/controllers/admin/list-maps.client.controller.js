(function () {
  'use strict';

  angular
    .module('maps.admin')
    .controller('mapsAdminListController', mapsAdminListController);

  mapsAdminListController.$inject = ['mapsService'];

  function mapsAdminListController(mapsService) {
    var vm = this;

  }
}());
