gulp.task("bump", function() {
  gulp.src("./project.json")
  .pipe(bump())
  .pipe(gulp.dest("./"));
});