const HtmlWebpackPlugin = require("html-webpack-plugin");

const { pages, resolve } = require("./utils");

// 动态获取 htmlPlugin
function getHtmlPlugins(publicPath) {
  return pages.map(item => {
    return new HtmlWebpackPlugin({
      favicon: "public/favicon.ico",
      filename: `${item}.html`,
      chunks: [item],
      template: resolve(`public/${item}.html`),
      path: publicPath
    });
  });
}

module.exports = getHtmlPlugins;
