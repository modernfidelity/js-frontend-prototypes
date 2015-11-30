/***
 *
 *  UVL Module
 *
 *  @file This component lists vehicle data from the backend via 'vdata.php'.
 *  Please note the pagination is provided by angularUtils.directives.dirPagination as replaces ng-repeat with
 *
 *
 * @todo : improve logging data
 *
 */

'use strict';

angular.module('project.uvl', ['ngRoute', 'ui.bootstrap', 'angularUtils.directives.dirPagination'])

    // Provide router info for component
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when('/uvl', {
            title: 'UVL',
            templateUrl: './site/components/uvl/uvl.html',
            controller: 'UvlController',
            controllerAs: 'vm'
        });

    }])

    // Setup data service function
    .service('UvlDataService', UvlDataService)

    // Setup controller function
    .controller('UvlController', UvlController)

    // Setup custom filter
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
UvlDataService.$inject = ['$http', '$httpParamSerializer', '$httpParamSerializerJQLike'];

// Component Controller
UvlController.$inject = ['UvlDataService'];

/**
 *
 * Data Service
 *
 * @param $http
 * @constructor
 */
function UvlDataService($http, $httpParamSerializer) {

    // Setup endpoint var with local cors proxy which maps to http://preowned.ferrari.com/vdata.php
    var listingsAPI = "http://mtk-api/vdata.php";

    // Function return
    return {
        getListingsData: getListingsData
    };

    /**
     *
     * Get Vehicle Data Service
     *
     * @returns {*}
     */
    function getVehicleData() {

        // Logger
        console.log("UvlDataService.getVehicleData");

        /**
         * Perform GET call against the (dummy) backend
         */
        return $http.get("http://www.omdbapi.com/?t=" + term + "&tomatoes=true&plot=full")
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
            console.log("complete called");
            return response.data;
        }

        /**
         *
         * Error with Data Return
         *
         * @param error
         */
        function dataFailed(error) {
            console.log('XHR Failed for getVehicleData.' + error.data);
        }
    }


    /**
     *
     * POST Search Query
     *
     * @returns {*}
     *
     */
    function getListingsData() {

        // Logger
        console.log("UvlDataService.getListingsData");

        // Setup for POST data query for endpoint (required format)
        var postData = {

            search: {
                "sumname": "filtered",
                "return": "list",
                "tree_type": "cl_lp-mo_bo-lp",
                "currency_locale": "",
                "distance_unit": "km",
                "currency": "EUR",
                "lang": "en_gb",
                "include_special_prices": "1",
                "equipment_meta_uncombined": "1",
                "project": {
                    "ids.vin": "",
                    "main_info.approved": "",
                    "main_info.make": "",
                    "main_info.reg_year": "",
                    "main_info.model": "",
                    "dealer.phone": "",
                    "dealer.email": "",
                    "dealer.name": "",
                    "translations.default.year_make_model": "",
                    "translations.default.price_formated": "",
                    "translations.default.colour_with_trim": "",
                    "translations.default.odometer": "",
                    "translations.default.interior": "",
                    "translations.default.colour": "",
                    "dealer.town": "",
                    "main_info.seo_url": "",
                    "main_info.price_special": "",
                    "images.count": "",
                    "images.list_430.img_1": "",
                    "images.list_430.img_2": "",
                    "dealer.dealer_url": "",
                    "dealer.cms_id": "",
                    "ids.oracle_id": ""
                }
                ,
                "order": [
                    "approved",
                    "priced"
                ],
                "market": [
                    "ferrari united kingdom"
                ],
                "hits": {
                    "to": 5000
                }
            }

        };


        /**
         *
         * Perform POST call against the backend
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
function UvlController(UvlDataService) {

    // Standard naming (view-model)
    var vm = this;

    vm.listings = [];
    vm.filteredlist = [];

    // Call main controller function
    activate();

    /**
     *
     * Main controller function (calls data services for listings)
     *
     * @returns {*}
     */
    function activate() {

        return getVehicleData().then(function () {
            console.log('Activated UVL View');
        });

    }


    /**
     *
     * Controller call to Data service (promises)
     *
     * @returns {Array}
     *
     */
    function getVehicleData() {

        // Optional additional return object (if ignoring normal bindings)
        var content = [];

        // Logger
        console.log("controller uvl data caller");

        // Call data service for listings
        content = UvlDataService.getListingsData()

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
     * Custom Pagination Helper
     * @param num
     */
    vm.setItemsPerPage = function (num) {

        console.log(num);

        vm.pageSize = num;
        vm.itemsPerPage = num;
        vm.currentPage = 1; //reset to first page
    }


};






