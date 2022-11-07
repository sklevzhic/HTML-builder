const readline = require('readline');
const fs = require("fs")
const path = require("path")
let writeableStream = fs.createWriteStream(path.join(__dirname, 'some.txt'))

let rl = readline.createInterface(process.stdin, process.stdout)
let msgText = "Write the text\n" + "use 'exit' or 'ctrl+c' for exit the process\n"
rl.write(msgText)
rl.on('line', (input) => {
	if (input.trim() === "exit") {
		close()
	}
	writeableStream.write(input + "\n")
});

rl.on("SIGINT", close)

function close() {
	console.log('Good bye!')
	rl.close()
}

