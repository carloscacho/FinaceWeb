const gulp          = require('gulp')
const babel         = require('gulp-babel')
const uglify        = require('gulp-uglify')
const uglifyCss     = require('gulp-uglifycss')
const concat        = require('gulp-concat')
const htmlMin       = require('gulp-htmlmin')
const browserSync   = require('browser-sync').create();
const reload        = browserSync.reload;


function browser_sync() {
    browserSync.init({
        server: {
            baseDir: "./public",
            middleware: function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
                res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
                next();
            }
        }
    });

    gulp.watch('app/**/*.html', gulp.series(appHTML)).on("change", reload)
    gulp.watch('app/**/*.css', gulp.series(appCSS)).on("change", reload)
    gulp.watch('app/**/*.js', gulp.series(appJS)).on("change", reload)
    gulp.watch('assets/**/*.*', gulp.series(appAssets, reload)).on("change", reload)
}

function appHTML(done) {
    gulp.src('app/**/*.html')
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(gulp.dest('public'))
    done();
}

function appCSS(done) {
    gulp.src('app/**/*.css')
        .pipe(uglifyCss({ "uglyComments": true }))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('public/assets/css'))
    done();
}

function appJS(done) {
    gulp.src('app/**/*.js')
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('public/assets/js'))
    done()
}

function appAssets(done) {
    gulp.src('assets/**/*.*')
        .pipe(gulp.dest('public/assets'))
    done()
}

function depsJS(done) {
    gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-toastr/dist/angular-toastr.tpls.min.js',
        'node_modules/admin-lte/plugins/jquery/jquery.js',
        'node_modules/admin-lte/plugins/bootstrap/js/bootstrap.bundle.min.js',
        'node_modules/admin-lte/dist/js/adminlte.js'
    ])
        .pipe(uglify())
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('public/assets/js'))
    done()
}

function depsCSS(done) {
    gulp.src([
        'node_modules/angular-toastr/dist/angular-toastr.min.css',
        'node_modules/font-awesome/css/font-awesome.min.css',
        'node_modules/admin-lte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css',
        'node_modules/admin-lte/dist/css/Adminlte.min.css'
        // 'node_modules/admin-lte/dist/css/skins/_all-skins.min.css',
    ])
        .pipe(uglifyCss({ "uglyComments": true }))
        .pipe(concat('deps.min.css'))
        .pipe(gulp.dest('public/assets/css'))
    done()
}

function depsFonts(done) {
    gulp.src([
        'node_modules/font-awesome/fonts/*.*',
        'node_modules/admin-lte/bootstrap/fonts/*.*'
    ])
        .pipe(gulp.dest('public/assets/fonts'))
    done()
}

// function watch_files() {
//     gulp.watch('app/**/*.html', gulp.series([appHTML,reload]))
//     gulp.watch('app/**/*.css', gulp.series([appCSS, reload]))
//     gulp.watch('app/**/*.js', gulp.series([appJS,reload]))
//     gulp.watch('assets/**/*.*', gulp.series([appAssets, reload]))
// }

gulp.task('html', appHTML)
gulp.task('css', gulp.parallel([appCSS, depsCSS]))
gulp.task('js', gulp.parallel([appJS, depsJS]))
gulp.task('assets', gulp.parallel([appAssets, depsFonts]))
gulp.task('default', gulp.parallel([appHTML, appCSS, appJS, appAssets, depsCSS, depsJS, depsFonts]) );
gulp.task('watch', gulp.series(browser_sync))
