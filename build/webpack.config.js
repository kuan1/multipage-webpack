const webpack = require("webpack");
const WebpackBar = require("webpackbar");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const logger = require("@luzhongk/node-logger");

const { resolve } = require("./adapter/utils");
const entry = require("./adapter/entry");
const htmlPlugins = require("./adapter/htmlPlugins");

const { publicPath, proxy, port } = require("./config");
const mode = process.env.NODE_ENV;

module.exports = {
  mode,
  entry,
  output: {
    publicPath,
    filename: "js/[name].[hash].js"
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
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
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
            name: "images/[name].[ext]?[hash]"
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 5000,
            name: "images/[name].[ext]?[hash]"
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
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
        BASE_URL: JSON.stringify(publicPath)
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
    ...htmlPlugins(publicPath)
  ],
  devServer: {
    after() {
      logger.run(port);
    },
    port,
    proxy: {
      "/api": proxy
    },
    host: "0.0.0.0",
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
    noInfo: true // only errors & warns on hot reload
  }
};
