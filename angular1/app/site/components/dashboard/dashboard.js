/**
 *
 * DASHBOARD COMPONENT
 *
 * @file
 * Provide the custom user dashboard for logged in users.
 *
 */

'use strict';

angular.module('project.dashboard', ['ngRoute', 'angular-jwt', 'ui.bootstrap'])

    // Define route
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            title: 'dashboard',
            templateUrl: './site/components/dashboard/dashboard.tpl.html',
            controller: 'DashboardController',
            controllerAs: 'vm',
            access: {
                requiresLogin: true,
                roles: ['dashboard', 'auth']
            }
        });
    }])

    // Define service
    .service('DashboardDataService', DashboardDataService)

    // Define controller
    .controller('DashboardController', DashboardController);

// Inject Deps
DashboardDataService.$inject = ['$http', '$window', 'API_URL', 'jwtHelper'];

// Inject Deps
DashboardController.$inject = ['DashboardDataService', 'API_URL', 'jwtHelper'];

/**
 *
 * Dashboard Data Service
 *
 * @param $http
 * @constructor
 *
 */
function DashboardDataService($http, $window, API_URL, jwtHelper) {

    // Check token
    var token = localStorage.getItem('aat-auth-token');

    // Get the User ID from the token
    if (token) {
        var tokenPayload = jwtHelper.decodeToken(token);
        var uuid = tokenPayload.uuid;

        console.log(uuid);
    }

    // Data service functions
    return {
        getDashboardData: getDashboardData
        //getUserData: getUserData
        //getUserQualData: getUserQualData
    };


    /**
     *
     * Get the current users & dashboard data from the API
     *
     * @returns {*}
     */
    function getDashboardData() {

        //console.log("DashboardDataService.getDashboardData -> " + uuid);

        return $http.get(API_URL + '/user/' + uuid)

            .then(dataComplete)
            .catch(dataFailed);

        /**
         *
         * Handle return success
         *
         * @param response
         * @returns {*}
         */
        function dataComplete(response) {

            console.log("complete called " + response);

            return response.data;
        }

        /**
         *
         * Handle return error
         *
         * @param error
         */
        function dataFailed(error) {
            console.log('XHR Failed for getDashboardData.' + error.data);
        }

    }


    /**
     *
     * Get listings data from the API
     *
     * @returns {*}
     */
    function getListingsData() {

        console.log("DashboardDataService.getListingsData");

        return $http.get(listingsAPI, {cache: true})
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


}


/**
 *
 * Dashboard Controller
 *
 * @param $http
 * @constructor
 */
function DashboardController(DashboardDataService, API_URL, jwtHelper) {

    var vm = this;

    vm.term = "dashboard data";
    vm.dashboard = [];
    vm.listings = [];


    // Call main controller
    activate();

    /**
     *
     * Main controller function
     *
     * @returns {*}
     */
    function activate() {

        return getDashboardData().then(function () {
            console.log('Activated dashboard View');
        });

    }


    /**
     *
     * Get data from the service for the dashboard
     *
     * @returns {Array}
     */
    function getDashboardData() {

        console.log("controller closure");

        var content = [];

        content = DashboardDataService.getDashboardData()

            .then(function (data) {

                vm.dashboard = data;

                console.log("controller dashboard data caller");

                return vm.dashboard;
            });


        return content;
    }


}

