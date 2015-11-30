/**
 *
 * SEARCH COMPONENT
 *
 * @file Provides a simple component collection for the site
 *
 */

'use strict';

// Add deps
angular.module('project.search', [
        'ngRoute',
    ])

    // Provide router info for component
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when('/search', {

            title: 'Ferrari search',
            templateUrl: './site/components/search/search.html',
            controller: 'SearchController',
            controllerAs: 'vm'

        });

    }])

    // Define controller function
    .controller('SearchController', SearchController);


/**
 *
 * Search Controller
 *
 * @constructor
 */
function SearchController() {

    // Define View Model for template
    var vm = this;

    //@todo... Integration with Elastic Search REST API + custom filters (?)

};




