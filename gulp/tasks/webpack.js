var gulp    = require('gulp');
var webpack = require('webpack-stream');
var config  = require('../config').webpack;

gulp.task('webpack', function(){
    return gulp.src(config.entry)
            .pipe(webpack(config))
            .pipe(gulp.dest(config.output.path));
})
