/**
 *
 * ABOUT US COMPONENT
 *
 * @file Provides a simple page component for the site
 *
 */

'use strict';


angular.module('project.about', ['ngRoute'])

    // Provide router info for component
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when('/about', {
            title: 'About',
            templateUrl: './site/components/about/about.html',
            controller: 'AboutController',
            controllerAs: 'vm'
        });

    }])

    // Define controller function
    .controller('AboutController', AboutController);

/**
 *
 * About Controller
 *
 * @constructor
 *
 */
function AboutController(){

    var vm = this;

    vm.link = "This is set within the controller";

}