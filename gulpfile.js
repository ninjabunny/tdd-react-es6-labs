const gulp = require('gulp');
const eslint = require('gulp-eslint');
const jasmine = require('gulp-jasmine');
const jshint = require('gulp-jshint');
const karma = require('gulp-karma-runner');
const reporters = require('jasmine-reporters');
const webserver = require('gulp-webserver');
const semver = require('semver');

gulp.task('jshint', function() {
    console.log('Linting JavaScript: ');
    return gulp.src(['gulpfile.js', 'src/**/*.js'])
        .pipe(jshint({
            esversion: 6,
            bitwise: true,
            curly: true,
            eqeqeq: true,
            forin: true,
            freeze: true,
            latedef: 'nofunc',
            nonbsp: true,
            nonew: true,
            node: true,
            browser: true,
            globals: []
        }))
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('eslint', function() {
    return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('jasmine', function(done){
    gulp.src('spec/*.js')
        .pipe(jasmine({
            reporter: new reporters.TerminalReporter({
                verbosity: 3,
                color: true
            })
        }));
    done();
});

gulp.task('karma', function() {
    return gulp.src([
        'spec/**/*.js',
        'src/**/*.js'
        ],
        {'read': false}).pipe(
        karma.server({
            configFile: __dirname + '/karma.conf.js',
            'singleRun': false
        })
    )
    });

gulp.task('test', function() {
    return gulp.src([
        'spec/**/*.js',
        'src/**/*.js'
        ],
        {'read': false}).pipe(
        karma.runner({
            configFile: __dirname + '/karma.conf.js',
            'singleRun': false
        })
    )
});

gulp.task('version', function(done) {
    const packageJson = require('./package.json');
    const expectedVersion = packageJson.engines.node;
    const actualVersion = process.version;
    console.log('Checking node version: ');
    if (semver.gt(expectedVersion,actualVersion)){
        console.log('Incorrect node version. Expected ' + expectedVersion +
        '. Actual: ' + actualVersion);
        process.exit(1);
    }
    done();
});

gulp.task('run', function() {
    gulp.src('src')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

//default task
gulp.task('default', gulp.series(gulp.parallel('version', 'eslint'),'test',
    function(done){
        console.log('BUILD OK');
        done();
    }
));