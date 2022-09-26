const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    index: "./src/index.js",
    imageObject: "./src/imageObject.js"
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
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    alias: {
      '@components': path.resolve(__dirname, "./src/components/index.ts"),
      '@icons': path.resolve(__dirname, "./src/components/icons/index.tsx"),
      '@hooks': path.resolve(__dirname,"./src/hooks/index.ts"),
      '@services': path.resolve(__dirname,"./src/services/index.ts"),
      '@contexts': path.resolve(__dirname,"./src/contexts/index.ts"),
      '@types': path.resolve(__dirname,"./src/types/index.ts")
    }    
  },
  output: {
    path: path.resolve(__dirname,"dist"),
    publicPath: "/dist/",
    filename: "[name].bundle.js"
  }
};