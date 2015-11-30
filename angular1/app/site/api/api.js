/**
 *
 * API Service
 *
 * @file API wrapper for the application
 *
 */

angular.module('project.api', [])

    .service('API', ["$http",  function ($http) {

        var searchEndpoint = '/api/Vehicles';

        var vehiclesEndpoint = '/api/Vehicles';

        /**
         *
         * Perform Search
         *
         * @param term
         * @returns {*}
         */

        this.doSearch = function (term) {

            var route = 'search';
            var args = {
                term: term,

            };

            return $http.get(searchEndpoint).then(function (response) {
                return response.data;
            });
        };



        /**
         *
         * Get Vehicles List
         *
         * @returns {HttpPromise}
         */

        this.getVehicles = function () {
            return $http.get(vehiclesEndpoint);
        };


        /**
         *
         * Get Vehicle Detail
         *
         * @param id
         * @returns {HttpPromise}
         */

        this.getVehicle = function (id) {
            return $http.get(vehiclesEndpoint + '/' + id);
        };


        /**
         *
         * Get Movie Detail
         *
         * @param term
         * @returns {{}}
         */
        this.fetchMovie = function (term) {

            var data = {};

            $http.get("http://www.omdbapi.com/?t=" + term + "&tomatoes=true&plot=full")
                .success(function(response) {
                    data.details = response;
                });

            $http.get("http://www.omdbapi.com/?s=" + term)
                .success(function(response) {
                    data.related = response;
                });


            return data;

        }



    }]);
