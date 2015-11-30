/**
 *
 * UVL COMPONENTS
 *
 * @file Example of calling the new Angular 2 HTTP service, which now returns an observable item (RxJS)
 *
 * @see
 *
 */

import {Component, CORE_DIRECTIVES, NgFor} from 'angular2/angular2';
import {Http, Response, Headers, HTTP_PROVIDERS} from 'angular2/http';


/**
 * Component Description
 */

@Component({
    selector: 'uvl',
    templateUrl: './components/uvl/uvl.html',
    viewProviders: [HTTP_PROVIDERS],
    directives: [CORE_DIRECTIVES, NgFor]
})


/**
 *
 * Main Class
 *
 */
export class UvlCmp {

    // Class constructor
    constructor(http:Http) {


        // Standard naming (view-model)
        var vm = this;

        var listingsAPI = 'http://mtk-api/vdata.php';

        /**
         * Get Star Wars Info
         */
        http.get('http://www.omdbapi.com/?t=star wars&tomatoes=true&plot=full')
            // Call map on the response observable to get the parsed people object
            .map(res => res.json())
            // Subscribe to the observable to get the parsed people object and attach it to the
            // component
            .subscribe(
                //data => this.handleData(data),

                data => this.filmData = data,
                err => this.logError(err),
                () => console.log('Film data complete')
            );


        // Setup vars for POST req
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        // Setup for POST data query for endpoint (required format)



        var rawSearchData = {
            "sumname": "filtered",
            "return": "list",
            "tree_type": "cl_lp-mo_bo-lp",
            "currency_locale": "",
            "distance_unit": "km",
            "currency": "EUR",
            "lang": "en_gb",
            "include_special_prices": "1",
            "equipment_meta_uncombined": "1",
            "project": {
                "ids.vin": "",
                "main_info.approved": "",
                "main_info.make": "",
                "main_info.reg_year": "",
                "main_info.model": "",
                "dealer.phone": "",
                "dealer.email": "",
                "dealer.name": "",
                "translations.default.year_make_model": "",
                "translations.default.price_formated": "",
                "translations.default.colour_with_trim": "",
                "translations.default.odometer": "",
                "translations.default.interior": "",
                "translations.default.colour": "",
                "dealer.town": "",
                "main_info.seo_url": "",
                "main_info.price_special": "",
                "images.count": "",
                "images.list_430.img_1": "",
                "images.list_430.img_2": "",
                "dealer.dealer_url": "",
                "dealer.cms_id": "",
                "ids.oracle_id": ""
            },
            "order": ["approved", "priced"],
            "market": ["ferrari united kingdom"],
            "hits": {"to": "5000"}
        };



        var postDataString = "search="+ JSON.stringify(rawSearchData);


        console.log(postDataString);

        /**
         *
         * Fetch POST Request
         *
         * In this case we used to use  data: $httpParamSerializer(postData),
         * Not sure if this is currently available as yet in ng2.
         */
        http.post(listingsAPI, postDataString, {
                headers: headers
            })
            .map(res => res.json())
            .subscribe(
                data => this.carData = data,
                err => this.logError(err),
                () => console.log('Vdata.php fetch complete')
            );


    }

    public users = [
        { name: 'Jilles', age: 21 },
        { name: 'Todd', age: 24 },
        { name: 'Lisa', age: 18 }
    ];

    name:string = 'Hello Bob';


    /**
     *
     * Handle Data Return
     *
     * @param data
     */
    handleData(data) {

        var output = data;

        return output;

    }


    /**
     *
     * Handle Data Error
     *
     * @param err
     */
    logError(err) {

        console.log(err);

    }

}



