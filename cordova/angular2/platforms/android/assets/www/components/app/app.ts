/**
 *
 * APPLICATION COMPONENT
 *
 * @file This is main component which constructs the application.
 *
 */


import {Component, ViewEncapsulation} from 'angular2/angular2';
import {
    RouteConfig,
    ROUTER_DIRECTIVES
} from 'angular2/router';

// import {HTTP_PROVIDERS} from 'http/http';

import {HomeCmp} from '../home/home';
import {AboutCmp} from '../about/about';
import {NewsCmp} from '../news/news';
import {UvlCmp} from '../uvl/uvl';
import Component from "../../../node_modules/angular2/ts/src/core/render/view_factory";

//import {NameList} from '../../services/name_list';



/**
 *
 * Define this modules component
 *
 */
@Component({
    selector: 'app',
    //viewProviders: [NameList],
    templateUrl: './components/app/app.html',
    styleUrls: ['./components/app/app.css'],
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES]
})

/**
 *
 * Define application routes and mapping to other components.
 *
 */
@RouteConfig([
    {path: '/', component: HomeCmp, as: 'Home'},
    {path: '/about', component: AboutCmp, as: 'About'},
    {path: '/uvl', component: UvlCmp, as: 'Uvl'},
    {path: '/news', component: NewsCmp, as: 'News'}
])

export class AppCmp {
}
