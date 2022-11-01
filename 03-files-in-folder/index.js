const fs = require("fs")
const {json} = require("stream/consumers");

let pathCurrent = __dirname + "/secret-folder"

fs.readdir(pathCurrent, {withFileTypes: true}, (err, files) => {
	if (err) {
		console.log(err)
	} else {
		files.forEach(file => {
			if (!file.isDirectory()) {
				file = file.name
				fs.stat(pathCurrent + "/" + file, (err, stats) => {
					console.log(file, " - ", file.split('.').pop(), " - ", stats.size)
				})
			}
		});
	}
})