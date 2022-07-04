const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: "./src/index.js",
    imageGrid: "./src/imageGrid.js"
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { 
          presets: [
            "@babel/env",
            "@babel/preset-react",
            "@babel/preset-typescript",
          ] 
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
      }
    ]
  },
  resolve: { 
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] 
  },
  output: {
    path: path.resolve(__dirname,"dist"),
    publicPath: "/dist/",
    filename: "[name].bundle.js"
  }
};