const path = require("path");
const fs = require("fs");

const resolve = (dir = "") => {
  return path.resolve(__dirname, "../../src", dir);
};

const src = resolve();

const pages = fs.readdirSync(src).filter(item => !item.startsWith("."));

module.exports = {
  resolve,
  src,
  pages
};
