const fs = require("fs");

const createFolder = (path, settings = {}) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, settings);
  }
};

const writeToFile = ({ path, file = "index.js" }, data) => {
  fs.appendFileSync(`${path}/${file}`, data);
};

module.exports = {
  createFolder,
  writeToFile,
};
