/**
 *
 * VDP COMPONENT
 *
 * @file
 * Provides a simple page component for the site. It lists vehicle data from the backend via 'vdata.php'.
 * Please note the pagination is provided by angularUtils.directives.dirPagination as replaces ng-repeat with dir-pagination
 *
 * @todo : improve logging data + function naming (better noun / verbs etc)
 *
 */

'use strict';

angular.module('project.vdp', ['ngRoute', 'ui.bootstrap', 'angularUtils.directives.dirPagination'])

    // Provide router info for component
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        // Note the * wildcard formatting - as :variable
        $routeProvider.when('/vdp/:vin', {
            title: 'VDP',
            templateUrl: './site/components/vdp/vdp.html',
            controller: 'VdpController',
            controllerAs: 'vm'
        });

    }])

    // Define 'data' service function
    .service('VdpDataService', VdpDataService)

    // Define controller function
    .controller('VdpController', VdpController)

    // Add custom filter
    .filter('pagination', function () {
        return function (input, currentPage, pageSize) {
            if (angular.isArray(input)) {
                var start = (currentPage - 1) * pageSize;
                var end = currentPage * pageSize;
                return input.slice(start, end);
            }
        };
    });


// Component Data Service Dependency injection required items
VdpDataService.$inject = ['$http', '$httpParamSerializer', '$httpParamSerializerJQLike'];

// Component Controller
VdpController.$inject = ['VdpDataService', '$routeParams'];

/**
 *
 * Data Service
 *
 * @param $http
 * @constructor
 */
function VdpDataService($http, $httpParamSerializer) {

    // Load data (http://preowned.ferrari.com/vdata.php) from local cors proxy
    var listingsAPI = "http://mtk-api/vdata.php";

    // Function return
    return {
        getListingsData: getListingsData
    };

    /**
     *
     * POST Search Query
     *
     * @returns {*}
     *
     */
    function getListingsData(vin) {


        // Logger
        console.log("VdpDataService.getListingsData" + vin);

        // Setup POST data query
        var postData = {

            search: {
                "sumname": "filtered",
                "return": "list",
                "vin": [
                    vin
                ],
                "order": [
                    "approved",
                    "priced"
                ],
                "tree_type": "cl_lp-mo_bo-lp",
                "lang": "en_gb",
                "include_special_prices": "1",
                "equipment_meta_uncombined": "1",
                "hits": {
                    "to": 25
                }
            }

        };


        /**
         *
         * CALL POST Request against Data API
         */
        return $http({
            url: listingsAPI,
            method: "POST",

            data: $httpParamSerializer(postData),

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then(dataComplete)
            .catch(dataFailed);


        /**
         *
         * Successful Data Return
         *
         * @param response
         * @returns {*}
         */
        function dataComplete(response) {

            console.log("getListingsData -- complete called");
            console.log(response.data);

            return response.data;
        }

        /**
         *
         * Error with Data Return
         *
         * @param error
         */
        function dataFailed(error) {
            console.log('XHR Failed for getListingsData.' + error.data);
        }

    }

};


/**
 *
 * UVL Component Controller
 *
 * @param $http
 * @constructor
 */
function VdpController(VdpDataService, $routeParams) {

    // Standard naming (view-model)
    var vm = this;


    vm.id = $routeParams.vin;
    vm.listings = [];
    vm.filteredlist = [];

    // Call main controller function
    activate(vm.id);

    /**
     *
     * Main controller function to get data listings
     *
     * @returns {*}
     */
    function activate(vin) {

        return getVehicleData(vin).then(function () {
            console.log('Activated UVL View' + vin);
        });

    }


    /**
     *
     * Controller call to Data service (promises)
     *
     * @returns {Array}
     *
     */
    function getVehicleData(vin) {

        // Optional additional return object (if ignoring normal bindings)
        var content = [];

        // Logger
        console.log("controller uvl data caller vin=" + vin);

        // Call data service for listings
        content = VdpDataService.getListingsData(vin)

            .then(function (data) {

                console.log("controller uvl data received = " + data);

                vm.listings = data;

                return vm.listings;
            });

        return content;
    }

    // Set some VM template vars and debug
    vm.viewby = 3;
    vm.itemsPerPage = vm.viewby;
    vm.numPerPage = vm.itemsPerPage;
    vm.totalItems = 1000;
    vm.currentPage = 1;

    /**
     * Custom Pagination var Helper
     * @param pageNo
     */
    vm.setPage = function (pageNo) {
        vm.currentPage = pageNo;
    };

    /**
     * Custom Pagination log
     */
    vm.pageChanged = function () {
        console.log('Page changed to: ' + vm.currentPage);
    };

    /**
     * Custom Pagination Helpers
     * @param num
     */
    vm.setItemsPerPage = function (num) {

        console.log(num);

        vm.pageSize = num;
        vm.itemsPerPage = num;
        vm.currentPage = 1; //reset to first page
    }


};






