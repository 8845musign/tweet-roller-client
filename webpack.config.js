const path = require('path')

module.exports = {
  target: 'electron',
  entry: {
    'main': './src/app.js',
    'renderer/app': './src/renderer/app.js'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  node: {
    __dirname: false,
    __filename: false
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  }
}
