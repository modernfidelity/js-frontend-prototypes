/**
 *
 * CONTACT COMPONENT
 *
 * @file Provides a simple page component for the site
 *
 */

'use strict';

angular.module('project.contact', ['ngRoute', 'formly', 'formlyBootstrap'])

    // Provide router info for component
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

        $routeProvider.when('/contact', {
            title: 'Ferrari contact',
            templateUrl: './site/components/contact/contact.html',
            controller: 'ContactController',
            controllerAs: 'vm'
        });

    }])

    // Define controller function
    .controller('ContactController', ContactController);


/**
 *
 * About Controller
 *
 * @constructor
 *
 */
function ContactController() {

    // Define the View Model variable for templating.
    var vm = this;

    vm.user = {};

    vm.onSubmit = onSubmit;

    vm.env = {
        angularVersion: angular.version.full
        //formlyVersion: formlyVersion
    };

    vm.model = {};
    vm.options = {};


    // @see - http://docs.angular-formly.com/v6.4.0/docs/custom-templates
    // This doc will give you the various field definitions that Angular Formly provides.
    vm.fields = [
        {
            key: 'marvel1',
            type: 'select',
            templateOptions: {
                label: 'Normal Select',
                options: [
                    {name: 'Iron Man', value: 'iron_man'},
                    {name: 'Captain America', value: 'captain_america'},
                    {name: 'Black Widow', value: 'black_widow'},
                    {name: 'Hulk', value: 'hulk'},
                    {name: 'Captain Marvel', value: 'captain_marvel'}
                ]
            }
        },
        {
            key: 'first_name',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'First Name',
                placeholder: 'Enter your first name',
                required: false
            }
        },
        {
            key: 'last_name',
            type: 'input',
            templateOptions: {
                type: 'text',
                label: 'Last Name',
                placeholder: 'Enter your last name',
                required: false
            }
        },
        {
            key: 'email',
            type: 'input',
            templateOptions: {
                type: 'email',
                label: 'Email address',
                placeholder: 'Enter email',
                required: false
            }
        },

        {
            key: 'checked',
            type: 'checkbox',
            templateOptions: {
                label: 'Check me out'
            }
        }
    ];

    /**
     * Form submit handler
     */
    function onSubmit() {

        var formSubmitted = true;

        alert(JSON.stringify(vm.model), null, 2);

    }


}






