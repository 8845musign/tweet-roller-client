const gulp = require('gulp')
const webpack = require('webpack-stream')
const del = require('del')
const runSequence = require('run-sequence')

const distDir = 'dist'

gulp.task('html', () => {
  return gulp.src('src/renderer/index.html')
    .pipe(gulp.dest(`${distDir}/renderer`))
})

gulp.task('scripts', () => {
  return gulp.src(['src/app.js', 'src/renderer/app.js'])
    .pipe(webpack({ config: require('./webpack.config.js') }))
    .pipe(gulp.dest(`${distDir}/`))
})

gulp.task('clean', (done) => {
  return del([distDir], () => {
    done()
  })
})

gulp.task('build', () => {
  runSequence('clean', 'scripts', 'html')
})
