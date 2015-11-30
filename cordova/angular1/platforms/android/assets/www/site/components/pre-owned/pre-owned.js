/**
 *
 * PRE-OWNED COMPONENT
 *
 * @file Provides a simple page component for the site
 *
 */

'use strict';


angular.module('project.pre-owned', ['ngRoute'])

    // Provide router info for component
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when('/pre-owned', {

            title: 'Preowned',
            templateUrl: './site/components/pre-owned/pre-owned.html',
            controller: 'PreownedController',
            controllerAs: 'vm'

        });

    }])

    //
    .service('PreownedDataService', PreownedDataService)

    // Define controller
    .controller('PreownedController', PreownedController);

PreownedDataService.$inject = ['$http'];

PreownedController.$inject = ['PreownedDataService'];

/**
 *
 * Data Service
 *
 * @param $http
 * @constructor
 */
function PreownedDataService($http) {

    //var listingsAPI = "http://localhost:8000/vdata.php?search={%22market%22%3A[%22land+rover+australia%22]%2C%22return%22%3A%22list%22}";
    var listingsAPI = "http://localhost:1337/www.romano.mercedesdealer.com/cgi-bin/mbusa/mbhlnew.cgi?format=json&franchisefirst=1&photocars=&dealer=80398&country2=US&request=used&mileagefrom=0&sortby=yeardesc&yearto=9999&labels=1";

    var term = "Sherlock Holmes";

    return {
        getVehicleData: getVehicleData,
        getNewsRelatedData: getNewsRelatedData,
        getListingsData: getListingsData
    };


    function getVehicleData() {


        console.log("PreownedDataService.getVehicleData");

        return $http.get("http://www.omdbapi.com/?t=" + term + "&tomatoes=true&plot=full")
            .then(dataComplete)
            .catch(dataFailed);

        function dataComplete(response) {
            console.log("complete called");
            return response.data;
        }

        function dataFailed(error) {
            console.log('XHR Failed for getVehicleData.' + error.data);
        }
    }

    function getNewsRelatedData() {

        console.log("PreownedDataService.getVehicleData");

        return $http.get("http://www.omdbapi.com/?t=" + term + "&tomatoes=true&plot=full")
            .then(dataComplete)
            .catch(dataFailed);

        function dataComplete(response) {
            console.log("complete called");
            return response.data;
        }

        function dataFailed(error) {
            console.log('XHR Failed for getNewsRelatedData.' + error.data);
        }
    }

    function getListingsData() {

        console.log("PreownedDataService.getListingsData");

        return $http.get(listingsAPI, { cache: true })
            .then(dataComplete)
            .catch(dataFailed);

        function dataComplete(response) {
            console.log("complete called");
            return response.data;
        }

        function dataFailed(error) {
            console.log('XHR Failed for getListingsData.' + error.data);
        }
    }





};


/**
 *
 * Pre-owned Controller
 *
 * @param $http
 * @constructor
 */
function PreownedController(PreownedDataService) {

    var vm = this;

    vm.term = "Pre-owned data";

    vm.news = [];

    vm.listings = [];



    activate();

    function activate() {

        return getVehicleData().then(function () {
            console.log('Activated Preowned View');
        });

    }


    function getVehicleData() {



        var content = [];

        content = PreownedDataService.getListingsData()

            .then(function (data) {

                vm.listings = data;

                console.log("controller news data caller");

                return vm.listings;
            });


        return content;
    }


};






