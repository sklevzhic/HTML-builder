const {mkdir, readdir, copyFile, unlink} = require('node:fs/promises');
const path = require('path');
const {access, rm} = require("fs/promises");

const elFrom = path.join(__dirname, "files");
const elTo = path.join(__dirname, "files");

(async () => {
	let pathCopy = path.join(__dirname, "files-copy")
	try {
		await access(pathCopy)
		await clearFolder(pathCopy)
		await rm(pathCopy, {recursive: true})
		await copyFolder(elFrom, elTo)
	} catch {
		await copyFolder(elFrom, elTo)
	}
})()


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
		} else {
			await copyFile(currentPathFrom, currentPathTo, 0)
		}
	}
}
async function clearFolder(pathTemp) {
	console.log("a")
	const files = await readdir(pathTemp, {withFileTypes: true});

	for (const file of files) {
		if (file.isDirectory()) {
			await clearFolder(path.join(pathTemp, file.name))
		} else {
			await unlink(path.join(pathTemp, file.name))
		}
	}
}


