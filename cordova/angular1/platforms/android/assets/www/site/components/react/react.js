/**
 *
 * REACT COMPONENT
 *
 * @file Provides a simple page component for the site, using REACT JS as the view layer to render components for demo.
 *
 * This uses the UVL data services to call the live sample data sets to then render via custom React Components.
 *
 */

'use strict';

angular.module('project.react', ['ngRoute', 'react', 'project.uvl', 'angularUtils.directives.dirPagination'])

    // Provide router info for component
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/react', {
            title: 'React Tests',
            templateUrl: './site/components/react/react.html',
            controller: 'ReactController',
            controllerAs: 'vm'
        });
    }])

    // Add module data to map components
    .value('Hello', Hello)
    .value('Card', Card)
    .value('List', List)

    // ngReact - Ng-directive for mapping
    .directive('card', function (reactDirective) {
        return reactDirective(Card);
    })

    // ngReact - Ng-directive for mapping
    .directive('hello', function (reactDirective) {
        return reactDirective(Hello);
    })

    // ngReact - Ng-directive for mapping
    .directive('listcollection', function (reactDirective) {
        return reactDirective(List);
    })

    // Define controller function
    .controller('ReactController', ReactController);


// Setup module dependency injection
ReactController.$inject = ['UvlDataService'];

/**
 *
 * Main Controller
 *
 * @constructor
 */
function ReactController(UvlDataService) {

    // Define the View Model variable for templating from controller state.
    var vm = this;


    // SimpleTxt component demo
    vm.person = {

        fname: 'SimpleTxt Monkey',
        lname: 'Bob'
    };

    // Flat card to demo virtual dom rendering when not fetching data.
    vm.card = {
        image: 'http://vignette1.wikia.nocookie.net/starwars/images/4/49/AbominableChewbacca-SWT.png',
        title: 'Card Title',
        body: 'This is copy for the particular card item'
    };

    // Test function for demo loops
    vm.getRepeat = function (n) {
        return new Array(n);
    };


    // Call main controller function (taken from UVL module)
    activate();

    /**
     *
     * Main controller function (calls data services for listings)
     *
     * @returns {*}
     */
    function activate() {

        return getVehicleData().then(function () {
            console.log('Activated UVL View');
        });
    }

    /**
     *
     * Controller call to Data service (promises)
     *
     * @returns {Array}
     *
     */
    function getVehicleData() {

        // Optional additional return object (if ignoring normal bindings)
        var content = [];

        // Logger
        console.log("controller uvl data caller");

        // Call data service for listings
        content = UvlDataService.getListingsData()

            .then(function (data) {

                console.log("controller uvl data received = " + data);

                vm.listings = data;

                return vm.listings;
            });

        return content;
    }

}


/**
 *
 * REACT COMPONENTS (JS : not-jsx)
 * -----------------------------------------
 *
 */


/**
 *
 * SimpleTxt React Component
 *
 * @type {*|Function}
 */
var Hello = React.createClass({
    displayName: 'SimpleTxt',
    propTypes: {
        fname: React.PropTypes.string.isRequired,
        lname: React.PropTypes.string.isRequired
    },

    render: function () {
        return React.DOM.h2(
            {className: "sectionTitle"},
            'Hello ' + this.props.fname + ' ' + this.props.lname
        );
    }
});


/**
 *
 * Card React Component
 *
 * @type {*|Function}
 */

var Card = React.createClass({
    displayName: 'Card',
    propTypes: {
        image: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        body: React.PropTypes.string.isRequired
    },
    render: function () {

        // Must return single dom node (so everything must be added as child)
        return (
            React.createElement("div", {className: "card"},
                React.createElement("img", {
                    className: "cardImg",
                    title: this.props.title,
                    alt: this.props.title,
                    src: this.props.image
                }),
                React.createElement("h2", {className: "title"}, this.props.title),
                React.createElement("p", {className: "copy"}, this.props.body)
            )
        )


    }
});


/**
 *
 * List Collection React Component
 *
 * @type {*|Function}
 */

var List = React.createClass({

    displayName: 'List',
    propTypes: {
        items: React.PropTypes.array
    },

    //getInitialState: function () {
    //    //return {data: this.props.items};
    //    return {items: []};
    //},

    render: function () {

        // Handle empty data (whilst populating)
        if (!this.props.items) {
            return null;
        }

        return (

            React.createElement("div", {className: "react-list"},

                this.props.items.map(function (item) {

                    // Render Card component for each mapped 'item'
                    return React.createElement(Card, {
                        key: item._id,
                        className: "card",
                        title: item.translations.default.year_make_model,
                        image: item.images.list_430.img_1,
                        body: item.translations.default.price_formated

                    }, "")

                    // end map

                })
            )

        )


    }
});