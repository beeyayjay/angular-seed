# angular-seed

A seed project for [AngularJS]-based web applications.

### Features

* Angular 1.4.x
* [NodeJS] with [Express] for local web development
* [Bower] and [Gulp]
* [Foundation]-based and naturally [Sass]-y
* [Restangular] for consumption of REST APIs with promises!
* Development web server live-reload support
* Clean structure
* Example Angular
  * Models
  * Directive
  * Service to get the current weather in NYC

### Getting Started

This presumes you already have node and gulp installed.

```
cd some_path
git clone git@github.com:ianmariano/angular-seed.git
cd angular-seed
npm install
```

Run the web server:

```
npm start
```

Then navigate to http://localhost:8080

Alternatively, if you want to run the web server with live-reload support during active development you can:

```
gulp watch-dev
```

You can also run the web server with live-reload support to test the production version of your site:

```
gulp watch-prod
```

### Packaging Your App

To package a dev version of your app (in `./dist.dev`):

```
gulp clean-build-app-dev
```

To package a production version of your app (in `./dist.prod`):

```
gulp clean-build-app-prod
```

### Structure

* `app`: the app lives here
* `app/controllers`: controller code lives here
* `app/models`: model code lives here
* `app/services`: service provider code lives here
* `app/styles`: sassy-ness
* `app/views`: views and components
* `server`: support for the dev web server

`gulpfile.js` might also be interesting to check out.

### Contributing

Fork me on [Github](https://github.com/ianmariano/angular-seed/)!

### License

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

[AngularJS]: http://angularjs.org
[Bower]: http://bower.io
[Express]: http://expressjs.com
[Foundation]: http://foundation.zurb.com
[Gulp]: http://gulpjs.com
[NodeJS]: http://nodejs.org
[Restangular]: https://github.com/mgonto/restangular
[Sass]: http://sass-lang.com
