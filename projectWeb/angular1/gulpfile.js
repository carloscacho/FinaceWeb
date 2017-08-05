const gulp = require('gulp')
const util = require('gulp-util')

require('./gulptask/app');
require('./gulptask/deps');
require('./gulptask/server');

gulp.task('default', function() {
  if(util.env.production){
    gulp.start('deps', 'app')
  }else{
    gulp.start('deps', 'app', 'server')
  }

})
