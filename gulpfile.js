var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');

var srcDir = './src/**/*.*';
var buildDir = './build/';

// reload browsers as watch task after changes made
gulp.task('watch', ['build'], function(done) {
    browserSync.reload();
    done();
});

// process changed src files and put into build dir
gulp.task('build', function () {
    return gulp
        .src(srcDir)
        .pipe(plumber())
        .pipe(gulp.dest(buildDir));
});

// default task to launch build and watch for changes
gulp.task('default', ['build'], function() {
    // create static server to serve build dir
    browserSync.init({
        server: {
            baseDir: buildDir
        }
    });

    // reload browsers
    gulp.watch(srcDir, ['watch']);
});
