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
    'slick',
    'formly',
    'formlyBootstrap',
    'react',
    'project.frontpage',
    'project.news',
    'project.about',
    'project.contact',
    'project.search',
    'project.pre-owned',
    'project.uvl',
    'project.vdp',
    'project.react',
    'project.react-table',
    'project.api'
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
    .constant('API_URL', 'http://localhost:3000')

    // Move this to a service
    .run(['$rootScope', '$route', function ($rootScope, $route) {

        // Define RootScope vars
        $rootScope.noScroll = false;

        // Set PageTitle variable in global scope
        // @todo : convert to service (?)
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.pageTitle = current.$$route.title;
            console.log($rootScope.pageTitle);
        });

    }]);

