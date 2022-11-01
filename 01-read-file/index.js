const fs = require('node:fs');
const rr = fs.createReadStream(__dirname + "/text.txt");
let res = ""
rr.on('data', chunk => res += chunk.toString());
rr.on('end', () => console.log(res));
rr.on('error', (e) => console.log(e));