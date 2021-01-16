/**
 * @param {string} component - component name
 * @return {string} template of functional component
 */
const generateComponent = (component) =>
  `const ${component} = () => {
    return <div>${component}</div>
  }
  export default ${component}\n`

/**
 * @param {string} component - component name
 * @param {string} fileName - component file name
 * @return {string} exported component from his folder
 */
const generateComponentExport = (component, fileName) =>
  `import ${component} from './${fileName}'
   export default ${component}\n`

/**
 * @param {string} moduleName - module name
 * @return {string} module es6 export
 */
const generateModuleExport = (moduleName) =>
  `export { default as ${moduleName} } from './${moduleName}'\n`

/**
 * @param {string} moduleName - module name
 * @return {string} module import
 */
const generateModuleImport = (moduleName) =>
  `import { ${moduleName} } from './${moduleName}'\n`

export {
  generateComponentExport,
  generateComponent,
  generateModuleImport,
  generateModuleExport
}
