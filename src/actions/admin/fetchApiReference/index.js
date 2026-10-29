const fs = require("fs").promises;
const path = require("path");

const fetchApiReference = () => {
  const filePath = path.resolve(__dirname, "../../../../API.md");
  return fs.readFile(filePath, "utf8");
};

module.exports = fetchApiReference;
