const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/index.ts",
  output: {
    filename: "index.[hash:5].js",
    path: path.resolve("./dist"),
  },
  devServer:{
    hot: process.env.NODE_ENV === 'development',
  },
  resolve:{
    extensions: ['.ts','.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
    }),
  ],
};

module.exports = config;
