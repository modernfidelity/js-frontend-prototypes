/**
 *
 * FRONTPAGE COMPONENT
 *
 * @file Provides a simple page component for the site
 *
 */

'use strict';

angular.module('project.frontpage', ['ngRoute'])

    // Provide router info for component
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when('/frontpage', {

            title: 'Frontpage',
            templateUrl: './site/components/frontpage/frontpage.html',
            controller: 'FrontpageController',
            controllerAs: 'vm'

        });

    }])

    // Define controller function
    .controller('FrontpageController', FrontpageController);

/**
 *
 * Frontpage Controller
 *
 * @constructor
 *
 */
function FrontpageController() {

    // Define the View Model variable for templating.
    var vm = this;

    vm.link = "This is set within the controller";

}



