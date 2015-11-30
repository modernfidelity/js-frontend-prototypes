/**
 *
 * TEST : NEWS COMPONENT
 *
 * @file Provides a test suite for the component
 *
 */



'use strict';

describe('NEWS MODULE', function () {

    // Setup before each spec run
    beforeEach(module('project.news'));

    var $controller, NewsDataService, NewsController;

    beforeEach(inject(function (_$controller_, _NewsDataService_) {

        $controller = _$controller_;
        NewsDataService = _NewsDataService_;

    }));


    // Simple Controller Test
    describe('News Controller : ', function () {

        it('Controller should be defined', function () {

            //spec body
            var NewsController = $controller('NewsController');

            expect(NewsController).toBeDefined();

        });

    });

    // Simple Data Service Test
    describe('News Data Service : ', function () {

        it('Services should be defined', function () {

            //spec body
            expect(NewsDataService).toBeDefined();

        });

        it('Services should have an getNewsData function', function () {
            expect(angular.isFunction(NewsDataService.getNewsData)).toBe(true);
        });


    });


});