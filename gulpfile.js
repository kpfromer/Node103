var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function () {
    nodemon({
        script: 'app.js',       // default script to launch
        ext: 'js',              // watch for js changes
        env: {
            PORT: 8000      // launch on port
        },
        ignore: ['./node_modules/**']  // ignore node js changes
        })
        .on('restart', function () {
            console.log('restarting');
        });
});