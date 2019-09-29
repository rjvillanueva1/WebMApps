(function () {
  'use strict';

  angular
    .module('maps')
    .controller('mapsListController', mapsListController);

  mapsListController.$inject = ['mapsService','$scope','$http'];

  function mapsListController(mapsService,$scope,$http) {
    var vm = this;
    console.log('Hi');

    $http.get("http://localhost:3000/api/maps/key").then(
      function successCallback(response) {
        var map_key = response.data.map_key;

        $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=" + map_key;

      },
      function errorCallback(response) {
        console.log("Unable to perform get request");
      }
    );

    // $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAlXUoOWD63CQ9kueIBu_tQbKoY_U3vGmw";

  }
}());
