const gulp = require('gulp');
const jshint = require('gulp-jshint');
const semver = require('semver');

gulp.task('jshint', function() {
    console.log('Linting JavaScript: ');
    return gulp.src(['gulpfile.js', 'src/**/*.js'])
        .pipe(jshint({
            esversion: 6,
            node: true,
            browser: true,
            globals: []
        }))
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
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

//default task
gulp.task('default', gulp.series(gulp.parallel('version', 'jshint'),
    function(done){
    console.log('BUILD OK');
    done();
}));