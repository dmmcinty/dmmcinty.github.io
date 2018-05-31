module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'stage-1', 'env']
        }
      }
    }]
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
