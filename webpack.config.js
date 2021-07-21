const path = require('path');
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: {
    background: { import: './src/background.ts', filename: './app/[name].js' },
    "content-script": { import: './src/content-script.ts', filename: './app/[name].js' },
    popup: { import: './src/popup/Popup.tsx', filename: './app/popup/[name].js' }
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
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: "app/manifest.json" },
        { from: "src/static/images", to: "app/images" },
        { from: "src/options/options.css", to: "app/options/options.css" },
        { from: "src/options/options.html", to: "app/options/options.html" },
        { from: "src/popup/popup.css", to: "app/popup/popup.css" },
        { from: "src/popup/popup.html", to: "app/popup/popup.html" },
      ],
    }),
  ]
};
