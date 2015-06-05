var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var es = require('event-stream');
var bowerFiles = require('main-bower-files');
var print = require('gulp-print');
var Q = require('q');

var MODULE_NAME = "angularSeed";

var paths = {
    scripts: 'app/**/*.js',
    styles: ['./app/**/*.css', './app/**/*.scss'],
    images: './images/**/*',
    index: './app/index.html',
    partials: ['app/**/*.html', '!app/index.html'],
    distDev: './dist.dev',
    distProd: './dist.prod',
    distScriptsProd: './dist.prod/scripts',
    scriptsDevServer: 'devServer/**/*.js'
};

// pipeline definitions

var pipeline = {};

pipeline.orderedVendorScripts = function() {
    return plugins.order(['jquery.js', 'angular.js']);
};

pipeline.orderedAppScripts = function() {
    return plugins.angularFilesort();
};

pipeline.minifiedFileName = function() {
    return plugins.rename(function (path) {
        path.extname = '.min' + path.extname;
    });
};

pipeline.validatedAppScripts = function() {
    return gulp.src(paths.scripts)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipeline.builtAppScriptsDev = function() {
    return pipeline.validatedAppScripts()
        .pipe(gulp.dest(paths.distDev));
};

pipeline.builtAppScriptsProd = function() {
    var scriptedPartials = pipeline.scriptedPartials();
    var validatedAppScripts = pipeline.validatedAppScripts();

    return es.merge(scriptedPartials, validatedAppScripts)
        .pipe(pipeline.orderedAppScripts())
        .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('app.min.js'))
            .pipe(plugins.uglify())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(paths.distScriptsProd));
};

pipeline.builtVendorScriptsDev = function() {
    return gulp.src(bowerFiles())
        .pipe(gulp.dest('dist.dev/bower_components'));
};

pipeline.builtVendorScriptsProd = function() {
    return gulp.src(bowerFiles())
        .pipe(pipeline.orderedVendorScripts())
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(paths.distScriptsProd));
};

pipeline.validatedDevServerScripts = function() {
    return gulp.src(paths.scriptsDevServer)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'));
};

pipeline.validatedPartials = function() {
    return gulp.src(paths.partials)
        .pipe(plugins.htmlhint({'doctype-first': false}))
        .pipe(plugins.htmlhint.reporter());
};

pipeline.builtPartialsDev = function() {
    return pipeline.validatedPartials()
        .pipe(gulp.dest(paths.distDev));
};

pipeline.scriptedPartials = function() {
    return pipeline.validatedPartials()
        .pipe(plugins.htmlhint.failReporter())
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(plugins.ngHtml2js({
            moduleName: MODULE_NAME
        }));
};

pipeline.builtStylesDev = function() {
    return gulp.src(paths.styles)
        .pipe(plugins.sass())
        .pipe(gulp.dest(paths.distDev));
};

pipeline.builtStylesProd = function() {
    return gulp.src(paths.styles)
        .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass())
            .pipe(plugins.minifyCss())
        .pipe(plugins.sourcemaps.write())
        .pipe(pipeline.minifiedFileName())
        .pipe(gulp.dest(paths.distProd));
};

pipeline.processedImagesDev = function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distDev + '/images/'));
};

pipeline.processedImagesProd = function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest(paths.distProd + '/images/'));
};

pipeline.validatedIndex = function() {
    return gulp.src(paths.index)
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter());
};

