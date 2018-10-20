const gulp = require("gulp"),
    rename = require("gulp-rename"),
    uglify = require("gulp-uglify-es").default,
    browserSync = require("browser-sync").create(),
    eslint = require("gulp-eslint"),
    prettyError = require("gulp-prettyerror"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    cssnano = require("gulp-cssnano");


gulp.task("sass", function(done) {
    gulp
        .src("./sass/style.scss", { sourcemaps: true })
        .pipe(prettyError())
        .pipe(sass())
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"]
            })
        )
        .pipe(gulp.dest("./build/css"))
        .pipe(cssnano())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("./build/css"))
        .on("end", done);
});

gulp.task("eslint", function(done) {
    return gulp
        .src(["./js/*.js"])
        // Also need to use it here...
        .pipe(prettyError())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .on("end", done);
});

gulp.task("scripts", gulp.series("eslint", function() {
    return gulp
        .src("./js/*.js")
        .pipe(uglify())
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(gulp.dest("./build/js"));
}));

gulp.task("html", function(done) {
    gulp
        .src("./*.html")
        .pipe(prettyError())
        .pipe(gulp.dest("./build"))
        .on("end", done);
});

gulp.task("images", function(done) {
    gulp
        .src("./assets/images/*")
        .pipe(prettyError())
        .pipe(gulp.dest("./build/images"))
        .on("end", done);
});

gulp.task("fonts", function(done) {
    gulp
        .src("./assets/fonts/*")
        .pipe(prettyError())
        .pipe(gulp.dest("./build/fonts"))
        .on("end", done);
});

// Set-up BrowserSync and watch

gulp.task("browser-sync", function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    gulp
        .watch(["build/index.html", "build/css/*.css", "build/js/*.js", "build/images/*", "build/fonts/*"])
        .on("change", browserSync.reload);
});

gulp.task("watch", function() {
    gulp.watch("js/*.js", gulp.series("scripts"));
    gulp.watch("sass/*.scss", gulp.series("sass"));
    gulp.watch("*.html", gulp.series("html"));
    gulp.watch("./assets/images/*", gulp.series("images"));
    gulp.watch("./assets/fonts/*", gulp.series("fonts"));
});


gulp.task("build", gulp.parallel("html", "scripts", "sass", "images", "fonts"));
gulp.task("default", gulp.series("build", gulp.parallel("browser-sync", "watch")));
