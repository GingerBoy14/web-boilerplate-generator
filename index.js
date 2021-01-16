const fs = require("fs");
const StructureObject = require("./structure");

const FILE_NAME_PREFIX = {
  routes: "layout",
  components: "template",
};

const getFileName = (fileName, path) => {
  let name;
  Object.keys(FILE_NAME_PREFIX).forEach((folder) => {
    const prefix = FILE_NAME_PREFIX[folder];
    if (path.includes(folder)) {
      name = `${fileName}.${prefix}.js`;
    }
  });
  return name;
};

const generateTamplate = (component) => `const ${component} = () => {
    return <div>${component}</div>
}
export default ${component}
`;

const generateExport = (component, fileName) =>
  `export { default as ${component} } from './${fileName}'\n`;

const generateGeneralExport = (exportedComponentsList) =>
  `export { ${exportedComponentsList} }\n`;

const generateImport = (moduleName) =>
  `import { ${moduleName} } from './${moduleName}'\n`;

const createFolder = (path, settings = {}) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, settings);
  }
};

const writeToFile = ({ path, file = "index.js" }, data) => {
  fs.appendFileSync(`${path}/${file}`, data);
};

const groupComponents = ({ structure, currentItem, nesting, path }) => {
  const groupFolder = Object.keys(structure)[nesting - 1];
  if (groupFolder) {
    const groupFolderStructure = structure[groupFolder];
    const groupFolderStructureKey = Object.keys(groupFolderStructure)[
      nesting - 1
    ];
    const lastFolder = groupFolderStructure[groupFolderStructureKey];
    if (typeof lastFolder === "boolean") {
      let exported = [];

      Object.keys(currentItem).forEach((item) => {
        writeToFile({ path }, generateImport(item));
        exported.push(item);
      });
      writeToFile({ path }, generateGeneralExport(exported.join(", ")));
    }
  }
};
const genereteProjectStructure = (data = {}) => {
  const { structure = StructureObject(), root = "domains" } = data;
  let nesting = 0; //lvl of object nesting

  //create root folder
  createFolder(root, { recursive: true });

  for (const item in structure) {
    let path = `${root}/${item}`;

    if (typeof structure[item] == "object" && structure[item] !== null) {
      createFolder(path);

      nesting = genereteProjectStructure({
        structure: structure[item],
        root: path,
      });

      groupComponents({
        currentItem: structure[item],
        structure,
        nesting,
        path,
      });
    } else {
      const fileName = getFileName(item, path);

      createFolder(path);

      writeToFile({ path, file: fileName }, generateTamplate(item));
      writeToFile({ path }, generateExport(item, fileName));
    }
  }
  return (nesting += 1);
};

fs.rmdirSync("src/domains", { recursive: true });
genereteProjectStructure({ root: "src/domains" });

console.log("Finish structure generation.");
