import fs from 'fs'
import { JSON_FILE_PATH, FILE_NAME_PREFIX } from './constants'
import { parseStructureFromCSV } from './helpers'
import { generators, writeToFile, createFolder } from './utils'
const {
  generateComponentExport,
  generateComponent,
  generateModuleExport,
  generateConstant
} = generators

const getFileName = (fileName, path) => {
  let name = ''
  Object.keys(FILE_NAME_PREFIX).forEach((folder) => {
    const prefix = FILE_NAME_PREFIX[folder]
    if (path.includes(folder)) {
      name = `${fileName}.${prefix}.js`
    }
  })
  return name
}

const groupComponents = ({ currentItem, path, file }) => {
  Object.keys(currentItem).forEach((item, index) => {
    if (typeof Object.values(currentItem)[index] === 'boolean') {
      writeToFile(
        { path },
        generateModuleExport(
          item.endsWith('/') ? item.substring(0, item.length - 1) : item,
          file
        )
      )
    }
  })
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
      path += item
    }
    if (typeof structure[item] == 'object' && structure[item] !== null) {
      createFolder(path)
      nesting = generateProjectStructure({
        structure: structure[item],
        root: path
      })

      if (typeof Object.values(structure[item])[0] === 'boolean') {
        groupComponents({
          currentItem: structure[item],
          path,
          file: !Object.keys(structure[item])[0].endsWith('/')
        })
      }
    } else if (item.endsWith('/') && typeof structure[item] === 'boolean') {
      const currentItem = item.substring(0, item.length - 1)
      const fileName = getFileName(currentItem, path)

      createFolder(path)

      writeToFile({ path, file: fileName }, generateComponent(currentItem))
      writeToFile({ path }, generateComponentExport(currentItem, fileName))
    } else {
      writeToFile({ path, file: `${item}.js` }, generateConstant(item))
    }
  }
  return ++nesting
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
fs.rmdirSync('src', { recursive: true })
generateProjectStructure()

console.log('Finish structure generation.')
