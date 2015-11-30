/***
 *
 * AUTH COMPONENT
 *
 * @file
 *  Provides user auth functionality for the site for use with login/logout//tokens & forms components
 *
 *
 */

'use strict';

angular.module('project.auth', ['angular-jwt', 'project.user'])


    .service('AuthTokenService', AuthTokenService);


// Inject Deps
AuthTokenService.$inject = ['$window', 'UserService'];


/**
 *
 * Auth Token Service
 *
 * @param $window
 * @returns {{getToken: getToken, setToken: setToken}}
 * @constructor
 *
 *
 */
function AuthTokenService($window, UserService, auth) {


    console.log("AuthTokenService");

    var authStatus = false;
    var store = $window.localStorage;
    var key = 'aat-auth-token';

    return {
        tokenStatus: tokenStatus,
        getToken: getToken,
        setToken: setToken,
        authStatus: authStatus

    };


    /**
     *
     * Get the stored local token
     *
     */
    function tokenStatus() {

        var token = store.getItem(key);

        if (token) {
            return true;
        } else {
            return false;
        }


    }

    /**
     *
     * Get the stored local token
     *
     */
    function getToken() {

        var token = store.getItem(key);

        if (token) {
            return token;
        } else {
            return false;
        }


    }


    /**
     *
     * Set the stored local token
     *
     * @param token
     */
    function setToken(token) {

        console.log("setToken called");

        if (token) {


            // Set user object + profile in localstorage
            UserService.setUser(token);

            //UserService.user.auth = true;

            // Store JWT in localstorage
            store.setItem(key, token);

        } else {
            store.removeItem(key);
        }
    }


}
