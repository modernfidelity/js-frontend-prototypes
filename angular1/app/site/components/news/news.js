/**
 *
 * NEWS COMPONENT
 *
 * @file Provides a simple page component for the site
 *
 *
 */

'use strict';

angular.module('project.news', ['ngRoute', 'API'])

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
NewsDataService.$inject = ['$http', 'ApiDataService', 'LOCALSTORAGE_TOKEN_ID'];

NewsController.$inject = ['NewsDataService', 'LOCALSTORAGE_TOKEN_ID'];

/**
 *
 * News Data Service
 *
 * @param $http
 * @constructor
 *
 */
function NewsDataService($http, ApiDataService, LOCALSTORAGE_TOKEN_ID) {

    // Function returns
    return {
        getNewsData: getNewsData
        //getListingsData: getListingsData
    };


    /**
     *
     * Get News Data from API
     *
     * @returns {*}
     */
    function getNewsData() {


        var newsToken = LOCALSTORAGE_TOKEN_ID + "_news";


        /**
         *  Run a data API call & return
         */
        return ApiDataService.getNewsData()
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

            var expireTimeInSeconds = 120;

            //return {
            //    set: function(key, value, expireTimeInSeconds) {
            //        return localforage.setItem(key, {
            //            data: value,
            //            timestamp: new Date().getTime(),
            //            expireTimeInMilliseconds: expireTimeInSeconds * 1000
            //        })
            //    },
            //    get: function(key) {
            //        return localforage.getItem(key).then(function(item) {
            //            if(!item || new Date().getTime() > (item.timestamp + item.expireTimeInMilliseconds)) {
            //                return null
            //            } else {
            //                return item.data
            //            }
            //        })
            //    }
            //}

            // Write a cache in localstorage & then return the response with expires.
            localStorage.setItem(newsToken, JSON.stringify({
                data: response,
                timestamp: new Date().getTime(),
                expireTimeInMilliseconds: expireTimeInSeconds * 1000
            }));


            //JSON.stringify(response),

            return response;
        }

        /**
         *
         * onError callback
         *
         * @param error
         */
        function dataFailed(error) {
            console.log('XHR Failed for getNewData API.' + error.data);
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


}


/**
 *
 * News Controller
 *
 * @param NewsDataService
 * @constructor
 *
 */
function NewsController(NewsDataService, LOCALSTORAGE_TOKEN_ID) {

    // Define View Model for template
    var vm = this;

    vm.listings = [];

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
        //return getNewsData().then(function () {
        //    console.log('Activated News View');
        //});

        return getNewsData();

    }

    /**
     *
     * Get News Data from the Data Service or localstorage if set
     *
     * @returns {Array}
     */
    function getNewsData() {

        var newsToken = LOCALSTORAGE_TOKEN_ID + "_news";

        // See if content api token has been set
        var localContentData = JSON.parse(localStorage.getItem(newsToken));

        // If expired of not set call API
        if (!localContentData || new Date().getTime() > (localContentData.timestamp + localContentData.expireTimeInMilliseconds)) {

            var content = [];

            // Populate the VM object with returned API data
            content = NewsDataService.getNewsData()
                .then(function (data) {

                    vm.listings = data;

                    console.log("NEWS DATA ->> " + data);

                    return vm.listings;

                });


            return content;

        } else {

            var storageExpireTime = localContentData.timestamp + localContentData.expireTimeInMilliseconds;
            var timeNow = new Date().getTime();

            // TEST Timings
            console.log("TTL " + (storageExpireTime - timeNow));

            return vm.listings = localContentData.data;

        }


    }


}

