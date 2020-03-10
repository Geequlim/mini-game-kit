const shelljs = require("shelljs");
const fs = require("fs");
if (!fs.existsSync("configs/config.release.yaml")) {
	shelljs.cp("configs/config.debug.yaml", "configs/config.release.yaml");
}
shelljs.exec("yarn webpack --config webpack.config.js --env.production --env.analyze");
