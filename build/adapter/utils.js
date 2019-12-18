const path = require("path");
const fs = require("fs");

const resolve = (dir = "") => {
  return path.resolve(__dirname, "../..", dir);
};

const src = resolve("src");

const pages = fs.readdirSync(src).filter(item => !item.startsWith("."));

module.exports = {
  resolve,
  src,
  pages
};
