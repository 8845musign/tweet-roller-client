const gulp = require('gulp')
const webpack = require('webpack-stream')
const del = require('del')
const runSequence = require('run-sequence')
const electron = require('electron-connect').server.create()

const distDir = 'dist'

gulp.task('html', () => {
  return gulp.src('src/renderer/index.html')
    .pipe(gulp.dest(`${distDir}/renderer`))
})

let watch = false
gulp.task('scripts', () => {
  let config = require('./webpack.config.js')
  if (watch) {
    config = Object.assign({ watch: true }, config)
  }

  return gulp.src(['src/app.js', 'src/renderer/app.js'])
    .pipe(webpack(config))
    .pipe(gulp.dest(`${distDir}/`))
})

gulp.task('clean', (done) => {
  return del([distDir], () => {
    done()
  })
})

gulp.task('build', (cb) => {
  runSequence('clean', 'html', 'scripts', cb)
})

gulp.task('server-start', () => {
  electron.start()
  gulp.watch(['dist/**/*'], electron.reload)
})

gulp.task('serve', () => {
  watch = true
  runSequence('server-start', 'html', 'scripts')
})
