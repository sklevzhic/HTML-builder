const {readdir} = require('node:fs/promises');
const fs = require("node:fs");
const path = require("path")
buildProject()

async function buildProject() {
	let writeableStream = fs.createWriteStream(path.join(__dirname, "project-dist", 'bundle.css'))
	let stylesFolder = path.join(__dirname, "styles")
	let files = await readdir(stylesFolder, {withFileTypes: true})

	for (let file of files) {
		if (file.name.includes(".css") && !file.isDirectory()) {
			let data = fs.createReadStream(path.join(__dirname, "styles", file.name));
			data.on("data", (chunk => writeableStream.write(chunk.toString())))
		}
	}
}