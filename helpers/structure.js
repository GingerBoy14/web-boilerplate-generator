const RoutesName = ['Show', 'All', 'Create', 'Edit']
const DomainName = [
  'Members',
  'Category',
  'regularProduct',
  'Product',
  'Comment',
  'Log',
  'Measure',
  'Statistic',
  'Cart',
  'Wish',
  'Purchase'
]
const Component = [
  { view: ['Simple', 'Advanced'] },
  { form: ['Simple', 'Advanced'] },
  { select: ['Single', 'Multiple'] }
]

const structureGenerator = () => {
  const objJson = {}

  DomainName.forEach((item) => {
    objJson[`${item}`] = {}
  })
  for (let domains in objJson) {
    objJson[domains]['routes'] = {}
    objJson[domains]['components'] = {}
    for (const rout in RoutesName) {
      objJson[domains].routes[domains + RoutesName[rout]] = true // add show all create edit
    }
    Component.forEach((component) => {
      for (let item in component) {
        component[item].forEach((el) => {
          objJson[domains].components[item + `${'s'}`] = {
            ...objJson[domains].components[item + `${'s'}`],
            [domains + el + item[0].toUpperCase() + item.slice(1)]: true
          }
        })
      }
    })
  }
  return objJson
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
}

// const csv2json = require('csvjson-csv2json')
// const fs = require('fs')
//
// const CSV_FILE_PATH = 'helpers/structure.csv'
//
// let structure = csv2json(fs.readFileSync(CSV_FILE_PATH, 'utf8'))
//
// const mas = []
// structure.forEach((item) => mas.push(Object.values(item)))
// console.log(mas)
// const generate = (data = mas, nest = 0, object = {}, last = false) => {
//   if (last) {
//     if (data[0][nest]) {
//       data.pop()
//     }
//     data.slice(1, data.length).forEach((item) => {
//       object = { ...object, [item[nest]]: true }
//     })
//     return Object.keys(object).length === 0 ? true : object
//   } else {
//     data.forEach((item, index) => {
//       let idx = 1
//       while (data[idx] && data[idx][nest + 1]) {
//         idx++
//       }
//       if (data[1] && data[1][nest + 1]) {
//         if (!data[0][nest]) {
//           data.splice(
//             0,
//             data.findIndex((item) => item[nest])
//           )
//         }
//         let findIndex = data
//           .slice(1, data.length)
//           .findIndex((item) => item[nest])
//
//         object[data[0][nest]] = generate(
//           data.slice(1, findIndex > -1 ? findIndex + 1 : data.length),
//           nest + 1
//         )
//         const nesting = data
//           .slice(1, data.length)
//           .findIndex((item) => item[nest])
//         let check = false
//         let nestingLength = 0
//
//         if (nesting === index) {
//           data.slice(index + 2, data.length).forEach((item) => {
//             if (item[nest + 1] && !check) {
//               nestingLength++
//             } else {
//               check = true
//             }
//           })
//         }
//         if (
//           nesting + index + nestingLength >=
//           data.slice(1, data.length).length
//         ) {
//           data.splice(0, idx)
//           object[data[0][nest]] = generate(
//             data.slice(0, data.length),
//             nest + 1,
//             object[data[0][nest]],
//             true
//           )
//         }
//
//         data.splice(0, idx)
//         if (!data[1] && data[0]) {
//           object[data[0][nest]] = generate(
//             data.slice(0, data.length),
//             nest + 1,
//             object[data[0][nest]],
//             true
//           )
//         }
//       } else if (item[nest]) {
//         object = { ...object, [item[nest]]: true }
//       } else {
//         data.splice(
//           0,
//           data.findIndex((item) => item[nest])
//         )
//       }
//     })
//   }
//   return object
// }
//
// fs.writeFileSync(
//   'fileForFolderStructure.json',
//   JSON.stringify(generate(), null, 2),
//   (err) => {
//     if (err) {
//       throw err
//     }
//     console.log('JSON data is not  saved.')
//   }
// )
// console.log('generator', generate())

export default structureGenerator
