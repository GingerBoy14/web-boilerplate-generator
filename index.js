const StructureObject = require("./structure");
const fs = require("fs");
var path = require("path");

const generateTamplate = (file) => `const ${file} = () => {
    return <div>${file}</div>
}
export default ${file}
`;

const generateExport = (component, fileName) =>
  `export { default as ${component} } from './${fileName}'\n`;

const generateGeneralExport = (items) => `export { ${items} }\n`;

const generateImport = (name) => `import { ${name} } from './${name}'\n`;

const genereteProject = (data = {}) => {
  const { structure = StructureObject(), path = "domains/" } = data;
  let i = -1;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
  for (const item in structure) {
    let fullPath = `${path}${item}`;
    let fileName = item;

    if (fullPath.includes("routes")) {
      fileName += ".layout.js";
    } else {
      fileName += ".template.js";
    }

    if (typeof structure[item] == "object" && structure[item] !== null) {
      //create folder
      fullPath += "/";
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
      }
      i = genereteProject({ structure: structure[item], path: `${fullPath}` });
      const buf = Object.keys(structure)[i];
      if (
        buf &&
        typeof structure[buf][Object.keys(structure[buf])[i]] === "boolean"
      ) {
        let exported = [];

        Object.keys(structure[item]).forEach((item) => {
          fs.appendFileSync(`${fullPath}/index.js`, generateImport(item));
          exported.push(item);
        });
        fs.appendFileSync(
          `${fullPath}/index.js`,
          generateGeneralExport(exported.join(","))
        );
      }
    } else {
      fullPath += "/";
      fs.mkdirSync(fullPath);

      fs.writeFileSync(`${fullPath}${fileName}`, generateTamplate(item));
      fs.writeFileSync(`${fullPath}index.js`, generateExport(item, fileName));
      //generate files
    }
  }
  return (i += 1);
};

genereteProject({ path: "src/domains/" });
