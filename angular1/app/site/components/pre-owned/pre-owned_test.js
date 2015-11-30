'use strict';

describe('PRE-OWNED MODULE', function () {


    beforeEach(module('project.pre-owned'));

    var $controller, PreownedDataService;

    beforeEach(inject(function (_$controller_, _PreownedDataService_) {

        $controller = _$controller_;
        PreownedDataService = _PreownedDataService_;

    }));

    it('Controller should be defined', function () {

        //spec body
        var PreownedController = $controller('PreownedController');

        expect(PreownedController).toBeDefined();


    });


    //describe('Pre-owned Data Service', function () {
    //
    //    it('Services should be defined', function () {
    //
    //        //spec body
    //        expect(NewsDataService).toBeDefined();
    //
    //
    //    });
    //
    //
    //    it('Services should have an getNewsData function', function () {
    //        expect(angular.isFunction(NewsDataService.getNewsData)).toBe(true);
    //    });
    //
    //});



});