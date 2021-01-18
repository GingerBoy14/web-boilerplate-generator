/**
 * @param {string} component - component name
 * @return {string} template of functional component
 */
const generateComponent = (component) =>
  `const ${component} = () => {
  return <div>${component}</div>
}
export default ${component}\n`

const generateConstant = (name) =>
  `const ${name} = {}\nexport default ${name}\n`

/**
 * @param {string} component - component name
 * @param {string} fileName - component file name
 * @return {string} exported component from his folder
 */
const generateComponentExport = (component, fileName) =>
  `import ${component} from './${fileName}'\nexport default ${component}\n`

/**
 * @param {string} moduleName - module name
 * @param {boolean} file - is file
 * @return {string} module es6 export
 */
const generateModuleExport = (moduleName, file = false) =>
  `export { default as ${moduleName} } from './${moduleName}${
    file ? '.js' : ''
  }'\n`

/**
 * @param {string} moduleName - module name
 * @return {string} module import
 */
const generateModuleImport = (moduleName) =>
  `import { ${moduleName} } from './${moduleName}'\n`

const generateStories = (
  component,
  file
) => `import { ${component} } from './${file}';

export default {
  title: 'Example/${component}',
  component: ${component}
};

const Template = (args) => <${component} {...args} />;`
export {
  generateConstant,
  generateComponentExport,
  generateComponent,
  generateModuleImport,
  generateModuleExport,
  generateStories
}
