/**
 *
 * API Service
 *
 * @file
 * API wrapper and data integration tool for the application
 *
 * @todo :
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

    // Setup vars
    console.log("Site ID == " + SITE_ID);

    var apiEndpoint = API_URL;


    // 'Methods' available from the service
    return {

        // CORE DATA
        getCmsData: getCmsData,

        // SECTION DATA
        getArticleData: getArticleData,
        getNewsData: getNewsData,
        getEventData: getEventData


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
     * @param tags
     * @returns {*}
     */
    function getArticleData(tags) {

        // Logger
        console.log("API Call : getArticleData");

        /**
         *  Run a data API call & return
         */
        return $http.get(apiEndpoint + "/articles/" + SITE_ID,
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


    /**
     *
     * Get News Data
     *
     * @returns {*}
     */
    function getNewsData() {

        // Logger
        console.log("API Call : getCmsData -> " + apiEndpoint);

        /**
         *  Run a data API call & return
         */
        //return $http.get(apiEndpoint + "/news",

        return $http.get(apiEndpoint + "/site/" + SITE_ID + "/news",
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
            console.log("getNewsData - complete called");
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
     * Get Event Data
     *
     * @returns {*}
     */
    function getEventData() {

        // Logger
        console.log("API Call : getEventData -> " + apiEndpoint);

        /**
         *  Run a data API call & return
         */
        return $http.get(apiEndpoint + "/events",
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
            console.log("complete called getEventData");
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
            console.log('XHR Failed for getEventData.' + error.data);
        }

    }


}