const path = require('path');

module.exports = {
  entry: {
    background: { import: './src/background.ts', filename: './app/[name].js' },
    "content-script": { import: './src/content-script.ts', filename: './app/[name].js' },
    popup: { import: './src/popup/popup.tsx', filename: './app/popup/[name].js' }
  },
  devtool: 'inline-source-map',
  mode: 'development',
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname)
  }
};
