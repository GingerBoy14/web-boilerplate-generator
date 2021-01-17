const csv2json = require('csvjson-csv2json')
const fs = require('fs')

const CSV_FILE_PATH = 'helpers/structure.csv'

const mas = csv2json(fs.readFileSync(CSV_FILE_PATH, 'utf8')).map((item) =>
  Object.values(item)
)

const generator = (structure = mas, nest = 0, object = {}) => {
  structure.forEach((item, index) => {
    let counter = index
    while (structure[counter + 1] && !structure[counter + 1][nest]) {
      counter++
    }
    if (structure[index + 1] && structure[index + 1][nest + 1]) {
      object[item[nest]] = generator(
        structure.splice(index + 1, counter - index),
        nest + 1
      )
    } else {
      console.log(item[nest])
      object = { ...object, [item[nest]]: true }
    }
  })
  return object
}

fs.writeFileSync(
  'fileForFolderStructure.json',
  JSON.stringify(generator(), null, 2),
  (err) => {
    if (err) {
      throw err
    }
    console.log('JSON data is not  saved.')
  }
)
console.log('generator', generator())
