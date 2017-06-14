var fs = require("fs");
var files = fs.readdirSync(".");
for (var fn in files) {
  console.log(files[fn]);
}
