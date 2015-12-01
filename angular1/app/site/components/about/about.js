/**
 *
 * ABOUT US COMPONENT
 *
 * @file Provides a simple page component for the site
 *
 */

'use strict';


angular.module('project.about', ['ngRoute', 'API'])

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


// Define injectables for the services
AboutController.$inject = ['$window', 'ApiDataService', 'LOCALSTORAGE_TOKEN_ID'];

/**
 *
 * About Controller
 *
 * @constructor
 *
 */
function AboutController($window, ApiDataService, LOCALSTORAGE_TOKEN_ID){


    var vm = this;

    var store = $window.localStorage;

    var content = JSON.parse(store.getItem(LOCALSTORAGE_TOKEN_ID));

    //var cmsData = {};

    //// Call the CMS and get content data
    //ApiDataService.getCmsData()
    //    .then(function (response) {
    //
    //        console.log("Calling the API for CMS DATA");
    //        vm.live_content = response
    //
    //    })
    //    .catch(function (error) {
    //        console.log("API CMS error");
    //    });

    if(content){
        vm.content = content;
    }else {

         // @todo : CALL API thru data service

        vm.content = "Sorry there has been an error";
    }






}