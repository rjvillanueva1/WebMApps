(function () {
  'use strict';

  angular
    .module('maps')
    .controller('mapsController', mapsController);

  mapsController.$inject = ['$scope', 'mapsResolve', 'Authentication'];

  function mapsController($scope, maps, Authentication) {
    var vm = this;

    vm.article = maps;
  }
}());
