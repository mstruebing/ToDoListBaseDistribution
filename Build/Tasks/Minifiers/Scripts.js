var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var Logger = require('./../../Utilities/Logger.js');
var config = require('./../../Config.js');

module.exports = function minifyScripts(packageModel) {
    'use strict';

    var packageConfig = packageModel.options;
    var packageName = packageConfig.name;
    var packageBasePath = packageConfig.basePath;
    var scriptsConfig = packageConfig.scripts;
    var taskName = 'minify:scripts:' + packageName;

    if (!scriptsConfig) {
        return this;
    }

    // Push the taskName which will be created, to an main array which holds all taskNames for the super-tasks/compiler (f.e. minify:scripts).
    config.tasks.push(taskName);

    // Create the sub-minifier task.
    return gulp.task(taskName, function () {
        return gulp.src(packageBasePath + scriptsConfig.dest + '/**/*.js')
            .pipe(plugins.uglify())
            .on('error', Logger)
            .pipe(gulp.dest(packageBasePath + scriptsConfig.dest));
    });
};
