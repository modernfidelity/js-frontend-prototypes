Frontend Prototype (2016)
===============

Simple development starting point for modern frontend web apps based on javascript framework(s) and libs.

Tools used : 

    - AngularJS 1.4.x
    - React 0.14.x
    - Bower
    - Grunt
    - Gulp
    - Bootstrap 3.x 
    - SASS
    - jQuery 2.x
    
    
Testing : 

    - Karma
    - Jasmine
    - Protractor
    
   
Setup
---------------

Clone the repo and then run an http server from within /app

These are great simple servers for development & production: 

    https://github.com/tapio/live-server
    https://www.npmjs.com/package/http-server

    Nginx Server : 
    
        Please see the file nginx-local-pushstate.conf + nginx-s3-pushstate.conf for starting point configuration
        @see Push State (https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)
         

Builds
-------------

The current tooling is built around Grunt JS (http://gruntjs.com/). Testing is built into this runner. 

There is additional gulp.js file to show the difference between task runners. 


```
> npm install
```

Then once installed you can run from the 'grunt' or 'gulp' command from the main content root. 

```
> grunt
```

Run the server from within the  /app directory with : 

```
> cd ./app
```

```
> live-server
```

Demos (Angular1 + React)
-------------

The following URLs connects to public data sets.  

*(To view the public Data -- you will need a proxy server running locally which routes and adds CORS headers to the responses.)*  
 
### / {root}
 
This demos the Angular JS 1.x application, which is decoupled i.e standalone and can talk to various APIs to source its data.   
 
### /#/react 

This demo component renders the data response with custom React components List, Card, SimpleTxt to highlight the performance improvements of 'Virtual Dom' and how 
the Angular framework 'View' layer can be interchanged with other libraries.  
 
 

Core Files
-------------

The core CSS is located from within the SASS folder, and includes the vendor libs Bootstrap. 
 
The core JS files and components are located within "./app/sites/", the main JS is "app/app.js"

Please adjust these to meet your specific requirements. 


Coding Style
-------------
 
Currently this is the referenced guide for Angular 1.x projects : 
 
- https://github.com/johnpapa/angular-styleguide
 
  
Testing
----------------

Please read the following : 

Test Runners 

    e2e (End to End)
    
     - https://angular.github.io/protractor/
    
    Unit Testing  
     
     - http://karma-runner.github.io/     

Test Framework 

    Jasmine 
    
     - http://jasmine.github.io/


Tests spec files are currently in the root of the project /tests
  
Change directory into /tests to start a run on the current build 


```
> npm test
```
  
This looks for an scenarios / spec files (*.js) within the current working directory.
  
 
*Please note this is looking for a test server on PORT 8181 via the package.json['testserver'] 


This will need to updated to env_var at some point
 
 
  

TODO
-------------

 - Updates CSS / Design for the new builds.