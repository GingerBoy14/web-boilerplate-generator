const fileSystem = require("./fileSystem");
const generators = require("./generators");
const structureGenerator = require("./structure");

module.exports = { ...fileSystem, ...generators, structureGenerator };
