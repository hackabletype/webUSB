const gulp = require('gulp');
const browser_sync = require('browser-sync').create();

// serve
gulp.task('browser_serve', () => {
  browser_sync.init({
    server: {
      baseDir: 'frontend',
      index: 'RGB_LED.htm',
    },
  });
});

// auto refresh browser on change
gulp.task('browser_sync', () => {
  browser_sync.reload();
});

// watcher for the source files
gulp.task('watch', ['browser_serve', 'browser_sync'], () => {
  gulp.watch('frontend/**/*.html', ['browser_sync']);
  gulp.watch('frontend/**/*.htm', ['browser_sync']);
  gulp.watch('frontend/**/*.css', ['browser_sync']);
  gulp.watch('frontend/**/*.js', ['browser_sync']);
});
