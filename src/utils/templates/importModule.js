const generateModuleImport = (name, file = false) =>
  `import { ${name} } from './${name}${file ? '.js' : ''}'\n`

export default generateModuleImport
