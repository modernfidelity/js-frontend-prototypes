/**
 *
 * API Service
 *
 * @file API wrapper for the application
 *
 */



'use strict';

angular.module('API', [])

    // Define 'data' service function
    .service('ApiDataService', ApiDataService);


// Use Angular $inject to handle dependency injection into handler functions
ApiDataService.$inject = ['$http', 'API_URL', 'SITE_ID'];


/**
 *
 * API Data Service
 *
 * @constructor
 */
function ApiDataService($http, API_URL, SITE_ID) {


    console.log("Site ID == " + SITE_ID);

    var apiEndpoint = API_URL;

    return {

        getCmsData: getCmsData,
        getArticleData: getArticleData

    };



    /**
     *
     * Get (CMS) Site Data
     *
     * @returns {*}
     */
    function getCmsData() {

        // Logger
        console.log("API Call : getCmsData -> " + apiEndpoint);

        /**
         *  Run a data API call & return
         */
        return $http.get(apiEndpoint + "/site/" + SITE_ID,
            {cache: true}
            )
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
            //localStorage.setItem('cmsdata', response.data);
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

    /**
     *
     * Get Article Data
     *
     * @returns {*}
     */
    function getArticleData() {

        // Logger
        console.log("API Call : getArticleData");

        /**
         *  Run a data API call & return
         */
        return $http.get(listingsAPI + "",
            {cache: true}
            )
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