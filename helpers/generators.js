const generateComponent = (component) => `const ${component} = () => {
    return <div>${component}</div>
}
export default ${component}
`;

const generateComponentExport = (component, fileName) =>
  `export { default as ${component} } from './${fileName}'\n`;

const generateModuleExport = (exportedComponentsList) =>
  `export { ${exportedComponentsList} }\n`;

const generateModuleImport = (moduleName) =>
  `import { ${moduleName} } from './${moduleName}'\n`;

module.exports = {
  generateComponentExport,
  generateComponent,
  generateModuleImport,
  generateModuleExport,
};
