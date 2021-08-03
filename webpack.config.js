const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: {
    'background': './src/background.ts',
    'content-script': './src/content-script.ts',
    'popup': './src/popup/Popup.tsx'
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
      { // import css *module* files
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { modules: { localIdentName: '[name]__[local]' } }
            // use '[hash:base64]' for production
          }
        ],
        include: /\.module\.css$/
      },
      { // import css *global* files
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
        exclude: /\.module\.css$/
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: __dirname + '/app/',
    filename: (pathData) => {
      return pathData.chunk.name === 'popup' ? '[name]/[name].js' : '[name].js'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css'
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/static/images", to: "images" },
        { from: "src/options/options.html", to: "options/options.html" },
        { from: "src/popup/popup.html", to: "popup/popup.html" },
      ],
    }),
  ]
};
