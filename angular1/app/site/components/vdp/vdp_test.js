'use strict';

describe('VDP MODULE', function () {


    beforeEach(module('project.vdp'));

    var $controller, VdpDataService;

    beforeEach(inject(function (_$controller_, _VdpDataService_) {

        $controller = _$controller_;
        PreownedDataService = _VdpDataService_;

    }));

    it('Controller should be defined', function () {

        //spec body
        var VdpController = $controller('VdpController');

        expect(VdpController).toBeDefined();


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