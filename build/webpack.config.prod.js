const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const { resolve } = require("./adapter/utils");
const entry = require("./adapter/entry");
const htmlPlugins = require("./adapter/htmlPlugins");

const { publicPath } = require("./config");
const mode = process.env.NODE_ENV;

module.exports = {
  mode,
  entry,
  output: {
    publicPath,
    filename: "js/[name].[chunkhash].js"
  },
  module: {
    noParse: [/moment.js/],
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/i,
        use: {
          loader: "url-loader",
          options: {
            limit: 5000,
            name: "images/[name].[hash:7].[ext]"
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 5000,
            name: "images/[name].[hash:7].[ext]"
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".js", "css", "less"],
    alias: {
      "@": resolve("src")
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
      }
    }),
    new WebpackBar(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: "public",
        to: "",
        ignore: [".*"]
      }
    ]),
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash].css",
      chunkFilename: "css/[id].[chunkhash].css"
    }),
    new OptimizeCSSAssetsPlugin(),
    ...htmlPlugins(publicPath)
  ]
};
