/**
 *
 * NEWS COMPONENT
 *
 * @file Provides a simple page component for the site
 *
 */

'use strict';

angular.module('project.news', ['ngRoute'])

    // Provide router info for component
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/news', {
            title: 'News',
            templateUrl: './site/components/news/news.html',
            controller: 'NewsController',
            controllerAs: 'vm'
        });
    }])

    // Define 'data' service function
    .service('NewsDataService', NewsDataService)

    // Define controller function
    .controller('NewsController', NewsController);


// Use Angular $inject to handle dependency injection into handler functions
NewsDataService.$inject = ['$http'];

NewsController.$inject = ['NewsDataService'];

/**
 *
 * News Data Service
 *
 * @param $http
 * @constructor
 *
 */
function NewsDataService($http) {

    // @todo : add this to app config var in main module & inject constant
    var listingsAPI = "http://localhost:1337/www.romano.mercedesdealer.com/cgi-bin/mbusa/mbhlnew.cgi?format=json&franchisefirst=1&photocars=&dealer=80398&country2=US&request=used&mileagefrom=0&sortby=yeardesc&yearto=9999&labels=1";


    // Function returns
    return {
        getNewsData: getNewsData,
        getNewsRelatedData: getNewsRelatedData,
        getListingsData: getListingsData
    };


    /**
     *
     * Get News Data
     *
     * @returns {*}
     */
    function getNewsData() {

        // Logger
        console.log("NewsDataService.getNewsData");

        /**
         *  Run a data API call
         */
        return $http.get("http://www.omdbapi.com/?t=" + term + "&tomatoes=true&plot=full")
            .then(dataComplete)
            .catch(dataFailed);

        /**
         *
         * onSuccess callback of HTTP GET
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
         * onError callback
         *
         * @param error
         */
        function dataFailed(error) {
            console.log('XHR Failed for getNewsData.' + error.data);
        }
    }

    /**
     *
     * Get News Related Data
     *
     * @returns {*}
     */
    function getNewsRelatedData() {

        // Logger
        console.log("NewsDataService.getNewsData");

        /**
         *  Run a data API call & return
         */
        return $http.get("http://www.omdbapi.com/?t=" + term + "&tomatoes=true&plot=full")
            .then(dataComplete)
            .catch(dataFailed);

        /**
         *
         * onSuccess callback of HTTP GET
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
         * onError callback
         *
         * @param error
         */
        function dataFailed(error) {
            console.log('XHR Failed for getNewsRelatedData.' + error.data);
        }
    }

    /**
     *
     * Get Listings Data
     *
     * @returns {*}
     */
    function getListingsData() {

        // Logger
        console.log("NewsDataService.getListingsData");

        /**
         *  Run a data API call & return
         */
        return $http.get(listingsAPI, {cache: true})
            .then(dataComplete)
            .catch(dataFailed);

        /**
         *
         * onSuccess callback of HTTP GET
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
         * onError callback
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
 * News Controller
 *
 * @param NewsDataService
 * @constructor
 *
 */
function NewsController(NewsDataService) {

    // Define View Model for template
    var vm = this;

    vm.term = "News data";

    vm.news = [];

    vm.listings = [];

    // Simpler - @todo : improve only log based on ENV_VAR || remove
    console.log("news controller");

    // Call main controller function
    activate();

    /**
     *
     * Main controller function
     *
     * @returns {*}
     */
    function activate() {

        /**
         * Call the data service chain
         */
        return getNewsData().then(function () {
            console.log('Activated News View');
        });

    }

    /**
     *
     * Get News Data from the Data Service
     *
     * @returns {Array}
     */
    function getNewsData() {

        console.log("controller closure");

        var content = [];

        // Populate the VM object with returned API data
        content = NewsDataService.getListingsData()

            .then(function (data) {

                vm.listings = data;

                console.log("controller news data caller");

                return vm.listings;
            });


        return content;
    }


};

