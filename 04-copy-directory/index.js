const fs = require("fs")

let pathCurrent = __dirname + "/files"
let nameFile = pathCurrent.split("/").pop()

fs.mkdir(__dirname + `/${nameFile}-copy`, () => copyFiles(pathCurrent))

function copyFiles(pathFolder) {
	fs.copyFile('README.md', 'README1.md', () => {});
}


