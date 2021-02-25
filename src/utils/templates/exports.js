/**
 * @param {string} component - component name
 * @param {string} fileName - component file name
 * @return {string} exported component from his folder
 */
export const generateComponentExport = (component, fileName) =>
  `export { default as ${component} } from './${fileName}'\n`

/**
 * @param {string} modules - component name
 * @return {string} exported modules list
 */
export const generateModuleExport = (modules) => `export { ${modules} }\n`
