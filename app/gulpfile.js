//引入插件
var gulp = require('gulp');

var	compass = require('gulp-for-compass');
var	autoprefixer = require('gulp-autoprefixer');
var	minifycss = require('gulp-minify-css');
var	jshint = require('gulp-jshint');
var	uglify = require('gulp-uglify');
var	imagemin = require('gulp-imagemin');
var	rename = require('gulp-rename');
var	concat = require('gulp-concat');
var	notify = require('gulp-notify');
var	cache = require('gulp-cache');
var	livereload = require('gulp-livereload');
var	del = require('del');
var coffee = require('gulp-coffee');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var server = require('gulp-server-livereload');
var serve = require('gulp-serve');
var pngquant = require('imagemin-pngquant');
var connect = require('gulp-connect');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');

//sass编译
gulp.task( 'compass', function(){
    gulp.src('app/sass/*.scss')
        .pipe(compass({
            sassDir: 'app/sass',
            cssDir: 'app/css',
            force: true
        }));
   
});
//css压缩
gulp.task( 'minifycss', function(){
    gulp.src('app/css/*.css')
        .pipe(concat('styles.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('./build/css'));
});

//coffee编译
gulp.task('coffee', function() {
  gulp.src('app/src/*.coffee')
  .pipe(sourcemaps.init())
  .pipe(coffee({ bare: true })).on('error', gutil.log)
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('./app/js'));
});

//js验证压缩
gulp.task('scripts', function() {
	gulp.src('app/lib/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/js'))
		.pipe(notify({ message: 'Scripts task complete' }));
});

//压缩图片
gulp.task('images', function () {
    return gulp.src('app/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/img'));
});

//清除文件

gulp.task('clean', function(cb) {
	del(['bulid/img/', 'build/js/', 'build/css/'], cb)
});

//默认任务

gulp.task('default', ['clean'], function() {
	gulp.run('images','minifycss', 'scripts');
});

//reload
gulp.task('reload', ['clean'], function() {
  gulp.run('connect','watch', 'html');
});

//监听文件
gulp.task('watch', function() {
  livereload.listen();
	// Watch .scss files
	gulp.watch('app/sass/**/*.scss', ['compass']);
	// Watch .js files
	gulp.watch('app/src/**/*.coffee', ['coffee']);
	// Watch image files
	gulp.watch('app/img/**/*', ['images']);
// Watch html files
 gulp.watch(['./app/*.html'], ['html']);
	});

//serve
gulp.task('connect', function() {
  connect.server({
    port: 8888,
    root: 'app',
    livereload: true
  });
});
gulp.task('html', function () {
  gulp.src(['./app/*.html','./app/scss/*.scss','./app/src/*.coffee'])
   .pipe(livereload());
});

//bower
gulp.task('index', function () {
  gulp.src('./app/index.html')
  .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
  .pipe(inject(
    gulp.src(['./app/js/**/*.js','./app/css/**/*.css'], {read: false})
  ))
  .pipe(gulp.dest('./app'));
});