'use strict';

describe('project.api module', function () {

    beforeEach(module('project.api'));

    describe('API service', function () {


        it('should exist...', inject(function(API, $http) {

            // Spec body
            var API = API;


            expect(API).toBeDefined();



        }));


        it('doSearch should exist...', inject(function(API, $http) {

            // Spec body
            var API = API;

            expect(API.doSearch()).toBeDefined();


        }));


        it('getVehicle should exist...', inject(function(API, $http) {

            // Spec body
            var API = API;

            expect(API.getVehicle()).toBeDefined();


        }));


        it('fetchMovie should exist...', inject(function(API, $http) {

            // Spec body
            var API = API;

            expect(API.fetchMovie()).toBeDefined();


        }));



    });
});