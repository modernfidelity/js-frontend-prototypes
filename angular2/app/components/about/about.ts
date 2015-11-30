/**
 *
 * ABOUT COMPONENT
 *
 */



import {Component, CORE_DIRECTIVES, NgFor} from 'angular2/angular2';
import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';



@Component({
    selector: 'about',
    templateUrl: './components/about/about.html',
    viewProviders: [HTTP_PROVIDERS],
    directives: [CORE_DIRECTIVES, NgFor]
})

export class AboutCmp {



    constructor(http:Http) {

        var mydata = {};
        var filmData;

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




    }


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
