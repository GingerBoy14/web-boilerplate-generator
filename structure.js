const fs = require("fs");

const RoutesName = ["Show", "All", "Create", "Edit"];
const DomainName = [
  "Members",
  "Category",
  "regularProduct",
  "Product",
  "Comment",
  "Log",
  "Measure",
  "Statistic",
  "Cart",
  "Wish",
  "Purchase",
];
const Component = [
  { view: ["Simple", "Advanced"] },
  { form: ["Simple", "Advanced"] },
  { select: ["Single", "Multiple"] },
];

const StructureObject = () => {
  const objJson = {};

  DomainName.forEach((item) => {
    objJson[`${item}`] = {};
  });
  for (let domains in objJson) {
    objJson[domains]["routes"] = {};
    objJson[domains]["components"] = {};
    for (let rout in RoutesName) {
      objJson[domains].routes[domains + RoutesName[rout]] = true; // add show all create edit
    }
    for (let component of Component) {
      for (let item in component) {
        component[item].forEach((el) => {
          objJson[domains].components[item + `${"s"}`] = {
            ...objJson[domains].components[item + `${"s"}`],
            [domains + el + item[0].toUpperCase() + item.slice(1)]: true,
          };
        });
      }
    }
  }
  return objJson;
  //   fs.writeFileSync(
  //     "fileForFolderStructure.json",
  //     JSON.stringify(objJson, null, 4),
  //     (err) => {
  //       if (err) {
  //         throw err;
  //       }
  //       console.log("JSON data is not  saved.");
  //     }
  //   );
  //   console.log("JSON data is saved");
};

module.exports = StructureObject;
