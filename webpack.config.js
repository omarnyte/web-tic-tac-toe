const path = require('path');

module.exports = {
  entry: './public/scripts/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public/scripts/bundle')
  },
  devtool: 'source-map',
  resolve: {
      extensions: ['.js', '*']
  }
};