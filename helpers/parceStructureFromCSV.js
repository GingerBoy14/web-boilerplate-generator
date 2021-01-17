import csv2json from 'csvjson-csv2json'
import S from 'string'
import fs from 'fs'

import { CSV_FILE_PATH } from '../constants'

const rowsValues = csv2json(
  fs.readFileSync(CSV_FILE_PATH, 'utf8')
).map((item) => Object.values(item))

const countNestedItems = ({ index, items, nestingLevel }) => {
  let counter = index
  //count nested items that will be passed into next iteration
  while (haveNesting(items[counter + 1], nestingLevel, { neg: true })) {
    counter++
  }
  return counter
}

//check is next item nested
const haveNesting = (nestedItem, lvl, { neg = false } = {}) =>
  neg ? nestedItem && !nestedItem[lvl] : nestedItem && nestedItem[lvl]

const parseStructureFromCSV = (...args) => {
  const [
    structure = rowsValues,
    nestingLevel = 0,
    inDomain = false,
    domainName = ''
  ] = args
  let structureObject = {} //parsed output object

  structure.forEach((node, index) => {
    const counter = countNestedItems({ index, nestingLevel, items: structure })
    const currentNode = node[nestingLevel]
    if (haveNesting(structure[index + 1], nestingLevel + 1)) {
      //if not last item and exists nesting, run next iteration
      structureObject[currentNode] = parseStructureFromCSV(
        structure.splice(index + 1, counter - index),
        nestingLevel + 1,
        currentNode.includes('domain'),
        (inDomain && currentNode) || S(domainName).chompRight('/').s
      )
    } else if (domainName) {
      //if current item is component of some domain add domain name to her
      const prop = S(`-${domainName}-${currentNode}`).camelize().s
      structureObject[prop] = true
    } else {
      //create node
      structureObject[currentNode] = true
    }
  })
  return structureObject
}

export default parseStructureFromCSV
