const { resolve, pages } = require("./utils");

// 动态获取entry
function getEntry() {
  const entry = {};
  pages.forEach(item => {
    entry[item] = resolve(item);
  });
  return entry;
}

module.exports = getEntry();
