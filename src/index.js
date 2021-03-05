import fs from 'fs'
import S from 'string'
import cliProgress from 'cli-progress'

import { JSON_FILE_PATH, FILE_NAME_PREFIX, ROOT_FOLDER } from './constants'
import { getNodeCount, parseStructureFromCSV } from './helpers'
import { generators, writeToFile, createFolder } from './utils'
const {
  generateComponentExport,
  generateComponent,
  generateModuleExport,
  generateConstant,
  generateStories,
  generateModuleImport,
  generateTest
} = generators

const getFileName = (fileName, path) => {
  let name = ''
  Object.keys(FILE_NAME_PREFIX).forEach((folder) => {
    const prefix = FILE_NAME_PREFIX[folder]
    if (path.includes(folder)) {
      name = `${fileName}.${prefix}.js`
    }
    if (path.includes(folder)) {
      name = `${fileName}.${prefix}.js`
    }
  })
  return name
}

const groupComponents = ({ currentItem, path }) => {
  let exported = []
  let isConstants = false
  if (path.includes('constant')) {
    isConstants = true
  }
  Object.keys(currentItem).forEach((item, index) => {
    if (typeof Object.values(currentItem)[index] === 'boolean') {
      const currentNode = item.endsWith('/')
        ? item.substring(0, item.length - 1)
        : isConstants
        ? S(item).underscore().toUpperCase()
        : item

      writeToFile(
        { path },
        generateModuleImport(
          currentNode,
          item.endsWith('/') ? item.substring(0, item.length - 1) : item
        )
      )
      exported.push(currentNode)
    }
  })
  writeToFile({ path }, generateModuleExport(exported.join(', ')))
}
const generateProjectStructure = (data = {}) => {
  const {
    structure = JSON.parse(fs.readFileSync(JSON_FILE_PATH)),
    root = ''
  } = data
  let nesting = 0 //lvl of object nesting
  //create root folder
  createFolder(root, { recursive: true })
  for (const item in structure) {
    let path = `${root}`

    if (item.endsWith('/')) {
    }
    const exp = new RegExp(/\W[^\/]$/m)
    path += !exp.test(item) ? item : item.slice(0, -1)

    if (typeof structure[item] == 'object' && structure[item] !== null) {
      createFolder(path)
      nesting = generateProjectStructure({
        structure: structure[item],
        root: path
      })

      if (
        item.endsWith('/') &&
        typeof Object.values(structure[item])[0] === 'boolean'
      ) {
        groupComponents({
          currentItem: structure[item],
          path
        })
      }
    } else if (item.endsWith('/') && typeof structure[item] === 'boolean') {
      const currentItem = item.substring(0, item.length - 1)
      const fileName = getFileName(currentItem, path)
      const stories = getFileName(currentItem, 'stories')
      const testFile = getFileName(currentItem, 'tests')
      const testPath = `${path}__tests__/`

      createFolder(path)

      createFolder(testPath)
      writeToFile(
        { path: testPath, file: testFile },
        generateTest(currentItem, S(fileName).chompRight('.js'))
      )
      writeToFile(
        { path: path, file: stories },
        generateStories(currentItem, S(fileName).chompRight('.js'), path)
      )

      writeToFile({ path, file: fileName }, generateComponent(currentItem))

      writeToFile(
        { path },
        generateComponentExport(currentItem, S(fileName).chompRight('.js'))
      )
    } else if (item.includes('/') && structure[item].includes('index')) {
      // To create folder
      createFolder(path)
      // To create index file
      writeToFile({ path })
    } else {
      writeToFile(
        { path: S(path).chompRight(item), file: `${item}.js` },
        generateConstant(S(item).underscore().toUpperCase())
      )
    }
    bar1.increment()
    bar1.update()
  }
  return ++nesting
}

const nodeCount = getNodeCount()
const bar1 = new cliProgress.SingleBar({
  stopOnComplete: true,
  format: 'progress [{bar}] {percentage}% | {value}/{total} nodes'
})
bar1.start(nodeCount, 0)

fs.writeFileSync(
  JSON_FILE_PATH,
  JSON.stringify(parseStructureFromCSV(), null, 2),
  (err) => {
    if (err) {
      throw err
    }
    console.log('JSON data is not  saved.')
  }
)
fs.rmdirSync(`${ROOT_FOLDER}src`, { recursive: true })
generateProjectStructure({ root: ROOT_FOLDER })
