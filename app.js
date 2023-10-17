const path = require("path");
const fs = require("fs");

// console.log("Название файла: ", path.basename(__filename));
// console.log("Название каталога: ", path.dirname(__filename));

fs.mkdir(path.join(__dirname, "tmp"), function (err) {
  if (err) {
    console.error(err);
  }
  console.log("Папка создана");
});
