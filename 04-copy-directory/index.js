const {mkdir, readdir, copyFile, unlink} = require('node:fs/promises');
const path = require('path');

const elFrom = path.join(__dirname, "files");
const elTo = path.join(__dirname, "files");

copyFolder(elFrom, elTo)

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


