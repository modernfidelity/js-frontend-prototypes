/***
 *
 * APP JS
 *
 * @file
 *  This is the main application and bootstrap file. Routes are declared in the separate component items but referenced here.
 *  The source javascript also needs to be loaded via the html.
 *
 */


'use strict';

// Declare app level module which depends on views, and components
angular.module('project', [
    'ngRoute',
    'ngSanitize',
    'slick',
    'formly',
    'formlyBootstrap',
    'react',
    'mobile-menu',
    'project.frontpage',
    'project.news',
    'project.about',
    'project.contact',
    'project.search',
    'project.pre-owned',
    'project.uvl',
    'project.vdp',
    'project.react',
    //'project.react-table',
    'API'
]).

    // Add $locationProvider for HTML5 routes
    config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {

        // Use the HTML5 History API (removes # from the urls)
        //if (window.history && window.history.pushState) {
        //    $locationProvider.html5Mode(true);
        //}

        // For use with API auth
        //$httpProvider.interceptors.push('AuthInterceptor');

        $routeProvider
            .otherwise({
                redirectTo: '/frontpage'
            });

    }])

    // App constants (ref env vars)
    .constant('API_URL', 'http://localhost/motortrak/cms')
    .constant('SITE_ID', '1')

    .run(appRun);


// Inject Deps
appRun.$inject = ['$rootScope', '$location', 'ApiDataService'];

/**
 *
 * App RUN scope
 *
 * @param $rootScope
 * @param $location
 *
 */

function appRun($rootScope, $location, ApiDataService) {

    // @todo : REVIEW (?)
    var contentData = JSON.parse(localStorage.getItem('cmsdata'));

    console.log(contentData)


    if(!contentData){

        var cmsData = {};

        // Call the CMS and get content data
        ApiDataService.getCmsData()
            .then(function (response) {

                console.log("Calling the API for CMS DATA");

                localStorage.setItem('cmsdata', JSON.stringify(response));
                cmsData = response

            })
            .catch(function (error) {
                console.log("API CMS error");
            });

        console.log(cmsData);


    }




    // register listener to watch route changes
    $rootScope.$on("$routeChangeStart", function (event, next, current) {


        // Check token
        var token = localStorage.getItem('auth-token');

        if (next.access.requiresLogin == true) {

            //console.log("@RUN - " - token);

            if (!token) {
                console.log("REQUIRES Login + user has no JWT token...");
                event.preventDefault();
                $location.path("/login");
            }

        }

    });

}
