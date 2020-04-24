const path = require('path')

module.exports = {

  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/public',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.(png|svg|jpe?g|gif)$/,
      use: [
        { 
          loader: 'file-loader', 
          options: {
            name: '/images/[name].[ext]'
          }
        }
      ]
    }]
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'public')
  }
}