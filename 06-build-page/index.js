const {readdir, copyFile} = require('node:fs/promises');
const path = require("path")
const {mkdir, stat, readFile, writeFile, access} = require("fs/promises");
const fs = require("node:fs");


async function bundle() {
	let folderNameDist = path.join(__dirname, "project-dist")
	try {
		await access(folderNameDist);
	} catch {
		await mkdir(folderNameDist)
	}

	let pathComponents = path.join(__dirname, "components")
	let components = await getAllComponents(pathComponents)

	let pathIndexHTML = path.join(__dirname, "template.html")
	let res = await readFile(pathIndexHTML, "utf8")

	for (let component of components) {
		const data = await readFile(component.path, "utf8");
		res = res.toString().replace(`{{${component.name}}}`, data)
	}

	await writeFile(path.join(folderNameDist, "index.html"), res)

	//copy folder
	const elFrom = path.join(__dirname, "assets");
	const elTo = path.join(__dirname, "project-dist", "assets");

	copyFolder(elFrom, elTo)

	copyStyles()



	// let assetsFrom = ""
	// let assetsTo = ""
	// copyAssets(assetsFrom, assetsTo)
	// whiteHTML()
}

bundle()


async function copyStyles() {
	let writeableStream = fs.createWriteStream(path.join(__dirname, "project-dist", 'style.css'))
	let stylesFolder = path.join(__dirname, "styles")
	let files = await readdir(stylesFolder, {withFileTypes: true})

	for (let file of files) {
		if (file.name.includes(".css") && !file.isDirectory()) {
			let data = fs.createReadStream(path.join(__dirname, "styles", file.name));
			data.on("data", (chunk => writeableStream.write(chunk + "\n")))
		}
	}
}

async function getAllComponents(pathTemp) {
	let files = await readdir(pathTemp)
	let res = files.map(el => {
		let obj = {
			name: el.replace(".html", ""),
			path: path.join(pathTemp, el)
		}
		return obj
	})
	return res
}

async function copyFolder(elFrom, elTo) {
	let elName = elFrom.split("/").pop()
	if (elFrom === elTo) {
		let newName = elName + "-copy"
		elTo = elTo.replace(elName, newName)
		await mkdir(elTo, {recursive: true});
	} else {
		await mkdir(elTo, {recursive: true});
	}

	const files = await readdir(elFrom, {withFileTypes: true});
	for (const file of files) {
		let currentPathFrom = path.join(elFrom, file.name)
		let currentPathTo = path.join(elTo, file.name)
		if (file.isDirectory()) {
			await copyFolder(currentPathFrom, currentPathTo)
		} else  {
			await copyFile(currentPathFrom, currentPathTo, 0)
		}
	}
}
