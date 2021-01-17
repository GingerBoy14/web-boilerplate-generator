import fs from 'fs'

const createFolder = (path, settings = {}) => {
  if (!fs.existsSync(path) && path) {
    fs.mkdirSync(path, settings)
  }
}

const writeToFile = ({ path, file = 'index.js' }, data) => {
  fs.appendFileSync(`${path}${file}`, data)
}

module.exports = {
  createFolder,
  writeToFile
}
