const generateModuleImport = (name, file) =>
  `import { ${name} } from './${file}'\n`

export default generateModuleImport
