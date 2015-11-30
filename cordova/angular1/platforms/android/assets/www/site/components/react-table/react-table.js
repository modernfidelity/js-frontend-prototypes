/**
 *
 * REACT COMPONENT
 *
 * @file Provides a simple page component for the site, using REACT JS as the view layer to render components for demo.
 *
 * This uses the UVL data services to call the live sample data sets.
 *
 */

'use strict';

angular.module('project.react-table', ['ngRoute', 'project.uvl', 'angularUtils.directives.dirPagination'])

    // Provide router info for component
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/react-table', {
            title: 'React Tests',
            templateUrl: './site/components/react-table/react-table.html',
            controller: 'ReactController',
            controllerAs: 'vm'
        });
    }])


    // Custom Directive (manual react)
    .directive('fastRepeat', function () {
        return {
            restrict: 'E',
            //scope: {
            //    data: '='
            //},
            link: function (scope, el, attrs) {
                scope.$watchCollection('vm.data', function (newValue, oldValue) {


                    //
                    //React.renderComponent(
                    //    MYLIST({data: newValue}),
                    //    el[0]
                    //);


                    var MYLIST = React.createFactory(MYLIST);

                    function render() {
                        return MYLIST({data: newValue});
                    }


                })


            }
        }
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


    // Custom Implemnetation
    vm.framework = 'ReactJs';
    vm.data = [];
    // Fill the data map with random data
    vm.refresh = function () {


        for (var i = 0; i < 1500; ++i) {
            vm.data[i] = {};
            for (var j = 0; j < 5; ++j) {
                vm.data[i][j] = Math.random();
            }
        }
    };

    vm.refresh();


    // SimpleTxt component demo
    vm.person = {

        fname: 'SimpleTxt Monkey',
        lname: 'Bob'
    };


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
 * REACT COMPONENTS (JS : non-jsx)
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


var MYLIST = React.createClass({

    displayName: 'MYLIST',

    propTypes: {
        data: React.PropTypes.object.isRequired
    },

    render: function () {

        var data = this.props.data;

        var rows = data.map(function (datum) {
            var clickHandler = function (ev) {
                console.log("Still in reactJs");
                console.log(ev);
            }

            return (
                React.DOM.tr({onClick: clickHandler},
                    React.DOM.td(null, datum['0']),
                    React.DOM.td(null, datum['1']),
                    React.DOM.td(null, datum['2']),
                    React.DOM.td(null, datum['3']),
                    React.DOM.td(null, datum['4'])
                )
            );
        });

        return (
            React.DOM.table(null,
                rows
            )
        );
    }
});
