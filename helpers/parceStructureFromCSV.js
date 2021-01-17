import csv2json from 'csvjson-csv2json'
import S from 'string'
import fs from 'fs'

import { CSV_FILE_PATH } from '../constants'

const mas = csv2json(fs.readFileSync(CSV_FILE_PATH, 'utf8')).map((item) =>
  Object.values(item)
)

const parseStructureFromCSV = (
  structure = mas,
  nest = 0,
  inDomain = false,
  domainName = '',
  object = {}
) => {
  structure.forEach((item, index) => {
    let counter = index
    while (structure[counter + 1] && !structure[counter + 1][nest]) {
      counter++
    }
    if (structure[index + 1] && structure[index + 1][nest + 1]) {
      object[item[nest]] = parseStructureFromCSV(
        structure.splice(index + 1, counter - index),
        nest + 1,
        item[nest].includes('domain'),
        (inDomain && item[nest]) || domainName.replace('/', '')
      )
    } else if (domainName) {
      const prop = S(`-${domainName}-${item[nest]}`).camelize().s
      object = {
        ...object,
        [prop]: true
      }
    } else {
      object = {
        ...object,
        [item[nest]]: true
      }
    }
  })
  return object
}

fs.writeFileSync(
  'fileForFolderStructure.json',
  JSON.stringify(parseStructureFromCSV(), null, 2),
  (err) => {
    if (err) {
      throw err
    }
    console.log('JSON data is not  saved.')
  }
)

export default parseStructureFromCSV
