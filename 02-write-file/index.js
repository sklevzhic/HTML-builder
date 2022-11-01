const readline = require('readline');
const fs = require("fs")

let writeableStream = fs.createWriteStream('some.txt')

let rl = readline.createInterface(process.stdin, process.stdout)
let msgText = "Write the text\n" + "use 'exit' or 'ctrl+c' for exit the process\n"
rl.write(msgText)
rl.on('line', (input) => {
	if (input.trim() === "exit") {
		rl.close()
	}
	writeableStream.write(input + "\n")
});

rl.on("SIGINT", () => rl.close())

