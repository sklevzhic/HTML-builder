<<<<<<< HEAD
const {mkdir, readdir, copyFile, unlink} = require('node:fs/promises');
const path = require('path');

copyFolder()

async function copyFolder() {
	const folderCopy = await readdir(__dirname);
	if (folderCopy.includes("files-copy")) {
		const filesOld = await readdir("files-copy");
		for (const fileOld of filesOld) {
			await unlink(path.join("files-copy", fileOld))
		}
	} else {
		await mkdir("files-copy", { recursive: true });
	}

	const files = await readdir("files");
	for (const file of files) {
		await copyFile(`files/${file}`, `files-copy/${file}`, 0)
	}
=======
const fs = require("fs")

let pathCurrent = __dirname + "/files"
let nameFile = pathCurrent.split("/").pop()

fs.mkdir(__dirname + `/${nameFile}-copy`, () => copyFiles(pathCurrent))

function copyFiles(pathFolder) {
	fs.copyFile('README.md', 'README1.md', () => {});
>>>>>>> origin/main
}


