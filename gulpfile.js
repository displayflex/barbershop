var gulp 					= require('gulp'),
		sass 					= require('gulp-sass'),
		browserSync 	= require('browser-sync'),
		concat 				= require('gulp-concat'),
		uglify 				= require('gulp-uglifyjs'),
		cssnano 			= require('gulp-cssnano'),
		rename 				= require('gulp-rename')
		del 					= require('del'),
//	imagemin 			= require('gulp-imagemin'),
		cache 				= require('gulp-cache'),
		autoprefixer	= require('gulp-autoprefixer'),
		notify 				= require("gulp-notify"),
		tinypng 			= require('gulp-tinypng-compress');

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass())
	.on("error", notify.onError(function(error) {
		return "Problem here: " + error.message;
	}))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
	return gulp.src([
			'app/libs/jquery/dist/jquery.min.js',
			'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', function() {
	return gulp.src('app/css/style.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clear', function() {
	return cache.clearAll();
});

// gulp.task('img', function() {
// 	return gulp.src('app/img/**/*')
// 	.pipe(cache(imagemin()))
// 	.pipe(gulp.dest('dist/img'));
// });

gulp.task('tinypng', function () {
	return gulp.src('app/img/**/*.{png,jpg,jpeg}')
	.pipe(tinypng({
		key: '0dYeOz9XSD1Gq2yu2O4Wwzik0eQUSdrj',
		sigFile: 'images/.tinypng-sigs',
		log: true
	}))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

 gulp.task('build', ['clean', 'tinypng', 'sass', 'css-libs', 'scripts'], function() {

	var buildCss = gulp.src([
			'app/css/style.min.css',
			'app/css/libs.min.css'
		])
		.pipe(gulp.dest('dist/css'));

		var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

		var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

		var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);