pipeline.builtIndexDev = function() {
    var orderedVendorScripts = pipeline.builtVendorScriptsDev()
        .pipe(pipeline.orderedVendorScripts());

    var orderedAppScripts = pipeline.builtAppScriptsDev()
        .pipe(pipeline.orderedAppScripts());

    var appStyles = pipeline.builtStylesDev();

    return pipeline.validatedIndex()
        .pipe(gulp.dest(paths.distDev))
        .pipe(plugins.inject(orderedVendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(orderedAppScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(gulp.dest(paths.distDev));
};

pipeline.builtIndexProd = function() {
    var vendorScripts = pipeline.builtVendorScriptsProd();
    var appScripts = pipeline.builtAppScriptsProd();
    var appStyles = pipeline.builtStylesProd();

    return pipeline.validatedIndex()
        .pipe(gulp.dest(paths.distProd))
        .pipe(plugins.inject(vendorScripts, {relative: true, name: 'bower'}))
        .pipe(plugins.inject(appScripts, {relative: true}))
        .pipe(plugins.inject(appStyles, {relative: true}))
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest(paths.distProd));
};

pipeline.builtAppDev = function() {
    return es.merge(pipeline.builtIndexDev(), pipeline.builtPartialsDev(), pipeline.processedImagesDev());
};

pipeline.builtAppProd = function() {
    return es.merge(pipeline.builtIndexProd(), pipeline.processedImagesProd());
};

// task definitions

gulp.task('clean-dev', function() {
    var deferred = Q.defer();

    del(paths.distDev, function() {
        deferred.resolve();
    });

    return deferred.promise;
});

gulp.task('clean-prod', function() {
    var deferred = Q.defer();

    del(paths.distProd, function() {
        deferred.resolve();
    });

    return deferred.promise;
});

gulp.task('validate-partials', pipeline.validatedPartials);

gulp.task('validate-index', pipeline.validatedIndex);

gulp.task('build-partials-dev', pipeline.builtPartialsDev);

gulp.task('convert-partials-to-js', pipeline.scriptedPartials);

gulp.task('validate-devserver-scripts', pipeline.validatedDevServerScripts);

gulp.task('validate-app-scripts', pipeline.validatedAppScripts);

gulp.task('build-app-scripts-dev', pipeline.builtAppScriptsDev);

gulp.task('build-app-scripts-prod', pipeline.builtAppScriptsProd);

gulp.task('build-styles-dev', pipeline.builtStylesDev);

gulp.task('build-styles-prod', pipeline.builtStylesProd);

gulp.task('build-vendor-scripts-dev', pipeline.builtVendorScriptsDev);

gulp.task('build-vendor-scripts-prod', pipeline.builtVendorScriptsProd);

gulp.task('build-index-dev', pipeline.builtIndexDev);

gulp.task('build-index-prod', pipeline.builtIndexProd);

gulp.task('build-app-dev', pipeline.builtAppDev);

gulp.task('build-app-prod', pipeline.builtAppProd);

gulp.task('clean-build-app-dev', ['clean-dev'], pipeline.builtAppDev);

gulp.task('clean-build-app-prod', ['clean-prod'], pipeline.builtAppProd);

gulp.task('watch-dev', ['clean-build-app-dev', 'validate-devserver-scripts'], function() {
    plugins.nodemon({ script: 'server.js', ext: 'js', watch: ['devServer/'], env: {NODE_ENV : 'development'} })
        .on('change', ['validate-devserver-scripts'])
        .on('restart', function () {
            console.log('[nodemon] restarted dev server');
        });

    plugins.livereload.listen({ start: true });

    gulp.watch(paths.index, function() {
        return pipeline.builtIndexDev()
            .pipe(plugins.livereload());
    });

    gulp.watch(paths.scripts, function() {
        return pipeline.builtAppScriptsDev()
            .pipe(plugins.livereload());
    });

    gulp.watch(paths.partials, function() {
        return pipeline.builtPartialsDev()
            .pipe(plugins.livereload());
    });

    // watch styles
    gulp.watch(paths.styles, function() {
        return pipeline.builtStylesDev()
            .pipe(plugins.livereload());
    });
});

gulp.task('watch-prod', ['clean-build-app-prod', 'validate-devserver-scripts'], function() {
    plugins.nodemon({ script: 'server.js', ext: 'js', watch: ['devServer/'], env: {NODE_ENV : 'production'} })
        .on('change', ['validate-devserver-scripts'])
        .on('restart', function () {
            console.log('[nodemon] restarted dev server');
        });

    plugins.livereload.listen({start: true});

    gulp.watch(paths.index, function() {
        return pipeline.builtIndexProd()
            .pipe(plugins.livereload());
    });

    gulp.watch(paths.scripts, function() {
        return pipeline.builtAppScriptsProd()
            .pipe(plugins.livereload());
    });

    gulp.watch(paths.partials, function() {
        return pipeline.builtAppScriptsProd()
            .pipe(plugins.livereload());
    });

    gulp.watch(paths.styles, function() {
        return pipeline.builtStylesProd()
            .pipe(plugins.livereload());
    });
});

// default task

gulp.task('default', ['clean-build-app-prod']);
