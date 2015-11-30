/**
 *
 * TEST : ABOUT US COMPONENT
 *
 * @file Provides a test suite for the component
 *
 */

'use strict';

describe('project.about module', function () {

    /**
     * This is run before each of the following scenarios/specs
     */
    beforeEach(module('project.about'));

    /**
     * Test - a simple check to see if the controller is defined
     */
    describe('About us controller', function () {

        // Spec body
        it('should ....', inject(function ($controller) {

            // Setup vars
            var AboutController = $controller('AboutController');

            // Check for object definition
            expect(AboutController).toBeDefined();

        }));

    });
});