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





AboutController.$inject = ['$window', 'ApiDataService'];

/**
 *
 * About Controller
 *
 * @constructor
 *
 */
function AboutController($window, ApiDataService){


    var vm = this;

    var store = $window.localStorage;

    var content = JSON.parse(store.getItem('cmsdata'));

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
        vm.content = "Sorry there has been an error";
    }






}