const shelljs = require("shelljs");
const path = require("path");
const fs = require("fs");
const project_dir = path.join("release", process.argv[process.argv.length - 2]);
const mode = path.join("release", process.argv[process.argv.length - 1]);
const rpk_packer = "D:/devtools/oppo/lib/bin/index.js";
if (fs.statSync(rpk_packer).isFile()) {
	shelljs.cd(project_dir);
	shelljs.exec(`node ${rpk_packer} pack ${mode}`)
} else {
	console.error("错误, RPK打包工具不存在:", rpk_packer);
}
